using AutoMapper;
using Clinic.API.DataTransferObjects.Authentication;
using Clinic.API.JwtFeatures;
using Clinic.API.Models;
using EmailService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.IdentityModel.Tokens.Jwt;

namespace Clinic.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly JwtHandler _jwtHandler;
        private readonly IEmailSender _emailSender;

        public AccountController (UserManager<User> userManager, IMapper mapper, JwtHandler jwtHandler, IEmailSender emailSender)
        {
            _emailSender = emailSender;
            _userManager = userManager;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserForRegister userForRegister)
        {
            if (userForRegister == null || !ModelState.IsValid)
                return BadRequest();

            var user = _mapper.Map<User>(userForRegister);

            var result = await _userManager.CreateAsync(user, userForRegister.Password);

            if(!result.Succeeded)
            {
                var errors = result.Errors.Select(f => f.Description);
                return BadRequest( new RegisterResponse { Errors = errors});
            }

            await _userManager.AddToRoleAsync(user, "Patient");

            return Ok();
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForLogin userForLogin)
        {
            var user = await _userManager.FindByEmailAsync(userForLogin.Email);

            if(user == null)
                return Unauthorized(new LoginResponse { Error = "Invalid Request"});

            if(!await _userManager.CheckPasswordAsync(user, userForLogin.Password))
            {
                await _userManager.AccessFailedAsync(user);
                if(await _userManager.IsLockedOutAsync(user))
                {
                    var content = $"Your account is locked out. To reset the password follow this link: {userForLogin.ClientURI}";
                    var message = new Message(new string[] { userForLogin.Email }, "Clinic - Locked out account information", content);

                    await _emailSender.SendEmailAsync(message);

                    return Unauthorized(new LoginResponse { Error = "This account is locked out" });
                }
                return Unauthorized(new LoginResponse { Error = "Invalid authentication"});
            }

            var signinCreditals = _jwtHandler.GetSigningCredentials();
            var claims = await _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GetTokenOpions(claims, signinCreditals);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            await _userManager.ResetAccessFailedCountAsync(user);

            return Ok(new LoginResponse { Success = true, Token = token});
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPassword forgotPassword)
        {
            if (!ModelState.IsValid)
                return BadRequest("Wrong e-mail! Please check Email field.");

            var user = await _userManager.FindByEmailAsync(forgotPassword.Email);

            if (user == null)
                return BadRequest("We cannot find your e-mail address. Please check filed with your e-mail.");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string?>
            {
                {"token", token},
                {"email", forgotPassword.Email}
            };

            var callback = QueryHelpers.AddQueryString(forgotPassword.ClientURI, param);
            var message = new Message(new string[] { user.Email }, "Reset password token", callback);
            
            await _emailSender.SendEmailAsync(message);

            return Ok();
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPassword resetPassword)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(resetPassword.Email);

            if (user == null)
                return BadRequest();

            var result = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);

            if (!result.Succeeded)
                return BadRequest(string.Format("Cannot reset password for {0}", resetPassword.Email));

            await _userManager.SetLockoutEndDateAsync(user, DateTime.Now);

            return Ok();
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePassword changePassword)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(changePassword.Email);

            if (user == null)
                return BadRequest();

            var request = await _userManager.ChangePasswordAsync(user, changePassword.Password, changePassword.NewPassword);

            if (!request.Succeeded)
                return BadRequest();

            return Ok();
        }

        [HttpPost("ChangeEmail")]
        public async Task<IActionResult> ChangeEmail([FromBody] ChangeEmail changeEmail)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(changeEmail.Email);

            if (user == null)
                return BadRequest();

            var result1 = await _userManager.CheckPasswordAsync(user, changeEmail.password);

            var token = await _userManager.GenerateChangeEmailTokenAsync(user, changeEmail.NewEmail);

            var result2 = await _userManager.ChangeEmailAsync(user, changeEmail.NewEmail, token);

            if (!result1 || !result2.Succeeded)
                return BadRequest();

            return Ok();
        }
    }
}

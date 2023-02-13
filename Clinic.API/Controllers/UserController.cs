using Clinic.API.DataTransferObjects.UserManagement;
using Clinic.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Clinic.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;

        public UserController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }


        [HttpGet("GetAllInRole/{role}")]
        public async Task<List<UserForManagement>> GetAllInRole(string role)
        {
            var doctors = await _userManager.GetUsersInRoleAsync(role);

            if (doctors.IsNullOrEmpty())
                throw new Exception("There are no data");

            List<UserForManagement> employersForManagement = new List<UserForManagement>();

            foreach (var doctor in doctors)
            {
                var tmp = await _userManager.GetRolesAsync(doctor);
                employersForManagement.Add(new UserForManagement { Id = doctor.Id, Email = doctor.Email, FirstName = doctor.FirstName, LastName = doctor.LastName, Role = tmp.FirstOrDefault() });
            }
            return employersForManagement;
        }


        [HttpGet("GetAllUsers")]
        public async Task<List<UserForManagement>> GetAllUsers()
        {
            List<User> users = await _userManager.Users.ToListAsync();

            if (users.IsNullOrEmpty())
                throw new Exception("There are no data");

            List<UserForManagement> usersForManagement = new List<UserForManagement>();

            foreach (var user in users)
            {
                var userRole = await _userManager.GetRolesAsync(user);
                usersForManagement.Add(new UserForManagement {Id = user.Id, Email=user.Email ,FirstName=user.FirstName ,LastName=user.LastName ,Role=userRole.FirstOrDefault()});
            }

            return usersForManagement;
        }

        [HttpGet("GetUserRole")]
        public async Task<string> GetUserRole(string email)
        {
            if (email == null)
                throw new Exception("Field cannot be null");

            var user = await _userManager.FindByNameAsync(email);

            if (user == null)
                throw new Exception($"Unable to find user {email}");

            var roles = await _userManager.GetRolesAsync(user);

            var role = roles.FirstOrDefault();

            return role;
        }

        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (id == null)
                return BadRequest("Cannot be null");

            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return BadRequest("Cannot find following user");

            var result = await _userManager.DeleteAsync(user);

            if(!result.Succeeded)
                return BadRequest("Cannot delete user");

            return Ok();
        }

        [HttpPost("ChangeRole")]
        public async Task<IActionResult> ChangeRole(UserForChangeRole userForChangeRole)
        {
            if (userForChangeRole.id == null || userForChangeRole.newRole == null)
                return BadRequest("Fields cannot be null!");

            var user = await _userManager.FindByIdAsync(userForChangeRole.id);

            var userRoles = await _userManager.GetRolesAsync(user);

            var result1 = await _userManager.RemoveFromRolesAsync(user ,userRoles);
            var result2 = await _userManager.AddToRoleAsync(user ,userForChangeRole.newRole);

            if (!result1.Succeeded || !result2.Succeeded)
                return BadRequest("Change role error");

            return Ok();
        }
    }
}

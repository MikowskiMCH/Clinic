using System.ComponentModel.DataAnnotations;

namespace Clinic.API.DataTransferObjects.Authentication
{
    public class ResetPassword
    {
        [Required(ErrorMessage = "Reset password is required!")]
        public string? Password { get; set; }

        [Compare("Password", ErrorMessage = "Field must match with field with password!")]
        public string? ConfirmPassword { get; set; }

        public string? Email { get; set; }
        public string? Token { get; set; }
    }
}

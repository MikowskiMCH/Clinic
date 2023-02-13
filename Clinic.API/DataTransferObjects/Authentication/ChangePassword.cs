using System.ComponentModel.DataAnnotations;

namespace Clinic.API.DataTransferObjects.Authentication
{
    public class ChangePassword
    {
        [Required(ErrorMessage = "Email is required!")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required!")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Reset password is required!")]
        public string? NewPassword { get; set; }

        [Compare("NewPassword", ErrorMessage = "New password must compare with comfirmation!")]
        public string? ConfirmNewPassword { get; set; }
    }
}

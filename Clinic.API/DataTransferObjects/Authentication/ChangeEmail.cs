using System.ComponentModel.DataAnnotations;

namespace Clinic.API.DataTransferObjects.Authentication
{
    public class ChangeEmail
    {
        [Required(ErrorMessage = "Old email is required!")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "New email is required!")]
        public string? NewEmail { get; set; }

        [Required(ErrorMessage = "Password is required!")]
        public string? password { get; set; }
    }
}

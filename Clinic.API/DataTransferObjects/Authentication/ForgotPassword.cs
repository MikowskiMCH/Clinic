using System.ComponentModel.DataAnnotations;

namespace Clinic.API.DataTransferObjects.Authentication
{
    public class ForgotPassword
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? ClientURI { get; set; }
    }
}

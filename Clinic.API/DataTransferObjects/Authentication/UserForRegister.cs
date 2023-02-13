using System.ComponentModel.DataAnnotations;

namespace Clinic.API.DataTransferObjects.Authentication
{
    public class UserForRegister
    {
        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [Required]
        [StringLength(maximumLength: 11, MinimumLength = 11, ErrorMessage = "Pesel must have 11 numeric characters.")]
        [RegularExpression("^[0-9]+$", ErrorMessage = "Pesel must be numeric characters.")]
        public string? Pesel { get; set; }

        [MaxLength(200)]
        public string? Allergies { get; set; }

        [Required]
        public string? Gender { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? PasswordConfirm { get; set; }
    }
}

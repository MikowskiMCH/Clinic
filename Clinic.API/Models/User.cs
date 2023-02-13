using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Clinic.API.Models
{
    public class User : IdentityUser
    {
        [Required]
        [MaxLength(30)]
        [MinLength(3)]
        public string? FirstName { get; set; }

        [Required]
        [MaxLength(30)]
        [MinLength(3)]
        public string? LastName { get; set; }

        [Required]
        [StringLength(maximumLength:11,MinimumLength = 11, ErrorMessage = "Passwords must have 11 numeric characters.")]
        [RegularExpression("[^0-9]*$",ErrorMessage = "Passwords must have 11 numeric characters.")]
        public string? Pesel { get; set; }

        [Required]
        [MaxLength(200)]
        public string? Allergies { get; set; }

        [Required]
        public string Gender { get; set; }

    }
}

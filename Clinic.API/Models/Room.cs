using System.ComponentModel.DataAnnotations;

namespace Clinic.API.Models
{
    public class Room
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        public int Number { get; set; }
        public User? Doctor { get; set; }
        public User? Nurse { get; set; }
        public string? Specjalization { get; set; }
    }
}

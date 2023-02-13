using System.ComponentModel.DataAnnotations;

namespace Clinic.API.Models
{
    public class Prescription
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        public string? Description { get; set; }

        public string? Medicines { get; set; }

        public Appointment? Appointment { get; set; }

        public User? WroteBy { get; set; }
    }
}

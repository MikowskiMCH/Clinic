using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace Clinic.API.Models
{
    public enum Status
    {
        Available, Unaccepted, Accepted, Finished, 
    }
    public class Appointment
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        public User? Patient { get; set; }

        public User? Doctor { get; set; }

        public Status Status { get; set; }

        public DateTime AppointmentAt { get; set; }

    }
}

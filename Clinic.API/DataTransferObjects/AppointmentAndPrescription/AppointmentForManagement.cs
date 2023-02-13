using Clinic.API.Models;

namespace Clinic.API.DataTransferObjects.AppointmentAndPrescription
{
    public class AppointmentForManagement
    {
        public string? AppointmentAt { get; set; }
        public string? Doctor { get; set; }
        public string? Patient { get; set; }
        public Status Status { get; set; }

    }
}

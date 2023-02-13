using Clinic.API.DataTransferObjects.UserManagement;
using Clinic.API.Models;

namespace Clinic.API.DataTransferObjects.AppointmentAndPrescription
{
    public class AppointmentInfo
    {
        public string? Id { get; set; }
        public string? AppointmentAt { get; set; }
        public UserForManagement? Doctor { get; set; }
        public UserForManagement? Patient { get; set; }
        public Status Status { get; set; }
    }
}

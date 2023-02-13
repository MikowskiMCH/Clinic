using Clinic.API.DataTransferObjects.UserManagement;
using Clinic.API.Models;

namespace Clinic.API.DataTransferObjects.AppointmentAndPrescription
{
    public class PrescriptionInfo
    {
        public string? Description { get; set; }

        public string? Medicines { get; set; }

        public AppointmentInfo Appointment { get; set; }

        public UserForManagement WroteBy { get; set; }
    }
}

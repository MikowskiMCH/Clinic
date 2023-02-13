using System.ComponentModel.DataAnnotations;

namespace Clinic.API.DataTransferObjects.UserManagement
{
    public class PatientInfo
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Pesel { get; set; }

        public string? Allergies { get; set; }

        public string? Gender { get; set; }
    }
}

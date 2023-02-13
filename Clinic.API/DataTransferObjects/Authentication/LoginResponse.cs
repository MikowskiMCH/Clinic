namespace Clinic.API.DataTransferObjects.Authentication
{
    public class LoginResponse
    {
        public bool Success { get; set; }

        public string? Error { get; set; }

        public string? Token { get; set; }
    }
}

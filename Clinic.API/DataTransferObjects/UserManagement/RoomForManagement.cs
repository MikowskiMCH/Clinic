namespace Clinic.API.DataTransferObjects.UserManagement
{
    public class RoomForManagement
    {
        public string? Id { get; set; }
        public string? Specjalization { get; set; }
        public UserForManagement Doctor { get; set; }
        public UserForManagement Nurse { get; set; }
        public string? Number { get; set; }
    }
}

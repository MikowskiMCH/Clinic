using Clinic.API.DataTransferObjects.UserManagement;
using Clinic.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Validations;

namespace Clinic.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : Controller
    {

        private readonly ClinicDbContext _context;
        private readonly UserManager<User> _userManager;

        public RoomController(ClinicDbContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("GetRoomsDataFormManagement")]
        public async Task<List<RoomForManagement>> GetRoomsDataFormManagement()
        {
            var rooms = await _context.Rooms.Include(f => f.Doctor).Include(f => f.Nurse).ToListAsync();

            if (rooms.Count() == 0)
                return null;

            List<RoomForManagement> roomsForManagement = new List<RoomForManagement>();

            foreach (var room in rooms)
            {
                UserForManagement doctor = null;
                UserForManagement nurse = null;

                if (room.Doctor != null)
                {
                    doctor = new UserForManagement
                    {
                        Email = room.Doctor.Email,
                        Id = room.Doctor.Id,
                        FirstName = room.Doctor.FirstName,
                        LastName = room.Doctor.LastName,
                        Role = "",
                    };
                }

                if (room.Nurse != null)
                {
                    nurse = new UserForManagement
                    {
                        Email = room.Nurse.Email,
                        Id = room.Nurse.Id,
                        FirstName = room.Nurse.FirstName,
                        LastName = room.Nurse.LastName,
                        Role = "",
                    };
                }

                roomsForManagement.Add(new RoomForManagement
                {
                    Id = room.Id.ToString(),
                    Number = room.Number.ToString(),
                    Specjalization = room.Specjalization,
                    Doctor = doctor,
                    Nurse = nurse
                });
            }

            return roomsForManagement;
        }

        [HttpGet("GetRoomsData")]
        public async Task<List<RoomForManagement>> GetRoomsData()
        {
            var rooms = await _context.Rooms.Include(f=>f.Doctor).Include(f => f.Nurse).ToListAsync();

            if (rooms.Count() == 0)
                return null;

            List<RoomForManagement> roomsForManagement= new List<RoomForManagement>();

            foreach(var room in rooms)
            {
                UserForManagement doctor = null;
                UserForManagement nurse = null;

                if (room.Doctor != null)
                {
                    doctor = new UserForManagement
                    {
                        Email = room.Doctor.Email,
                        Id = room.Doctor.Id,
                        FirstName = room.Doctor.FirstName,
                        LastName = room.Doctor.LastName,
                        Role = "",
                    };
                }

                if (room.Nurse != null)
                {
                    nurse = new UserForManagement
                    {
                        Email = room.Nurse.Email,
                        Id = room.Nurse.Id,
                        FirstName = room.Nurse.FirstName,
                        LastName = room.Nurse.LastName,
                        Role = "",
                    };
                }

                if (room.Nurse != null && room.Doctor != null && room.Specjalization != null)
                {
                    roomsForManagement.Add(new RoomForManagement
                    {
                        Id = room.Id.ToString(),
                        Number = room.Number.ToString(),
                        Specjalization = room.Specjalization,
                        Doctor = doctor,
                        Nurse = nurse
                    });
                }
            }

            return roomsForManagement;
        }

        [HttpPost("CreateRoom/{number}")]
        public IActionResult CreateRoom(int number)
        {
            if (!ModelState.IsValid || _context.Rooms.Any(f=>f.Number == number))
                return BadRequest(ModelState);

            var newRoom = new Room() {Number = number};

            _context.Rooms.Add(newRoom);
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("DeleteRoom/{number}")]
        public IActionResult DeleteRoom(int number)
        {
            if (!_context.Rooms.Any(f => f.Number == number))
                return BadRequest("There is no room with that number");

            var Room = _context.Rooms.FirstOrDefault(f => f.Number==number);
            _context.Rooms.Remove(Room);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost("AssignEmployeeToRoom/{number}")]
        public async Task<IActionResult> AssignEmployeeToRoom(int number, UserForManagement userForManagement)
        {
            if (!ModelState.IsValid || userForManagement == null)
                return BadRequest();

            var employee = await _userManager.FindByIdAsync(userForManagement.Id);

            if(!_context.Rooms.Any(f => f.Number == number) || employee == null)
                return BadRequest();

            var employeeRoles = await _userManager.GetRolesAsync(employee);
            var employeeRole = employeeRoles.FirstOrDefault();

            if (employeeRole == "Nurse"){
                if (_context.Rooms.Where(f=>f.Nurse.Id == employee.Id).Count() > 0)
                    return BadRequest();

                _context.Rooms.FirstOrDefault(f => f.Number == number).Nurse = employee;
                _context.SaveChanges();
            }

            else if(employeeRole == "Doctor"){
                if (_context.Rooms.Where(f => f.Nurse.Id == employee.Id).Count() > 0)
                    return BadRequest();

                _context.Rooms.FirstOrDefault(f => f.Number == number).Doctor = employee;
                _context.SaveChanges();
            }

            return Ok();

        }

        [HttpPost("SetRoomEmpty/{number}")]
        public IActionResult SetRoomEmpty(int number)
        {
            var room = _context.Rooms.FirstOrDefault(f => f.Number == number);
            if (room == null)
                return BadRequest();

            _context.Rooms.Remove(room);
            _context.Rooms.Add(new Room { Number = room.Number });
            _context.SaveChanges();

            return Ok();

        }

        [HttpGet("GetRoomOfEmplyee")]
        public async Task<Room> GetRoomOfEmplyee(string email)
        {
            var employee = await _userManager.FindByNameAsync(email);
            var room = _context.Rooms.FirstOrDefault(f=>f.Doctor == employee);

            if(room == null)
               room = _context.Rooms.FirstOrDefault(f => f.Nurse == employee);

            if(room == null)
                throw new Exception("This user have no room assigned");
            else
                return room;
        }

        [HttpPost("AssignSecjalization")]
        public IActionResult AssignSepecjalization(SpecjalizationSender specjalizationSender)
        {
            if (specjalizationSender.Room == null || specjalizationSender.Specjalization == null)
                return BadRequest();

            _context.Rooms.FirstOrDefault(f=>f.Number == specjalizationSender.Room).Specjalization = specjalizationSender.Specjalization;
            _context.SaveChanges();

            return Ok();
        }

    }
}

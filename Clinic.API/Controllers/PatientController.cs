using Clinic.API.DataTransferObjects.AppointmentAndPrescription;
using Clinic.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Clinic.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly ClinicDbContext _context;

        public PatientController(UserManager<User> userManager, ClinicDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("GetAvAllAppointments/{id}")]
        public async Task<List<AppointmentForManagement>> GetAvAllAppointments(string id)
        {
            var list = await _context.Appointments.Include(f => f.Doctor).Include(f => f.Patient).Where(f => f.Doctor.Id == id).ToListAsync();

            var appointments = new List<AppointmentForManagement>();

            foreach (var item in list)
            {
                if (item.AppointmentAt <= DateTime.Now)
                {
                    _context.Appointments.FirstOrDefault(f => f.Id == item.Id).Status = Status.Finished;
                    _context.SaveChanges();
                }

                appointments.Add(new AppointmentForManagement() {
                    AppointmentAt = item.AppointmentAt.ToString(),
                    Doctor = item.Doctor.Id,
                    Patient = item.Patient.Id,
                    Status = item.Status });
            }

            return appointments;
        }

        [HttpPost("CreateAppointment")]
        public async Task<IActionResult> CreateAppointment([FromBody] AppointmentForManagement appointment)
        {
            if (appointment == null)
                return BadRequest();

            await _context.Appointments.AddAsync(new Appointment
            {
                AppointmentAt = DateTime.Parse(appointment.AppointmentAt),
                Doctor = await _userManager.FindByIdAsync(appointment.Doctor),
                Patient = await _userManager.FindByEmailAsync(appointment.Patient),
                Status = Status.Unaccepted
            });

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("CancelAppointment/{id}")]//not used yet
        public async Task<IActionResult> CancelAppointment(string id)
        {
            if (id == null)
                return BadRequest();


            return Ok();
        }
    }
}

using Clinic.API.DataTransferObjects;
using Clinic.API.DataTransferObjects.AppointmentAndPrescription;
using Clinic.API.DataTransferObjects.UserManagement;
using Clinic.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace Clinic.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : Controller
    {
        private readonly ClinicDbContext _context;
        private readonly UserManager<User> _userManager;

        public AppointmentController(ClinicDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("GetRoom/{email}")]
        public async Task<RoomForManagement> GetRoom(string email)
        {
            var employee = await _userManager.FindByEmailAsync(email);

            if (employee == null)
                return null;

            var room = _context.Rooms.Where(f => f.Doctor == employee || f.Nurse == employee).Include(f=>f.Doctor).Include(f=>f.Nurse).FirstOrDefault();

            var roomForManagement = new RoomForManagement
            {
                Doctor = new UserForManagement
                {
                    Email = room.Doctor.Email,
                    FirstName = room.Doctor.FirstName,
                    LastName = room.Doctor.LastName,
                    Role = "Doctor"
                },
                Id = room.Id.ToString(),
                Number = room.Number.ToString(),
                Nurse = new UserForManagement
                {
                    Email = room.Nurse.Email,
                    FirstName = room.Nurse.FirstName,
                    LastName = room.Nurse.LastName,
                    Role = "Nurse"
                },
                Specjalization = room.Specjalization,
            };

            return roomForManagement;
        }

        [HttpGet("GetDoctorDailyDuty/{email}")]
        public async Task<List<AppointmentInfo>> GetDailyDuty(string email)
        {
            var doctor = await _userManager.FindByEmailAsync(email);

            var doctorForManagemenet = new UserForManagement
            {
                Email = doctor.Email,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Role = "Doctor"
            };

            var appointments = _context.Appointments.Include(f => f.Doctor).Include(f => f.Patient)
                .Where(f => f.Doctor == doctor && (f.AppointmentAt.Year == DateTime.Now.Year &&
                f.AppointmentAt.Month == DateTime.Now.Month && f.AppointmentAt.Date == DateTime.Now.Date) && f.Status == Status.Accepted).ToList();

            if (appointments.Count() == 0 || appointments == null)
                return null;


            var appointmentsForManagement = new List<AppointmentInfo>();

            foreach (var appointment in appointments)
            {
                if(appointment.AppointmentAt <= DateTime.Now)
                {
                    _context.Appointments.FirstOrDefault(f => f.Id == appointment.Id).Status = Status.Finished;
                    _context.SaveChanges();
                    appointment.Status = Status.Finished;
                }

                var patient = await _userManager.FindByIdAsync(appointment.Patient.Id);

                var patientForManagemenet = new UserForManagement
                {
                    Email = patient.Email,
                    FirstName = patient.FirstName,
                    LastName = patient.LastName,
                    Role = "Patient"
                };

                appointmentsForManagement.Add(new AppointmentInfo
                {
                    Id = appointment.Id.ToString(),
                    AppointmentAt = appointment.AppointmentAt.ToString(),
                    Doctor = doctorForManagemenet,
                    Patient = patientForManagemenet,
                    Status = appointment.Status
                });
            }

            return appointmentsForManagement;
        }

        [HttpGet("GetAllAppointementsForDoctor/{email}")]
        public async Task<List<AppointmentInfo>> GetAllAppointements(string email)
        {
            var doctor = await _userManager.FindByEmailAsync(email);

            var doctorForManagemenet = new UserForManagement
            {
                Email = doctor.Email,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Role = "Doctor"
            };

            var appointments = _context.Appointments.Include(f => f.Doctor).Include(f => f.Patient)
                .Where(f => f.Doctor == doctor && f.Status == Status.Accepted).ToList();

            if (appointments == null || appointments.Count() == 0)
                return null;

            var appointmentsForManagement = new List<AppointmentInfo>();

            foreach (var appointment in appointments)
            {
                if (appointment.AppointmentAt <= DateTime.Now)
                {
                    _context.Appointments.FirstOrDefault(f => f.Id == appointment.Id).Status = Status.Finished;
                    _context.SaveChanges();
                    appointment.Status = Status.Finished;
                }

                var patient = await _userManager.FindByIdAsync(appointment.Patient.Id);

                var patientForManagemenet = new UserForManagement
                {
                    Email = patient.Email,
                    FirstName = patient.FirstName,
                    LastName = patient.LastName,
                    Role = "Patient"
                };

                appointmentsForManagement.Add(new AppointmentInfo
                {
                    Id = appointment.Id.ToString(),
                    AppointmentAt = appointment.AppointmentAt.ToString(),
                    Doctor = doctorForManagemenet,
                    Patient = patientForManagemenet,
                    Status = appointment.Status
                });
            }

            return appointmentsForManagement;
        }

        [HttpGet("GetAllAppointmentsForPatient/{id}")]
        public async Task<List<AppointmentInfo>> GetAllAppointmentsForPatient(string id)
        {
            var patient = await _userManager.FindByIdAsync(id);
            var patientRoles = await _userManager.GetRolesAsync(patient);
            var patientForManagemenet = new UserForManagement
            {
                Email = patient.Email,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                Role = patientRoles.FirstOrDefault()
            };

            var appointments = _context.Appointments.Include(f => f.Doctor).Include(f => f.Patient)
                .Where(f => f.Patient == patient).ToList();

            if (appointments == null || appointments.Count() == 0)
                return null;

            var appointmentsForManagement = new List<AppointmentInfo>();

            foreach (var appointment in appointments)
            {
                if (appointment.AppointmentAt <= DateTime.Now)
                {
                    _context.Appointments.FirstOrDefault(f => f.Id == appointment.Id).Status = Status.Finished;
                    _context.SaveChanges();
                    appointment.Status = Status.Finished;
                }

                var Doctor = await _userManager.FindByIdAsync(appointment.Doctor.Id);

                var doctorForManagemenet = new UserForManagement
                {
                    Email = patient.Email,
                    FirstName = patient.FirstName,
                    LastName = patient.LastName,
                    Role = "Doctor"
                };

                appointmentsForManagement.Add(new AppointmentInfo
                {
                    Id = appointment.Id.ToString(),
                    AppointmentAt = appointment.AppointmentAt.ToString(),
                    Doctor = doctorForManagemenet,
                    Patient = patientForManagemenet,
                    Status = appointment.Status
                });
            }

            return appointmentsForManagement;
        }

        [HttpGet("GetAppointmentsWithStatus/{status}/{nurseEmail}")]
        public async Task<List<AppointmentInfo>> GetAppointmentsWithStatus(Status status, string nurseEmail)
        {
            var nurse = await _userManager.FindByEmailAsync(nurseEmail);
            var room = _context.Rooms.Include(f => f.Nurse).Where(f => f.Nurse == nurse).FirstOrDefault();

            if (room == null)
                return null;

            var doctor = await _userManager.FindByIdAsync(_context.Rooms.Where(f=>f.Nurse == nurse).Include(f=>f.Doctor).FirstOrDefault().Doctor.Id.ToString());
            var appointments = _context.Appointments.Include(f => f.Doctor).Include(f => f.Patient)
                .Where(f => f.Status == status && f.Doctor == doctor).ToList();

            if (appointments.Count() == 0 || appointments == null)
                return null;

            var appointmentsForManagement = new List<AppointmentInfo>();

            foreach (var appointment in appointments)
            {
                if (appointment.AppointmentAt <= DateTime.Now)
                {
                    _context.Appointments.FirstOrDefault(f => f.Id == appointment.Id).Status = Status.Finished;
                    _context.SaveChanges();
                    appointment.Status = Status.Finished;
                }

                var patient = await _userManager.FindByIdAsync(appointment.Patient.Id);

                var doctorForManagemenet = new UserForManagement
                {
                    Email = doctor.Email,
                    FirstName = doctor.FirstName,
                    LastName = doctor.LastName,
                    Role = "Doctor"
                };

                var patientForManagemenet = new UserForManagement
                {
                    Email = patient.Email,
                    FirstName = patient.FirstName,
                    LastName = patient.LastName,
                    Role = "Patient"
                };

                appointmentsForManagement.Add(new AppointmentInfo
                {
                    Id = appointment.Id.ToString(),
                    AppointmentAt = appointment.AppointmentAt.ToString(),
                    Doctor = doctorForManagemenet,
                    Patient = patientForManagemenet,
                    Status = appointment.Status
                });
            }

            return appointmentsForManagement;
        }

        [HttpGet("GetAppointementInfo/{email}")] // Not used method
        public async Task<AppointmentInfo> GetAppointementInfo(string id)
        {
            var appointment = _context.Appointments.Include(f => f.Doctor).Include(f => f.Patient)
                .FirstOrDefault(f => f.Id.ToString() == id);

            if (appointment == null)
                return null;

            if (appointment.AppointmentAt <= DateTime.Now)
            {
                _context.Appointments.FirstOrDefault(f => f.Id == appointment.Id).Status = Status.Finished;
                _context.SaveChanges();
                appointment.Status = Status.Finished;
            }

            var patient = await _userManager.FindByIdAsync(appointment.Patient.Id);
            var doctor = await _userManager.FindByIdAsync(appointment.Doctor.Id);

            var doctorForManagemenet = new UserForManagement
            {
                Email = doctor.Email,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Role = "Doctor"
            };

            var patientForManagemenet = new UserForManagement
            {
                Email = patient.Email,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                Role = "Patient"
            };

            var appointmentForManagement = new AppointmentInfo
            {
                Id = appointment.Id.ToString(),
                AppointmentAt = appointment.AppointmentAt.ToString(),
                Doctor = doctorForManagemenet,
                Patient = patientForManagemenet,
                Status = appointment.Status
            };

            return appointmentForManagement;
        }

        [HttpGet("GetNextAppointmentInfo/{email}")]
        public async Task<AppointmentInfo> GetNextAppointmentInfo(string email)
        {
            var doctor = await _userManager.FindByEmailAsync(email);
            var appointment = _context.Appointments.Include(f => f.Doctor).Include(f => f.Patient)
                .Where(f => f.Doctor == doctor && f.AppointmentAt > DateTime.Now && f.Status == Status.Accepted).FirstOrDefault();

            if (appointment == null)
                return null;

            if (appointment.AppointmentAt <= DateTime.Now)
            {
                _context.Appointments.FirstOrDefault(f => f.Id == appointment.Id).Status = Status.Finished;
                _context.SaveChanges();
                appointment.Status = Status.Finished;
            }

            var patient = await _userManager.FindByIdAsync(appointment.Patient.Id);

            var doctorForManagemenet = new UserForManagement
            {
                Email = doctor.Email,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Role = "Doctor"
            };

            var patientForManagemenet = new UserForManagement
            {
                Email = patient.Email,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                Role = "Patient"
            };

            var appointmentForManagement = new AppointmentInfo
            {
                Id = appointment.Id.ToString(),
                AppointmentAt = appointment.AppointmentAt.ToString(),
                Doctor = doctorForManagemenet,
                Patient = patientForManagemenet,
                Status = appointment.Status
            };

            return appointmentForManagement;
        }

        [HttpPost("UnacceptAppointment")]
        public async Task<IActionResult> UnacceptAppointment(AppointmentInfo appointment)
        {
            if (appointment.Id == null || appointment == null)
                return BadRequest();

            _context.Appointments.Where(f => f.Id.ToString() == appointment.Id).FirstOrDefault().Status = Status.Available;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost("AcceptAppointment")]
        public async Task<IActionResult> AcceptAppointment(AppointmentInfo appointment)
        {
            if (appointment.Id == null || appointment == null)
                return BadRequest();

            _context.Appointments.Where(f => f.Id.ToString() == appointment.Id).FirstOrDefault().Status = Status.Accepted;
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("GetNextAppointemnt/{email}")]
        public async Task<AppointmentInfo> GetNextAppointemnt(string email)
        {
            if (email == null)
                return null;

            var appointment = _context.Appointments.Where(f=>f.Status == Status.Accepted).Include(f=>f.Doctor).Include(f=>f.Patient).OrderByDescending(f => f.AppointmentAt).FirstOrDefault();

            if (appointment == null)
                return null;

            if (appointment.AppointmentAt <= DateTime.Now)
            {
                _context.Appointments.FirstOrDefault(f => f.Id == appointment.Id).Status = Status.Finished;
                _context.SaveChanges();
                appointment.Status = Status.Finished;
            }

            var appointmentManagement = new AppointmentInfo {
                AppointmentAt = appointment.AppointmentAt.ToString(),
                Doctor = new UserForManagement
                {
                    Email = appointment.Doctor.Email,
                    FirstName = appointment.Doctor.FirstName,
                    LastName = appointment.Doctor.LastName,
                    Id = appointment.Doctor.Id,
                    Role = "Doctor",
                },
                Id = appointment.Id.ToString(),
                Patient = new UserForManagement
                {
                    Email = appointment.Patient.Email,
                    FirstName = appointment.Patient.FirstName,
                    LastName = appointment.Patient.LastName,
                    Id = appointment.Patient.Id,
                    Role = "Patient",
                },
                Status = appointment.Status};

            return appointmentManagement;
        }
            
        [HttpPost("GetLastAppointments/{email}")]
        public async Task<List<PrescriptionInfo>> GetLastAppointment(string email)
        {
            if (email == null)
                return null;

            var appointments = _context.Appointments.ToList();

            foreach(var item in appointments)
            {
                if (item.AppointmentAt <= DateTime.Now)
                {
                    _context.Appointments.FirstOrDefault(f => f.Id == item.Id).Status = Status.Finished;
                    _context.SaveChanges();
                    item.Status = Status.Finished;
                }
            }

            var appointment = _context.Appointments.Where(f=>f.Status == Status.Finished).OrderByDescending(f => f.AppointmentAt).FirstOrDefault();

            if (appointment == null)
                return null;

            var prescriptionList = new List<PrescriptionInfo>();
            var appPrescriptions = _context.Prescriptions.Where(f => f.Appointment.Id == appointment.Id).ToList();

            foreach(var item in appPrescriptions)
            {
                var prescription = new PrescriptionInfo
                {
                    Appointment = new AppointmentInfo
                    {
                        AppointmentAt = appointment.AppointmentAt.ToString(),
                        Doctor = new UserForManagement
                        {
                            Email = appointment.Doctor.Email,
                            FirstName = appointment.Doctor.FirstName,
                            LastName = appointment.Doctor.LastName,
                            Id = appointment.Doctor.Id,
                            Role = "Doctor",
                        },
                        Id = appointment.Id.ToString(),
                        Patient = new UserForManagement
                        {
                            Email = appointment.Patient.Email,
                            FirstName = appointment.Patient.FirstName,
                            LastName = appointment.Patient.LastName,
                            Id = appointment.Patient.Id,
                            Role = "Patient",
                        },
                        Status = appointment.Status
                    },
                    Description = item.Description,
                    Medicines = item.Medicines,
                    WroteBy = new UserForManagement
                    {
                        Email = appointment.Doctor.Email,
                        FirstName = appointment.Doctor.FirstName,
                        LastName = appointment.Doctor.LastName,
                        Id = appointment.Doctor.Id,
                        Role = "Doctor",
                    },
                };
                prescriptionList.Add(prescription);
            }

            return prescriptionList;
        }

        [HttpGet("GetPatientInfo/{email}")]
        public async Task<PatientInfo> GetPatientInfo(string email)
        {
            var patient = await _userManager.FindByEmailAsync(email);

            if (patient == null)
                return null;

            var patientInfo = new PatientInfo {
                FirstName = patient.FirstName,
                Allergies = patient.Allergies,
                Gender = patient.Gender,
                LastName = patient.LastName,
                Pesel = patient.Pesel
            };

            return patientInfo;
        }

        [HttpGet("GetPatientPrescriptions/{email}")]
        public async Task<List<PrescriptionInfo>> GetPatientPrescriptions(string email)
        {
            var prescriptions = _context.Prescriptions.Where(f => f.Appointment.Patient.Email == email)
                .Include(f => f.WroteBy).Include(f => f.Appointment).ThenInclude(f => f.Patient);

            if (prescriptions.Count() == 0 || prescriptions == null)
                return null;

            List<PrescriptionInfo> selectedPrescryptios = new List<PrescriptionInfo>();

            foreach(var prescription in prescriptions)
            {
                selectedPrescryptios.Add(
                    new PrescriptionInfo
                    {
                        WroteBy = new UserForManagement
                        { 
                            Email = prescription.WroteBy.Email,
                            FirstName = prescription.WroteBy.FirstName,
                            LastName = prescription.WroteBy.LastName,
                            Role = "Doctor"
                        },
                        Description = prescription.Description,
                        Medicines = prescription.Medicines,
                        Appointment = new AppointmentInfo
                        {
                            Id = prescription.Appointment.Id.ToString(),
                            AppointmentAt = prescription.Appointment.AppointmentAt.ToString(),
                            Doctor = new UserForManagement
                            {
                                Email = prescription.Appointment.Doctor.Email,
                                FirstName = prescription.Appointment.Doctor.FirstName,
                                LastName = prescription.Appointment.Doctor.LastName,
                                Role = "Doctor"},
                            Patient = new UserForManagement
                            {
                                Email = prescription.Appointment.Patient.Email,
                                FirstName = prescription.Appointment.Patient.FirstName,
                                LastName = prescription.Appointment.Patient.LastName,
                                Role = "Patient"
                            },
                            Status = prescription.Appointment.Status,
                        }
                    });
            }

            return selectedPrescryptios;
        }

        [HttpGet("GetAppointmentPrescriptions/{id}")]
        public async Task<List<PrescriptionInfo>> GetAppointmentPrescriptions(string id)
        {
            var prescriptions = _context.Prescriptions.Where(f => f.Appointment.Id.ToString() == id)
                .Include(f => f.WroteBy).Include(f => f.Appointment).ThenInclude(f => f.Patient);

            if (prescriptions.Count() == 0 || prescriptions == null)
                return null;

            List<PrescriptionInfo> selectedPrescryptios = new List<PrescriptionInfo>();

            foreach (var prescription in prescriptions)
            {
                selectedPrescryptios.Add(
                    new PrescriptionInfo
                    {
                        WroteBy = new UserForManagement
                        {
                            Email = prescription.WroteBy.Email,
                            FirstName = prescription.WroteBy.FirstName,
                            LastName = prescription.WroteBy.LastName,
                            Role = "Doctor"
                        },
                        Description = prescription.Description,
                        Medicines = prescription.Medicines,
                        Appointment = new AppointmentInfo
                        {
                            Id = prescription.Appointment.Id.ToString(),
                            AppointmentAt = prescription.Appointment.AppointmentAt.ToString(),
                            Doctor = new UserForManagement
                            {
                                Email = prescription.Appointment.Doctor.Email,
                                FirstName = prescription.Appointment.Doctor.FirstName,
                                LastName = prescription.Appointment.Doctor.LastName,
                                Role = "Doctor"
                            },
                            Patient = new UserForManagement
                            {
                                Email = prescription.Appointment.Patient.Email,
                                FirstName = prescription.Appointment.Patient.FirstName,
                                LastName = prescription.Appointment.Patient.LastName,
                                Role = "Patient"
                            },
                            Status = prescription.Appointment.Status,
                        }
                    });
            }

            return selectedPrescryptios;
        }

        [HttpPost("CreatePrescription")]
        public async Task<IActionResult> CreatePrescription([FromBody] PrescriptionInfo prescription)
        {
            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            var date = DateTime.Parse(prescription.Appointment.AppointmentAt);
            var appointment = _context.Appointments.Where(f => f.AppointmentAt == date).FirstOrDefault();

            if (appointment == null)
                return BadRequest();

            _context.Prescriptions.Add(new Prescription
            {
                Appointment = appointment,
                Description = prescription.Description,
                Medicines = prescription.Medicines,
                WroteBy = await _userManager.FindByEmailAsync(prescription.WroteBy.Email)
            });

            _context.SaveChanges();
            
            return Ok();
        }
    }
}

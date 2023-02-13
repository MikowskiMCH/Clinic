using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Clinic.API.Models
{
    public class ClinicDbContext : IdentityDbContext<User>
    {
        public ClinicDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Room>().HasIndex(f => f.Number).IsUnique();
            builder.Entity<Role>().HasData(
                new Role() { Name = "Admin", NormalizedName = "ADMIN"},
                new Role() { Name = "Doctor", NormalizedName = "DOCTOR"},
                new Role() { Name = "Nurse", NormalizedName = "NURSE"},
                new Role() { Name = "Patient", NormalizedName = "PATIENT"}
                );
        }

        public DbSet<Room> Rooms { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }

    }
}

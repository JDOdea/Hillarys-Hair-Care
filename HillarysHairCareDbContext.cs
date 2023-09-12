using Microsoft.EntityFrameworkCore;
using Hillarys.Models;

public class HillarysHairCareDbContext : DbContext
{
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Stylist> Stylists { get; set; }

    public HillarysHairCareDbContext(DbContextOptions<HillarysHairCareDbContext> context) : base(context)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {
            new Appointment {Id = 1, CustomerId = 3, StylistId = 2, ScheduledDate = DateTime.Parse("2023-08-16T15:40:34.037788"), IsCancelled = true},
            new Appointment {Id = 2, CustomerId = 1, StylistId = 1, ScheduledDate = DateTime.Parse("2023-09-08T15:40:34.037788"), IsCancelled = false},
            new Appointment {Id = 3, CustomerId = 2, StylistId = 3, ScheduledDate = DateTime.Parse("2023-09-12T15:40:34.037788"), IsCancelled = false},
            new Appointment {Id = 4, CustomerId = 1, StylistId = 4, ScheduledDate = DateTime.Parse("2023-09-13T15:40:34.037788"), IsCancelled = false}
        });

        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service {Id = 1, Name = "Long Cut", Charge = 30.00M},
            new Service {Id = 2, Name = "Short Cut", Charge = 25.50M},
            new Service {Id = 3, Name = "Beard Trim", Charge = 15.00M},
            new Service {Id = 4, Name = "Coloring", Charge = 55.90M},
            new Service {Id = 5, Name = "Extensions", Charge = 38.50M},
            new Service {Id = 6, Name = "Shave", Charge = 15.25M}
        });

        modelBuilder.Entity("AppointmentService").HasData(new object[]
        {
            new {AppointmentsId = 1, ServicesId = 1},
            new {AppointmentsId = 1, ServicesId = 6},
            new {AppointmentsId = 2, ServicesId = 2},
            new {AppointmentsId = 2, ServicesId = 3},
            new {AppointmentsId = 3, ServicesId = 1},
            new {AppointmentsId = 4, ServicesId = 4}
        });

        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer {Id = 1, FirstName = "JD", LastName = "Fitzmartin", Email = "jdfitz@gmail.com"},
            new Customer {Id = 2, FirstName = "Josh", LastName = "Baugh", Email = "josh@gmail.com"},
            new Customer {Id = 3, FirstName = "Austin", LastName = "Flowers", Email = "austin@gmail.com"},
            new Customer {Id = 4, FirstName = "Rhett", LastName = "Muse", Email = "rhmuse@gmail.com"},
            new Customer {Id = 5, FirstName = "Alex", LastName = "Hare", Email = "ahare@gmail.com"}
        });


        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist {Id = 1, FirstName = "Liza", LastName = "Vavrichyna", IsActive = true},
            new Stylist {Id = 2, FirstName = "David", LastName = "Bartek", IsActive = true},
            new Stylist {Id = 3, FirstName = "Greg", LastName = "Korte", IsActive = false},
            new Stylist {Id = 4, FirstName = "Jackson", LastName = "Henderson", IsActive = false},
            new Stylist {Id = 5, FirstName = "Deanna", LastName = "Davis", IsActive = true}
        });
    }
}
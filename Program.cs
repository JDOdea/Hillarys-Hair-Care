using Hillarys.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using System.Globalization;

#region Defaults
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillarysHairCareDbContext>(builder.Configuration["HillarysHairCareDbConnectionString"]);

// Set the JSON serializer options
builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
#endregion

#region Endpoints

#region Endpoint--Appointments
//  Get all Appointments
app.MapGet("/api/appointments", (HillarysHairCareDbContext db) =>
{
    return db.Appointments
        .Include(s => s.Stylist)
        .Include(c => c.Customer)
        .Include(s => s.Services);
});

//  Create Appointment
app.MapPost("/api/appointments", (HillarysHairCareDbContext db, Appointment appointment) =>
{
    try
    { 
        List<Service> matchedServices = db.Services.Where(s => appointment.Services.Select(serv => serv.Id).Contains(s.Id)).ToList();
        appointment.Services = matchedServices;

        string isoDateTimeString = appointment.ScheduledDate.ToString();
        appointment.ScheduledDate = DateTime.Parse(isoDateTimeString, null, DateTimeStyles.RoundtripKind);

        db.Appointments.Add(appointment);
        db.SaveChanges();
        return Results.Created($"/api/appointments/{appointment.Id}", appointment);
    }
    catch (DbUpdateException)
    {
        return Results.BadRequest("Invalid data submitted");
    }
});

//  Edit Appointment
app.MapPut("/api/appointments/{id}", (HillarysHairCareDbContext db, int id, Appointment appointmentUpdate) => 
{

    Appointment appointment = db.Appointments.SingleOrDefault(a => a.Id == id);
    if (appointment == null)
    {
        return Results.NotFound();
    }

    List<Service> matchedServices = db.Services.Where(s => appointmentUpdate.Services.Select(serv => serv.Id).Contains(s.Id)).ToList();
    List<Service> oldServices = appointment.Services;
    oldServices = matchedServices;

    string isoDateTimeString = appointmentUpdate.ScheduledDate.ToString();
    appointment.ScheduledDate = DateTime.Parse(isoDateTimeString, null, DateTimeStyles.RoundtripKind);

    appointment.StylistId = appointmentUpdate.StylistId;
    appointment.CustomerId = appointmentUpdate.CustomerId;
    appointment.ScheduledDate = appointmentUpdate.ScheduledDate;

    db.SaveChanges();
    return Results.NoContent();

    
});

//  Cancel Appointment
app.MapPut("/api/appointments/{id}", (HillarysHairCareDbContext db, int id) => 
{
    Appointment appointmentToCancel = db.Appointments.SingleOrDefault(a => a.Id == id);
    if (appointmentToCancel == null)
    {
        return Results.NotFound();
    }
    appointmentToCancel.IsCancelled = true;
    db.SaveChanges();
    return Results.NoContent();
});
#endregion

#region Endpoint--Customers
//  Get all Customers
app.MapGet("/api/customers", (HillarysHairCareDbContext db) =>
{
    return db.Customers;
});

//  Create Customer
app.MapPost("/api/customers", (HillarysHairCareDbContext db, Customer customer) =>
{
    try
    {
        customer.Id = db.Customers.Count() > 0 ? db.Customers.Max(c => c.Id) + 1 : 1;
        db.Customers.Add(customer);
        db.SaveChanges();
        return Results.Created($"/api/customers/{customer.Id}", customer);
    }
    catch (DbUpdateException)
    {
        return Results.BadRequest("Invalid data submitted");
    }
});

//  Remove Customer
app.MapDelete("/api/customers/{id}", (HillarysHairCareDbContext db, int id) => 
{
    Customer customerToDelete = db.Customers.SingleOrDefault(c => c.Id == id);
    if (customerToDelete == null)
    {
        return Results.NotFound();
    }
    db.Customers.Remove(customerToDelete);
    db.SaveChanges();
    return Results.NoContent();
});
#endregion

#region Endpoint--Stylists
//  Get all Stylists
app.MapGet("/api/stylists", (HillarysHairCareDbContext db) =>
{
    return db.Stylists
        .OrderBy(s => s.Id);
});

//  Get all active Stylists
app.MapGet("/api/stylists/active", (HillarysHairCareDbContext db) =>
{
    return db.Stylists
        .Where(s => s.IsActive == true)
        .OrderBy(s => s.Id);
});

//  Create Stylist
app.MapPost("/api/stylists", (HillarysHairCareDbContext db, Stylist stylist) =>
{
    try
    {
        stylist.Id = db.Stylists.Count() > 0 ? db.Stylists.Max(s => s.Id) + 1 : 1;
        db.Stylists.Add(stylist);
        db.SaveChanges();
        return Results.Created($"/api/stylists/{stylist.Id}", stylist);
    }
    catch (DbUpdateException)
    {
        return Results.BadRequest("Invalid data submitted");
    }
});

//  Change activation of Stylist
app.MapPut("/api/stylists/{id}/status", (HillarysHairCareDbContext db, int id) =>
{
    Stylist stylistToChange = db.Stylists.SingleOrDefault(s => s.Id == id);
    if (stylistToChange == null)
    {
        return Results.NotFound();
    }
    stylistToChange.IsActive = !stylistToChange.IsActive;

    db.SaveChanges();
    return Results.NoContent();
});
#endregion

#region Endpoint--Services
//  Get all Services
app.MapGet("/api/services", (HillarysHairCareDbContext db) =>
{
    return db.Services;
});
#endregion

#endregion

app.Run();
using Hillarys.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

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
        .Include(c => c.Customer);
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
    return db.Stylists;
});
#endregion

#endregion

app.Run();
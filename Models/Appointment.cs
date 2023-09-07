using System.ComponentModel.DataAnnotations;

namespace Hillarys.Models;

public class Appointment
{
    public int Id { get; set; }
    public int StylistId { get; set; }
    public Stylist Stylist { get; set; }
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public List<Service> Services { get; set; }
    [Required]
    public DateTime ScheduledDate { get; set; }
    public decimal TotalCost { get; set; }
    public bool IsCancelled { get; set; }
}
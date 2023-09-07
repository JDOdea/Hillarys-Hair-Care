using System.ComponentModel.DataAnnotations;

namespace Hillarys.Models;

public class Service
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public decimal Charge { get; set; }
    public List<Appointment> Appointments { get; set; }
}
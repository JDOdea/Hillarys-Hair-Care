using System.ComponentModel.DataAnnotations;

namespace Hillarys.Models;

public class Stylist
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    public List<Appointment> Appointments { get; set; }
    [Required]
    public bool IsActive { get; set; }
}
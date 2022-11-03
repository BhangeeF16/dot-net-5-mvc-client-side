using System;

namespace WebUI.Models
{
    public class People
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? Title { get; set; }
        public int Tier { get; set; }
        public string Email { get; set; }
        public string? Teams { get; set; }
        public string? Mobile { get; set; }
       
    }
}

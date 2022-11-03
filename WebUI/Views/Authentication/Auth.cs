using System;

namespace Worqbox.UI.Authentication
{
    public class LoginVM
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserWithTokenVM
    {
        public string accessToken { get; set; }
        public PersonVM User { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime RequestedServerUtcNow { get; set; }
    }

    public class PersonVM
    {

        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }


        public string Email { get; set; }

        public string Company { get; set; }

        public string Title { get; set; }

        public string Work { get; set; }

        public string? Mobile { get; set; }

        public bool? InActive { get; set; }

        public decimal? CostRate { get; set; }

        public decimal? DefaultBillRate { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public Guid? Uguid { get; set; }

        public string CreatedBy { get; set; }

        public int? TeamWorkId { get; set; }
        public DateTimeOffset? Created { get; set; }
        public DateTimeOffset? LastPasswordChanged { get; set; }
        public string ModifiedBy { get; set; }

        public DateTimeOffset? Modified { get; set; }

        public string? ImageUrl { get; set; }


    }
}

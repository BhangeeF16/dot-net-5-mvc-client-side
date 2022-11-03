#region Imports

using System;
using System.ComponentModel.DataAnnotations;

#endregion

namespace Worqbox.UI.ViewModels
{
    public class UserWithTokenVM
    {
        public string accessToken { get; set; }
        public UserInfoVM User { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime RequestedServerUtcNow { get; set; }
    }

    public class WB_ForecastingManagement
    {
        public string Name { get; set; }
        public string UserName { get; set; }
        public decimal? ProjectTotalHours { get; set; }
        public decimal? ProjectBillableHours { get; set; }
        public decimal? ProjectNonBillableHours { get; set; }
        public decimal? LoggedBillable { get; set; }
        public decimal? LoggedNonBillable { get; set; }
        public decimal? LoggedPercentage { get; set; }
        public decimal? OutstandingHours { get; set; }
        public int? ProjectId { get; set; }
        public int? BillingMonth { get; set; }
        public string BillingMonthName { get; set; }
        public int? BillingYear { get; set; }
    }
    public class Person
    {
        public Person()
        {

        }

        [Key] public int Id { get; set; }

        [Required][StringLength(150)] public string FirstName { get; set; }

        [Required][StringLength(150)] public string LastName { get; set; }

        [Required]
        [StringLength(255)]
        public string Email { get; set; }

        public string Company { get; set; }

        [Required][StringLength(50)] public string Title { get; set; }

        [StringLength(255)] public string Work { get; set; }

        [StringLength(255)] public string? Mobile { get; set; }

        public decimal? CostRate { get; set; }

        public decimal? DefaultBillRate { get; set; }

        [StringLength(255)] public string Username { get; set; }

        [StringLength(255)] public string Password { get; set; }

        public Guid? Uguid { get; set; }

        [StringLength(255)] public string CreatedBy { get; set; }

        public int? TeamWorkId { get; set; }
        public DateTimeOffset? Created { get; set; }

        [StringLength(255)] public string ModifiedBy { get; set; }

        public DateTimeOffset? Modified { get; set; }
        public DateTime? LastPasswordChanged { get; set; }
        [Required] public byte[] RowVersion { get; set; }


        public string? ImageUrl { get; set; }


    }

}
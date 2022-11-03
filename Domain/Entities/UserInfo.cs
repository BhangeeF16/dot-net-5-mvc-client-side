#region Imports

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Common.ViewModels;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

#endregion

namespace Domain.Entities
{
    public class UserInfo : IdentityUser
    {

        [Required]
        [MaxLength(35)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(35)]
        public string LastName { get; set; }
        public bool Active { get; set; }
        [ForeignKey("CreatedByUser")]
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        [ForeignKey("ModifiedByUser")]
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Gender { get; set; }
        public string PrimaryPhoneNumber { get; set; }
        public virtual UserInfo CreatedByUser { get; set; }
        public virtual UserInfo ModifiedByUser { get; set; }
        [MaxLength(100)]
        public string DriverLicense { get; set; }
        [MaxLength(100)]
        public string EmergencyContactName { get; set; }
        [MaxLength(100)]
        public string EmergencyContactNo { get; set; }
        [MaxLength(255)]
        public string Address { get; set; }
    }
}
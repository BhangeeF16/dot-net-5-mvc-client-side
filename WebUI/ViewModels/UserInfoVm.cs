#region Imports

using System;
using System.Collections.Generic;

#endregion

namespace Worqbox.UI.ViewModels
{
    public class UserInfoVM
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public short? Status { get; set; }
        public string Referral { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string School { get; set; }
        public string PromoCode { get; set; }
        public DateTime? DatePurchased { get; set; }
        public decimal? AmountPaid { get; set; }
        public decimal? ShareAmount { get; set; }
        public string StudentPassword { get; set; }
        public string Country { get; set; }
        public int? CustomerID { get; set; }
        public int? CustomerResellerID { get; set; }
        public short? GroupID { get; set; }
        public int? PurchaseID { get; set; }
        public string PurchaseStatus { get; set; }
        public int? ResellerID { get; set; }
        public string ResellerName { get; set; }

        public bool CreatedByLMS { get; set; }
        public bool Deactivated { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public string ProfileImage { get; set; }
        public string ResellerLogo { get; set; }
        public List<RoleVM>? UserRoles { get; set; }
        public DateTime? LastPasswordChanged { get; set; }
    }

    public class SetPasswordVM
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string OIC { get; set; }
    }
}
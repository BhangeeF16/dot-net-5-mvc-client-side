#region Imports

using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using Worqbox.UI.ViewModels;

#endregion

namespace Worqbox.UI.Services
{
    public interface ICurrentUserService
    {
        string Fullname { get; }
        public int UserId { get; }
        public string UserTimeZone { get; }
        UserVM User { get; }
    }

    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor contextAccessor;
        private UserVM user;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            contextAccessor = httpContextAccessor;
            Fullname = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Name);

            var userInfo = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.UserData);
            if (userInfo != null) user = JsonConvert.DeserializeObject<UserVM>(userInfo);
        }

        public string Fullname { get; }

        public UserVM User
        {
            get
            {
                if (user != null) return user;

                if (!contextAccessor.HttpContext.User.Identity.IsAuthenticated) throw new UnauthorizedAccessException();

                var userInfo = contextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.UserData);
                if (userInfo != null) user = JsonConvert.DeserializeObject<UserVM>(userInfo);

                return user ?? new UserVM();
            }
        }

        public int UserId => User.UserID;
        public string UserTimeZone => contextAccessor?.HttpContext?.Request?.Headers["UserTimeZone"];
    }

    public class UserVM
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
        public short? GroupID { get; set; }
        public int? PurchaseID { get; set; }
        public string PurchaseStatus { get; set; }
        public int? ResellerID { get; set; }
        public bool CreatedByLMS { get; set; }
        public bool Deactivated { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public string ProfileImage { get; set; }
        public List<RoleVM>? UserRoles { get; set; }
    }
}
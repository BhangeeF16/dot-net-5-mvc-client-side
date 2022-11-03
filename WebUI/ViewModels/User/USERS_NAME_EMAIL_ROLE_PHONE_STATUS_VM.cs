namespace Worqbox.UI.ViewModels.User
{
    public class UsersBase
    {
        public int UserID { get; set; }
    }

    public class UserDisbabledNotificationVM
    {
        public int UserID { get; set; }
        public int LoggedInUserID { get; set; }
    }

    public class RolesListingForUserVM
    {
        public int RoleID { get; set; }
        public string SystemName { get; set; }
        public string Role { get; set; }
        public int Priority { get; set; }
        public bool Deactivated { get; set; }
    }


    public class UserWithRoleVM
    {
        public string Name { get; set; }
        public int? UserID { get; set; }
        public int? ResellerID { get; set; }
    }

    public class USERS_NAME_EMAIL_ROLE_PHONE_STATUS_VM : UsersBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public short? Status { get; set; }
        public string RoleName { get; set; }
        public int? RoleID { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

        public string FullName => FirstName + " " + LastName;
    }
}
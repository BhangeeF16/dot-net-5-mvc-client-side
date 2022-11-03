namespace Worqbox.UI.Models
{
    public class UsersListVM
    {
        public int UserID { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? RoleID { get; set; }
        public string RoleName { get; set; }
    }
}
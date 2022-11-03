namespace Worqbox.UI.ViewModels
{
    public class RoleVM
    {
        public int? ID { get; set; }
        public string Role { get; set; }
        public string SystemName { get; set; }
        public bool Deactivated { get; set; }
        public int Priority { get; set; }
    }
}
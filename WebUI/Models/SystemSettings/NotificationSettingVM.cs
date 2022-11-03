namespace Worqbox.UI.Models.SystemSettings
{
    public class NotificationSettingVM
    {
        public int? NotificationSettingID { get; set; }
        public bool? IsWhatsAppService { get; set; }
        public bool? IsSMSService { get; set; }
        public bool? IsEmailService { get; set; }
        public bool? IsSystemSetting { get; set; }
        public int? SchoolID { get; set; }
    }
}
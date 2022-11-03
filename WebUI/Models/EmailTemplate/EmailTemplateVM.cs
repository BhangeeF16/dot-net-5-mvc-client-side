namespace Worqbox.UI.Models.EmailTemplate
{
    public class EmailTemplateVM
    {
        public int? EmailTemplateID { get; set; }
        public string Template { get; set; }
        public string Subject { get; set; }
        public string TemplateName { get; set; }
        public string TemplateType { get; set; }
        public int? TemplateTypeID { get; set; }
        public bool? IsGlobal { get; set; }
        public bool? IsForReseller { get; set; }
        public bool? IsForOrgAdmin { get; set; }
        public bool? IsDefaultSignature { get; set; }
        public string Deactivated { get; set; }

    }


    public class UserWithPreflightTemplateVM
    {
        public int? UserID { get; set; }
        public string UserName { get; set; }
        public string Template { get; set; }
        public string MessageTemplateType { get; set; }
        public string Email { get; set; }
        public bool? EmailNotifications { get; set; }
    }
    public class EmailRequestVM
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsBodyHtml { get; set; } = true;

    }
    public class EmailReponse
    {
        public string WhatsAppSID { get; set; }
        public string SMSSID { get; set; }
        public string EmailStatus { get; set; }
        public string SystemException { get; set; }
    }
}
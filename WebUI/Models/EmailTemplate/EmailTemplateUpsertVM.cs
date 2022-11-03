namespace Worqbox.UI.Models.EmailTemplate
{
    public class EmailTemplateUpsertVM
    {
        public int? EmailTemplateID { get; set; }
        public string TemplateName { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
        public int[] ResellersIDs { get; set; } = new int[0];
        public string ResellerIDs { get; set; }
        public int? MessageTemplateTypeID { get; set; }
        public bool? ChangeStatusFlag { get; set; }
        public bool? IsGlobal { get; set; }
        public bool? IsForReseller { get; set; }
        public bool? IsForOrgAdmin { get; set; }
        public bool? Deactivated { get; set; }
        public bool? IsDefaultSignature { get; set; }
        public bool? IsUnsubscribeLink { get; set; }
        public string BasePath { get; set; }

    }

    public class UsersWithPreflightTemplateVM
    {
        public int? UserID { get; set; }
        public string UserName { get; set; }
        public string Template { get; set; }
        public string Subject { get; set; }
        public string TemplateName { get; set; }
        public string MessageTemplateType { get; set; }
        public string Email { get; set; }
    }

    public class GetUsersWithTemplateRequestVM
    {
        public int[] UserIDs { get; set; }
        public int? TemplateType { get; set; }
        public int? MessageType { get; set; }
        public int? RoleID { get; set; }
        public bool? IsGlobalTemplate { get; set; }
        public string BaseAppURL { get; set; }
    }


    public class EmailResellerVM
    {
        public int ResellerID { get; set; }
        public string ResellerName { get; set; }
    }

    public class EmailTemplatesCountVM
    {
        public int? GlobalTemplateCount { get; set; }
        public int? ResellerTemplateCount { get; set; }
        public int? OrgAdminTemplateCount { get; set; }
    }

    public class EmailTemplateTypeUpsertVM
    {
        public int? EmailTemplateTypeID { get; set; }
        public string Text { get; set; }
        public bool? ChangeStatusFlag { get; set; }
        public bool? Deactivated { get; set; }
        public bool? IsEmail { get; set; }
    }
}
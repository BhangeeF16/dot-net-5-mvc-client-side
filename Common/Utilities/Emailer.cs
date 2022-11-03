using Common.ViewModels.AppSetting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utilities
{
    public static class Emailer
    {
        public static Task<bool> SendEmail(string subject, string body, List<AppSettingVM> appSettings, string to)
        {

            var tcs = new TaskCompletionSource<bool>();
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(appSettings.Where(x => x.Name == SystemSettingsVariables.FromEmail).FirstOrDefault().Value);
            mail.To.Add(new MailAddress(to));
            //mail.CC.Add(new MailAddress("chaudhry@reporteq.com"));
            SmtpClient client = new SmtpClient();
            client.Host = appSettings.Where(x => x.Name == SystemSettingsVariables.SmtpClient).FirstOrDefault().Value;
            client.Port = Convert.ToInt32(appSettings.Where(x => x.Name == SystemSettingsVariables.SmtpPort).FirstOrDefault().Value);
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Credentials = new System.Net.NetworkCredential(appSettings.Where(x => x.Name == SystemSettingsVariables.SmtpUser).FirstOrDefault().Value, appSettings.Where(x => x.Name == SystemSettingsVariables.SmtpPassword).FirstOrDefault().Value);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;
            try
            {
                client.Send(mail);
                tcs.SetResult(true);
            }
            catch (Exception ex)
            {
                return tcs.Task;
            }
            return tcs.Task;
        }

    }
}

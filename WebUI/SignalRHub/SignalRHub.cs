#region Imports

using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

#endregion

namespace Worqbox.UI.SignalRHub
{
    public interface IMessageHubClient
    {
        Task SendMessageStatus(int? studentID, int? status, string selector, string exception);
        Task RemoveMessageStatusLoader(int? studentID);
        Task NoAnyNotificationSubscription(int? studentID);

        Task WhatsAppMessageStatus(int? studentID, string whatsAppSid, bool? IsNumberMissing = false,
            bool? IsDisabled = false);

        Task SMSStatus(int? studentID, string smsSid, bool? IsNumberMissing = false, bool? IsDisabled = false);
        Task EmailStatus(int? studentID, string emailSid);
        Task MessageNotifierAlert();
        Task SendEmailStatus(int? usertID, bool? status, string email);
    }

    public class SignalRHub : Hub<IMessageHubClient>
    {
        public async Task WhatsAppMessageStatus(int? studentID, string whatsAppSid, bool? IsNumberMissing = false,
            bool? IsDisabled = false)
        {
            await Clients.All.WhatsAppMessageStatus(studentID, whatsAppSid, IsNumberMissing, IsDisabled);
        }

        public async Task SMSStatus(int? studentID, string smsSid, bool? IsNumberMissing = false,
            bool? IsDisabled = false)
        {
            await Clients.All.SMSStatus(studentID, smsSid, IsNumberMissing, IsDisabled);
        }

        public async Task EmailStatus(int? studentID, string smsSid)
        {
            await Clients.All.EmailStatus(studentID, smsSid);
        }

        public async Task NoAnyNotificationSubscription(int? studentID)
        {
            await Clients.All.NoAnyNotificationSubscription(studentID);
        }

        public async Task RemoveMessageStatusLoader(int? studentID)
        {
            await Clients.All.RemoveMessageStatusLoader(studentID);
        }

        public async Task SendMessageStatus(int? studentID, int? status, string selector, string exception)
        {
            await Clients.All.SendMessageStatus(studentID, status, selector, exception);
        }

        public async Task MessageNotifierAlert()
        {
            await Clients.All.MessageNotifierAlert();
        }

        public async Task SendEmailStatus(int? userID, bool? status, string email)
        {
            await Clients.All.SendEmailStatus(userID, status, email);
        }

    }



}
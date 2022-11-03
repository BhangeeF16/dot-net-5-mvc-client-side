using Common.Utilities;
using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Services
{
    public interface IEmailService
    {
        void SendMail(string toEmail,string subject,string body,bool isBodyHtml=true);
        Task<bool> UserRegisterEmail(UserInfo user);
        Task<ResponseMessage> ForgotPassword(string Email);
    }
}

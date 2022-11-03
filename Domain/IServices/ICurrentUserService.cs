using Common.ViewModels.UserAccount;

namespace Domain.Services
{
    public interface ICurrentUserService
    {
        string Fullname { get; }
        public string UserId { get; }
        UserVM User { get; }
        public string BaseUrl { get;}
    }
}

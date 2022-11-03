#region Imports

using Common.ViewModels.UserAccount;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;

#endregion

namespace Domain.IRepositories
{
    public interface IUnitOfWork : IDisposable
    {
        int Complete();
        IGenericRepository<UserInfo> UserRepository { get; }
        IGenericRepository<AppSetting> AppSettingRepository { get; }
    }
}
#region Imports

using System;
using Common.ViewModels.UserAccount;
using Domain.Entities;
using Domain.IRepositories;

using Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;

#endregion

namespace Infrastructure.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        #region Private member variables...
        private readonly AppDbContext _context;
        private IGenericRepository<UserInfo> _userRepository;
        private IGenericRepository<AppSetting> _appSettingRepository;
        private IGenericRepository<IdentityRole> _userRoleRepository;
        #endregion

        #region Public Repository Creation properties...
        public IGenericRepository<UserInfo> UserRepository
        {
            get
            {
                if (this._userRepository == null)
                    this._userRepository = new GenericRepository<UserInfo>(_context);
                return _userRepository;
            }
        }

        public IGenericRepository<AppSetting> AppSettingRepository
        {
            get
            {
                if (this._appSettingRepository == null)
                    this._appSettingRepository = new GenericRepository<AppSetting>(_context);
                return _appSettingRepository;
            }
        }
        public IGenericRepository<IdentityRole> UserRoleRepository
        {
            get
            {
                if (this._userRoleRepository == null)
                    this._userRoleRepository = new GenericRepository<IdentityRole>(_context);
                return _userRoleRepository;
            }
        }
        #endregion

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);

        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing) _context.Dispose();
        }
    }
}
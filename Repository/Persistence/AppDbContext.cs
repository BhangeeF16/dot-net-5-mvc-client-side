#region Imports

using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Common.ViewModels;
using Domain.Services;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Domain.Entities;


#endregion

namespace Infrastructure.Persistence
{
    public class AppDbContext : IdentityDbContext<UserInfo, Role, string>
    {
        private readonly ICurrentUserService _currentUserService;
        public AppDbContext(DbContextOptions<AppDbContext> options, ICurrentUserService currentUserService) :
            base(options)
        {
            _currentUserService = currentUserService;
        }
        public DbSet<AppSetting> AppSettings { get; set; }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<Base>())
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedBy = getZeroOrCurrentUserID();
                        entry.Entity.CreatedDate = DateTime.Now;
                        //entry.Entity.ModifiedBy = getZeroOrCurrentUserID();
                        //entry.Entity.ModifiedDate = DateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.ModifiedBy = getZeroOrCurrentUserID();
                        entry.Entity.ModifiedDate = DateTime.Now;
                        break;
                }

            return base.SaveChangesAsync(cancellationToken);
        }

        private string getZeroOrCurrentUserID()
        {
            var id = "0";
            try
            {
                if (_currentUserService?.UserId != "0") {
                    id = _currentUserService?.UserId;
                 }
            }
            catch (Exception)
            {
            }

            return id;
        }

        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries<Base>())
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedBy = getZeroOrCurrentUserID();
                        entry.Entity.CreatedDate = DateTime.Now;
                        //entry.Entity.ModifiedBy = getZeroOrCurrentUserID();
                        //entry.Entity.ModifiedDate = DateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.ModifiedBy = getZeroOrCurrentUserID();
                        entry.Entity.ModifiedDate = DateTime.Now;
                        break;
                }

            return base.SaveChanges();
        }
    }
}
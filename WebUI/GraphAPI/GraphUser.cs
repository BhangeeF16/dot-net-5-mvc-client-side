using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebUI.GraphAPI
{
    public class GraphUser : IGraphUser
    {
        private static GraphServiceClient _graphClient;
        private static string _domain;
        public GraphUser(IConfiguration configuration, GraphServiceClient graphServiceClient)
        {
            IConfigurationSection config = configuration.GetSection("AzureAd");
            _domain = config["Domain"];

            //_tenantId = config["TenantId"];
            //_clientId = config["ClientId"];
            //_redirectUri = config["redirectUri"];
            //_clientSecret = config["ClientSecret"];
            //_authority = $"https://login.microsoftonline.com/{_tenantId}/v2.0";

            _graphClient = graphServiceClient;
        }

        public async Task<User> CreateUserAsync(string displayName = "SDK Test User", string alias = "sdk_test", string password = "ChangeThis!0")
        {
            User userToAdd = BuildUserToAdd(displayName, alias, password);
            return await _graphClient.Users.Request().AddAsync(userToAdd);
        }
        public async Task<User> FindByAlias(string alias)
        {
            List<QueryOption> queryOptions = new List<QueryOption>
            {
                new QueryOption("$filter", $@"mailNickname eq '{alias}'")
            };

            IGraphServiceUsersCollectionPage userResult = await _graphClient.Users.Request(queryOptions).GetAsync();
            if (userResult.Count != 1) throw new ApplicationException($"Unable to find a user with the alias {alias}");
            return userResult[0];
        }
        private static User BuildUserToAdd(string displayName, string alias, string password)
        {
            PasswordProfile passwordProfile = new PasswordProfile
            {
                Password = password,
                ForceChangePasswordNextSignIn = true
            };
            User user = new User
            {
                DisplayName = displayName,
                UserPrincipalName = $@"{alias}@{_domain}",
                MailNickname = alias,
                AccountEnabled = true,
                PasswordProfile = passwordProfile
            };
            return user;
        }
    }
    public interface IGraphUser
    {
        Task<User> FindByAlias(string alias);
        Task<User> CreateUserAsync(string displayName = "SDK Test User", string alias = "sdk_test", string password = "ChangeThis!0");
    }
}

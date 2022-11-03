#region Imports

using Microsoft.Extensions.Configuration;

#endregion

namespace Worqbox.UI.AuthorizationHelper
{
    public class SiteKeys
    {
        private static IConfigurationSection _configuration;

        public static string AppEnviornment => _configuration["AppEnviornment"];
        public static string BaseAPIUrl => _configuration["BaseAPIUrl"];
        public static string AccessKeyID => _configuration["AccessKeyID"];
        public static string SecretAccessKey => _configuration["SecretAccessKey"];
        public static string AwsHeader => _configuration["AwsHeader"];

        public static void Configure(IConfigurationSection configuration)
        {
            _configuration = configuration;
        }
    }
}
#region Imports

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Worqbox.UI.Attributes;
using Worqbox.UI.Authentication;
using Worqbox.UI.AuthorizationHelper;
using Worqbox.UI.Common;
using Worqbox.UI.ViewModels;

#endregion

namespace Worqbox.UI
{
    [BreadcrumbActionFilter]
    public class BaseController : Controller
    {
        public async Task CreateAuthenticationTicket(string accessToken)
        {
            HttpContext.Session.SetString("JWToken", accessToken);
        }

        public async Task CreateAuthenticationTicket(PersonVM user)
        {
            try
            {
                #region Create Token

                // Set time for expire token
                var tokenExpiryTime = DateTime.UtcNow;
                tokenExpiryTime = tokenExpiryTime.AddMinutes(1440);
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8y/B?E(H+MbQeThWmYq3t");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                        {
                            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                            new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName),
                            new Claim(ClaimTypes.Email, !string.IsNullOrWhiteSpace(user.Email) ? user.Email : ""),
                            new Claim(ClaimTypes.Actor, user.Id.ToString()),
                            new Claim(ClaimTypes.UserData, JsonConvert.SerializeObject(user)),
                            new Claim("isFirstLogin",user.LastPasswordChanged==null?"1":"0")
                        }),
                    Expires = tokenExpiryTime,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                            SecurityAlgorithms.HmacSha256Signature)
                };


                var token = tokenHandler.CreateToken(tokenDescriptor);

                #endregion

                HttpContext.Session.SetString("JWToken", tokenHandler.WriteToken(token));
            }
            catch (Exception ex)
            {
            }
        }

        public async Task SwitchRole(UserInfoVM user, string role)
        {
            #region Create Token

            // Set time for expire token
            var tokenExpiryTime = DateTime.UtcNow;
            tokenExpiryTime = tokenExpiryTime.AddMinutes(730);
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(LUSecretManager.GetSecret(SiteKeys.AwsHeader)?.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new(ClaimTypes.NameIdentifier, user?.UserID.ToString()),
                    new Claim(ClaimTypes.Name, user?.FirstName + " " + user?.LastName),
                    new Claim(ClaimTypes.Email, !string.IsNullOrWhiteSpace(user.Email) ? user.Email : ""),
                    new Claim(ClaimTypes.Actor, user?.UserID.ToString()),
                    new Claim("UserProfile", user.ProfileImage != null ? user.ProfileImage : ""),
                    new Claim(ClaimTypes.UserData, JsonConvert.SerializeObject(user))
                }),
                Expires = tokenExpiryTime,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, role));


            tokenDescriptor.Subject.AddClaim(new Claim("RoleID",
                user?.UserRoles?.Where(a => a.SystemName == role?.Trim())?.FirstOrDefault().ID.ToString()));

            var token = tokenHandler.CreateToken(tokenDescriptor);

            #endregion

            HttpContext.Session.Remove("JWToken");
            HttpContext.Session.SetString("JWToken", tokenHandler.WriteToken(token));

            HttpContext.Session.SetObjectAsJson("SelectedRole", role);
        }
    }
}
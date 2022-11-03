#region Imports

using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using System.Security.Claims;

#endregion

namespace Worqbox.UI.AuthorizationHelper
{
    public class AuthorizeAttribute : TypeFilterAttribute
    {
        public AuthorizeAttribute(params string[] claim) : base(typeof(AuthorizeFilter))
        {
            Arguments = new object[] { claim };
        }
    }

    public class AuthorizeFilter : IAuthorizationFilter
    {
        private readonly string[] _claim;

        public AuthorizeFilter(params string[] claim)
        {
            _claim = claim;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var IsAuthenticated = context.HttpContext.User.Identity.IsAuthenticated;
            var claimsIndentity = context.HttpContext.User.Identity as ClaimsIdentity;

            if (IsAuthenticated)
            {
                var flagClaim = false;
                foreach (var item in _claim)
                    if (context.HttpContext.User.HasClaim(ClaimTypes.Role, item))
                        flagClaim = true;

                if (!flagClaim)
                {
                    if (context.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                        context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized; //Set HTTP 401   
                    else
                        context.Result = new RedirectResult("~/Home/Error");
                }
            }
            else
            {
                if (context.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                    context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden; //Set HTTP 403 -   
                else
                {
                    string returnUrl = context.HttpContext.Request.GetEncodedUrl();

                    context.Result = new RedirectResult($"~/Home/Error?returnUrl={returnUrl}");
                }
            }
        }
    }
}
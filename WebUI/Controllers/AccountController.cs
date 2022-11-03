using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Web.ViewModels;
using WebUI.API_Helper;
using WebUI.Models.ProjectForecast;
using Worqbox.UI.API_Helper;
using Worqbox.UI.Models.General;
using Worqbox.UI.ViewModels;

namespace Worqbox.UI.Controllers
{
    public class AccountController : BaseController
    {


        private readonly APIHelper _apihelper;
        private readonly AppSettings _appSettings;

        public AccountController(IOptions<AppSettings> appSettings, APIHelper apihelper)
        {
            _appSettings = appSettings.Value;
            _apihelper = apihelper;
        }


        public IActionResult Confirmation() => View();
        public IActionResult Error() => View();
        public IActionResult Error404() => View();
        public IActionResult ErrorAnnounced() => View();
        public IActionResult Forgot() => View();
        [HttpPost]
        public async Task<IActionResult> Forgot(string Email)
        {
            try
            {
                return Json(new { });
            }
            catch (Exception ex)
            {
                return Json(false);
            }

        }
        public IActionResult Locked() => View();
        public async Task<IActionResult> Login(string returnUrl)
        {
            TempData["returnUrl"] = TempData["callUrl"];
            ViewBag.AppEnviornment = _appSettings.AppEnviornment;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(AccountLoginModel loginVM, string returnUrl)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response =
                        await _apihelper.PostAsync<Authentication.UserWithTokenVM, AccountLoginModel>(ApiRoute.AuthenticateUser, loginVM);
                    if (response != null && response.StatusCode == HttpStatusCode.OK)
                    {
                        await CreateAuthenticationTicket(response?.Result?.User);

                        if (!string.IsNullOrWhiteSpace(returnUrl))
                        {
                            string decodeURL = HttpUtility.UrlDecode(returnUrl);
                            return Redirect(decodeURL);
                        }
                        return RedirectToAction("Index", "Home");
                    }

                    ModelState.AddModelError("", "Invalid login attempt. Username or password is incorrect.");
                }
                else
                {
                    ModelState.AddModelError("", "Invalid login attempt. Username or password is incorrect.");
                }

                return View();
            }
            catch (Exception ex)
            {
                ViewBag.ExceptionMessage = "Debugger: " + ex.Message;
                return View();
            }
        }
        public async Task<IActionResult> Logout()
        {
             HttpContext.Session.Clear();
            return RedirectToAction("Login", "Account");
        }
        public IActionResult LoginAlt() => View();
        public IActionResult Register() => View();

        private static byte[] DecodeUrlBase64(string s)
        {
            s = s.Replace(' ', '+').Replace('-', '+').Replace('_', '/').PadRight(4 * ((s.Length + 3) / 4), '=');
            return Convert.FromBase64String(s);
        }
        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> ResetPassword(string token)
        {
            try
            {
                return View();
            }
            catch (Exception ex)
            {
                ViewBag.Message = "Something went wrong";
                return View("Error");
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword()
        {

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword(string newPassword,string confirmpassword)
        {
            try
            {
                
                    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                        var setPassword = new SetPasswordVM
                        {
                            UserID = Int32.Parse(userId),
                            Password = newPassword
                        };
                        var response = await _apihelper.PostAsync<AffectedRowsVM, SetPasswordVM>("People/SetPassword", setPassword);
                var loginVM = new AccountLoginModel();
                loginVM.Email= User.FindFirstValue(ClaimTypes.Email);
                loginVM.Password= newPassword;
                var loginResponse = await _apihelper.PostAsync<Authentication.UserWithTokenVM, AccountLoginModel>(ApiRoute.AuthenticateUser, loginVM);
                if (loginResponse != null && loginResponse.StatusCode == HttpStatusCode.OK)
                {
                    await CreateAuthenticationTicket(loginResponse?.Result?.User);
                }
                    return Json(new { success = response?.Result.AffectedRows > 0 });
                
            }
            catch (Exception e)
            {
                return Json(false);
            }
        }

    }
}

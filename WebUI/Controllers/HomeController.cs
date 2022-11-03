
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Worqbox.UI.ViewModels;

namespace Worqbox.UI.Controllers
{
    [Authorize]
    public class HomeController : BaseController
    {
        public HomeController()
        {

        }
        public async Task<IActionResult> Index()
        {
            
            return View();
        }

        public IActionResult ManageForecastByProject() => View();
        public IActionResult ManageForecastByResource() => View();

        [AllowAnonymous]
        public IActionResult ResetPasswordTemplate()
        {
            return View("~/Views/EmailTemplates/ResetPassword.cshtml");
        }
        [AllowAnonymous]
        public IActionResult ForgotPasswordTemplate()
        {
            return View("~/Views/EmailTemplates/ForgotPassword.cshtml");
        }

        public IActionResult Profile() => View();
    }
}

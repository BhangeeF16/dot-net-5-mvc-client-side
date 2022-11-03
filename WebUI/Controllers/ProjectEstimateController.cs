using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace Worqbox.UI.Controllers

{
    public class ProjectEstimateController : BaseController
    {
        public IActionResult ProjectEstimate()
        {
            return View();
        }
    }
}

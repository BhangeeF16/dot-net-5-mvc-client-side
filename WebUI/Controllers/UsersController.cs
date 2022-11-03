using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;
using System.Threading.Tasks;
using WebUI.GraphAPI;
using Worqbox.UI;

namespace WebUI.Controllers
{
    [Authorize]
    public class UsersController : BaseController
    {
        private readonly IGraphUser _graphUser;

        public UsersController(IGraphUser graphUser)
        {
            this._graphUser = graphUser;
        }

        [HttpGet("/users/graph")]
        [AuthorizeForScopes(ScopeKeySection = "DownstreamApi:Scopes")]
        public async Task<ActionResult> CreateGraphUserAsync()
        {
            var response = await _graphUser.CreateUserAsync();
            return Json(response);
        }
        [Authorize]
        public ActionResult SystemSetting()
        {
            return View();
        }
    }
}

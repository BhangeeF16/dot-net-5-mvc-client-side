using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebUI.API_Helper;
using WebUI.Models;
using WebUI.Models.ProjectForecast;
using Worqbox.UI;
using Worqbox.UI.API_Helper;
namespace Worqbox.UI.Controllers

{
    public class HRController : BaseController
    {
        private readonly APIHelper _apihelper;

        public HRController(APIHelper apihelper)
        {
            _apihelper = apihelper;
        }
        public IActionResult People()
        {
            return View();
        }
        public IActionResult LMS()
        {
            return View();
        }
        public IActionResult LeavesPolicy()
        {
            return View();
        }
        public async Task<IActionResult> GetPeopleAsync()
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            //var response = await _apihelper.GetAsync<People>(
            //    $"{"Worqbox/GetHRPeopleAsync"}");
            var response = new List<People>();
            response.Add(new People
            {
                FirstName ="Farhan",
                LastName ="Ali",
                Teams="Managment",
                Tier=1,
                Title="Test",
                Name="Farhan",
                CreatedDate = System.DateTime.Now,
                Email="Test@gmail.com",
                Mobile="564564456"
            });
            return PartialView("~/Views/partialViews/_HRPeopleListingPV.cshtml", response);
        }
    }
}

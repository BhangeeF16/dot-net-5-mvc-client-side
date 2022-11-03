using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebUI.API_Helper;
using WebUI.Models.ProjectForecast;
using Worqbox.UI;
using Worqbox.UI.API_Helper;

namespace WebUI.Controllers
{
    [Authorize]
    public class ReportsController : BaseController
    {
        public ReportsController(APIHelper apihelper)
        {
            _apihelper = apihelper;
        }

        public APIHelper _apihelper { get; }

        public IActionResult Index()
        {
            return View();
        }
        #region TLReportsByProject
        public IActionResult TLReportsByProjectPV(WB_ForecastingManagementRequestVM requestVm)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });

            var response = _apihelper
                .PostAsync<List<WB_ForecastingManagementResponseVM>, WB_ForecastingManagementRequestVM>(ApiRoute.TLReportsByProject, requestVm)
                .Result;
            return PartialView("~/Views/partialViews/_TLReportsByProjectListingPV.cshtml", response?.Result);
        }
        public IActionResult TLReportsByProject()
        {
            return View();
        }
        #endregion TLReportsByProject




        #region TLReportsByrUser
        public IActionResult TLReportsByUserPV(sp_GetResourcesForecastRequestVM requestVm)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });

            var response = _apihelper
                .PostAsync<List<sp_GetResourcesForecast>, sp_GetResourcesForecastRequestVM>(ApiRoute.TLReportsByUser, requestVm)
                .Result;
            return PartialView("~/Views/partialViews/_TLReportsByUserListingPV.cshtml", response?.Result);
        }
        public IActionResult TLReportsByUser()
        {
            return View();
        }
        #endregion TLReportsByProject



    }
}

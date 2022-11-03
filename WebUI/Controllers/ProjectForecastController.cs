using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebUI.API_Helper;
using WebUI.Models.ProjectForecast;
using Worqbox.UI;
using Worqbox.UI.API_Helper;

namespace WebUI.Controllers
{
    public class ProjectForecastController : BaseController
    {
        private readonly APIHelper _apihelper;

        public ProjectForecastController(APIHelper apihelper)
        {
            _apihelper = apihelper;
        }

        public async Task<IActionResult> Index()
        {
            return View();
        }

        public async Task<ActionResult> GetProjectLookup()
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            var response = await _apihelper.GetAsync<LookupVM>(
                $"{"Worqbox/LookupProjects"}");
            return Json(response?.Result);
        }
        public async Task<ActionResult> LookupPeople()
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            var response = await _apihelper.GetAsync<PeopleLookupVM>(
                $"{"Worqbox/LookupPeople"}");
            return Json(response?.Result);
        }

        public async Task<IActionResult> UpsertProjectForecastForResource(
       UpsertProjectForecastForResourceReqeustVM upsertProjectForecastForResourceReqeustVM)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });

            var response =
                await _apihelper.PostAsync<UpsertProjectForecastResponseVM, UpsertProjectForecastForResourceReqeustVM>(
                    $"{ApiRoute.UpsertProjectForecastForResource}", upsertProjectForecastForResourceReqeustVM);
            return Json(new { affectedRows = response?.Result?.Id });
        }


        public async Task<IActionResult> UpsertProjectForcastRequest(
            [FromBody] UpsertProjectForecastVM upsertProjectForcastRequestVM)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });

            var response =
                await _apihelper.PostAsync<UpsertProjectForecastResponseVM, List<UpsertProjectForecastRequestVM>>(
                    $"{ApiRoute.UpsertProjectForcast}", upsertProjectForcastRequestVM.UpsertProjectForecastRequestVM);
            return Json(new { affectedRows = response?.Result.Id });
        }



        public async Task<IActionResult> DeleteProjectForecast(
           DeleteGeneralVM deleteGeneralVM)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });

            var response =
                await _apihelper.PostAsync<AffectedRowsVM, DeleteGeneralVM>(
                   $"Worqbox/DeleteProjectForecast", deleteGeneralVM);
            return Json(new { affectedRows = response?.Result.AffectedRows });
        }

        public async Task<IActionResult> DeleteResourcesForecast(
           DeleteGeneralVM deleteGeneralVM)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });

            var response =
                await _apihelper.PostAsync<AffectedRowsVM, DeleteGeneralVM>(
                   $"Worqbox/DeleteResourcesForecast", deleteGeneralVM);
            return Json(new { affectedRows = response?.Result.AffectedRows });
        }

        public IActionResult GetAllProjectForcast(sp_GetProjectsForecastsRequestVM requestVm)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            var response = _apihelper
                .PostAsync<List<sp_GetProjectsForecasts>, sp_GetProjectsForecastsRequestVM>($"Worqbox/GetProjectsForecasts", requestVm)
                .Result;
            return PartialView("~/Views/partialViews/_ProjectForecastListingPV.cshtml", response?.Result);
        }

        

        public async Task<IActionResult> GetResourceAllocationDetail(sp_GetResourcesForecastRequestVM requestVm)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            var response = _apihelper
                .PostAsync<sp_GetResourcesForecast, sp_GetResourcesForecastRequestVM>($"Worqbox/GetResourceAllocationDetail", requestVm)
                .Result;
            sp_GetResourcesForecast info = response?.Result;
            return Json(new { data = info });
        }
        public IActionResult GetResourcesForecast(sp_GetResourcesForecastRequestVM requestVm)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            var response = _apihelper
                .PostAsync<List<sp_GetResourcesForecast>, sp_GetResourcesForecastRequestVM>($"Worqbox/GetResourcesForecast", requestVm)
                .Result;
            return PartialView("~/Views/partialViews/_ProjectForecastForResourceListingPV.cshtml", response?.Result);
        }
        public IActionResult GetForecastResources(sp_GetResourcesForecastRequestVM requestVm)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            var response = _apihelper
                .PostAsync<List<sp_GetResourcesForecast>, sp_GetResourcesForecastRequestVM>($"Worqbox/GetForecastResources", requestVm)
                .Result;
            return PartialView("~/Views/partialViews/_ProjectForecastForResourceListingPV.cshtml", response?.Result);
        }
        public IActionResult GetForecastResourcesDetail(sp_GetResourcesForecastRequestVM requestVm)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            var response = _apihelper
                .PostAsync<List<sp_GetResourcesForecast>, sp_GetResourcesForecastRequestVM>($"Worqbox/GetResourcesForecast", requestVm)
                .Result;
            return PartialView("~/Views/partialViews/_ProjectForecastForResourceListingDetail.cshtml", response?.Result);
        }
    }
}

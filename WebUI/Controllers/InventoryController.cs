using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebUI.Models;
using WebUI.Models.ProjectForecast;
using Worqbox.UI.API_Helper;

namespace Worqbox.UI.Controllers
{
    public class InventoryController : BaseController
    {
        
        private readonly APIHelper _apihelper;

        public InventoryController(APIHelper apihelper)
        {
            _apihelper = apihelper;
        }

        public async Task<IActionResult> InventoryList()
        {
            return View();
        }

        public async Task<IActionResult> UpsertInventoryDetail(
     UpsertInventoryDetailRequestVM upsertInventoryDetailVM)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            upsertInventoryDetailVM.LoggedInUserID = Convert.ToInt32(User?.Claims?.Where(x=>x.Type == ClaimTypes.NameIdentifier)?.FirstOrDefault().Value);
            var response = await _apihelper.PostAsync<AffectedRowsVM, UpsertInventoryDetailRequestVM>($"Inventory/UpsertInventoryDetail", upsertInventoryDetailVM);
            return Json(new {response?.Result });
        }

        public async Task<IActionResult> UpsertInventoryAllocationDetail(
    UpsertInventoryAllocationDetailRequestVM  upsertInventoryAllocationDetailRequestVM)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            int _userID = Convert.ToInt32(User?.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier)?.FirstOrDefault().Value);
            upsertInventoryAllocationDetailRequestVM.LoggedInUserID = _userID;
            upsertInventoryAllocationDetailRequestVM.LoggedInUserID = _userID;
            var response =  await _apihelper.PostAsync<AffectedRowsVM, UpsertInventoryAllocationDetailRequestVM>($"Inventory/UpsertInventoryAllocationDetail", upsertInventoryAllocationDetailRequestVM);
            return Json(new { response?.Result });
        }


        public IActionResult GetInventoryDetails(InventoryDetailRequestVM requestVm)
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            var response = _apihelper
                .PostAsync<List<InventoryDetailVM>, InventoryDetailRequestVM>($"Inventory/GetInventoryDetails", requestVm)
                .Result;
            return PartialView("~/Views/partialViews/_InventoryDetailListingPV.cshtml", response?.Result);
        }

        public async Task<ActionResult> LookupDeviceCondition()
        {
            if (User?.Claims?.Count() <= 1)
                return Json(new { validate = "Un-Authorized" });
            var response = await _apihelper.GetAsync<LookupVM>(
                $"{"Inventory/LookupDeviceCondition"}");
            return Json(response?.Result);
        }

    }
}

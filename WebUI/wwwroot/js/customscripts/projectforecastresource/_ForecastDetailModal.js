
let $dataFormPR = $('#ForecastForResourceForm');
$(document).off('click', "#ForecastForResourcebtn").on('click', "#ForecastForResourcebtn", function (e) {
    if (worqbox.validateForm($dataFormPR)) {
        debugger
        let EstBillable = parseInt($("#EstBillable").text());
        let EstNonBillable = parseInt($("#EstNonBillable").text());
        let EstTotalAssignedBillable = parseInt($("#EstTotalAssignedBillable").text());
        let EstTotalAssignedNonBillable = parseInt($("#EstTotalAssignedNonBillable").text());

        let _EstBillableInput = parseInt($("#EstimatedBillableHoursResource").val());
        let _EstNonBillableInput = parseInt($("#EstimatedNonBillableHoursResource").val());
        let BillableMaxLimit = EstTotalAssignedBillable + _EstBillableInput;
        let NonBillableMaxLimit = EstTotalAssignedNonBillable + _EstNonBillableInput;


        if (BillableMaxLimit > EstBillable)
        {
            worqbox.showAlertWithType(`You have already exceeded the limit for maximum allowed hours.`, "info", 3000);
            return false;
        }
        if (NonBillableMaxLimit > EstNonBillable) {
            worqbox.showAlertWithType(`You have already exceeded the limit for maximum allowed hours.`, "info", 3000);
            return false;

        }


        let requestParam = worqbox.getFormDataWithSerializedArray('ForecastForResourceForm');
        worqbox.ajaxPostDataWithFiles("/ProjectForecast/UpsertProjectForecastForResource", requestParam, "", function (data) {
            if (data?.affectedRows > 0) {
                worqbox.showAlertWithType("Resource upsert Successfully.", "success", 3000);
                $dataFormPR.trigger("reset");
                let _forcastID = $("#ProjectForecastId").val();
                worqbox.partialPageLoadingToElement(`/ProjectForecast/GetResourcesForecast?projectForeCastId=${_forcastID}`, null, "ProjectForcastForResourceSection");
            } else {
                worqbox.showAlertWithType("Something went wrong! Please contact Support.", "error", 3000);
            }
        });
    }
    else {
        return false;
    }
});


BindResourceHrs = function () {

    $("#ResourceEstimatedBillableHoursDiv").addClass('d-none');
    $("#ResourceEstimatedNonBillableHoursDiv").addClass('d-none');
    let _resourceUsername = $("#SelectListforResourceDev option:selected").val();
    if (_resourceUsername != null && _resourceUsername != '') {

        $("#ResourceEstimatedBillableHoursDiv").removeClass('d-none');
        $("#ResourceEstimatedNonBillableHoursDiv").removeClass('d-none');
     

        let _forcastID = parseInt($("#ProjectForecastId").val());
        worqbox.ajaxPostDataWithFiles(`/ProjectForecast/GetResourceAllocationDetail?projectForeCastId=${_forcastID}&resourceUsername=${_resourceUsername}`, null, "", function (data) {
            if (data != null) {
                
                $("#ResourceEstimatedBillableHours").val(data.data.estimatedBillableHours);
                $("#ResourceEstimatedNonBillableHours").val(data.data.estimatedNonBillableHours);
            } 
        });


    }



}
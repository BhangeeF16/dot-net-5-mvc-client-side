$(document).ready(function () {
    setDefaultMonth = function () {
        debugger
        let userID = $("#LoggedInUserID").val();
        let defaultMonthFromLocalStorage = localStorage.getItem(`DefaultMonth_${userID}`);
        if (defaultMonthFromLocalStorage == "" || defaultMonthFromLocalStorage == null) {
            let date = new Date(Date.now());
            let currentMonthName = date.toLocaleString('en-US', { month: 'short' });

            $("#DefaultMonthLookup option").each(function () {
                if ($(this).text() == currentMonthName) {
                    $(this).attr('selected', 'selected');
                }
            });
        }
    }
    setDefaultMonth();
    BindMonthProjectResourceForecastRecord = function () {
        let userID = $("#LoggedInUserID").val();
        let _defaultMonth = $("#DefaultMonthLookup option:selected").val();
        if (_defaultMonth != null && _defaultMonth != '') {
            localStorage.setItem(`DefaultMonth_${userID}`, _defaultMonth);
            worqbox.partialPageLoadingToElement(`/ProjectForecast/GetForecastResources?BillingMonth=${_defaultMonth}`, null, "ProjectForcastResourceTemplateTypeSection");
        }

    }
    $.ajax({
        type: "GET",
        url: `/ProjectForecast/LookupPeople`,
        data: "{}",
        success: function (data) {
            var options = '<option value="">Select Resource</option>';
            if (data != null) {
                options += data.map((item) => `<option value="${item.username}">${item.fullName}</option>`);
                $(".SelectListforResourceLookup").html(options);
            }
            $('.SelectListforResourceLookup').select2();
        }
    });
    $.ajax({
        type: "GET",
        url: `/ProjectForecast/GetProjectLookup`,
        data: "{}",
        success: function (data) {
            var options = '<option value="">Select Project</option>';
            if (data != null) {
                options += data.map((item) => `<option value="${item.id}">${item.title}</option>`);
                $(".SelectListforProjectLookup").html(options);
            }
            $('.SelectListforProjectLookup').select2();
        }
    });
    LoadListing = function (requestParam = null) {

        var path = `/ProjectForecast/GetForecastResources`;
        if (requestParam == null) {
            let userID = $("#LoggedInUserID").val();
            let _defaultMonth = localStorage.getItem(`DefaultMonth_${userID}`);
            if (_defaultMonth != null && _defaultMonth != '') {
                $("#DefaultMonthLookup").val(_defaultMonth);
                path = `/ProjectForecast/GetForecastResources?BillingMonth=${_defaultMonth}`;
            }
        }

        worqbox.partialPageLoadingToElement(path, requestParam, "ProjectForcastResourceTemplateTypeSection");
    }

    LoadListing();
    let $dataFormFilter = $('#upsertforcastformFilter');
    $(document).off('click', "#upsertResourceforcastformFilterbtn").on('click', "#upsertResourceforcastformFilterbtn", function (e) {
        let requestParam = worqbox.getFormData($dataFormFilter);
        LoadListing(requestParam);
    });

    ResouceFroecastDetailModel = function (projectforecastID, ProjectName, EstBillable, EstNonBillable, LoggedNonBillable, LoggedBillable, TotalLoggedInMonth, BillingMonthNum,BillingMonth,ResourceName,UserName) {
        //$("#ResourceEstimatedBillableHoursDiv").addClass('d-none');
        //$("#ResourceEstimatedNonBillableHoursDiv").addClass('d-none');

        $.ajax({
            type: "GET",
            url: `/ProjectForecast/GetProjectLookup`,
            data: "{}",
            success: function (data) {
                var options = '<option value="">Select Project</option>';
                if (data != null) {
                    options += data.map((item) => `<option value="${item.id}">${item.title}</option>`);
                    $(".SelectListforProjectLookup").html(options);
                }
                $('.SelectListforProjectLookup').select2();
            }
        });
        $("#ProjectForecastId").val(projectforecastID);
        $("#EstBillable").html('').append(EstBillable);
        $("#EstNonBillable").html('').append(EstNonBillable);
        $("#LoggedNonBillable").html('').append(LoggedNonBillable);
        $("#LoggedBillable").html('').append(LoggedBillable);
        $("#TotalLoggedInMonth").html('').append(TotalLoggedInMonth);
        $("#ProjectName").html('').append(ProjectName);
        $("#BillingMonth").html('').append(BillingMonth);
        $("#ResouceName").html('').append(ResourceName);


        worqbox.partialPageLoadingToElement(`/ProjectForecast/GetForecastResourcesDetail?ResourceUsername=${UserName}&BillingMonth=${BillingMonthNum}`, null, "ProjectForcastTemplateTypeSection");

        $("#addForcastDetailModal").modal('show');
    }
    DeleteForecast = function (id) {
        worqbox.showDecisionAlertWithHTmlCustom("", "Do you want to delete this project forcast?", "info", "Yes", function () {
            worqbox.ajaxPostCall(`/ProjectForecast/DeleteResourcesForecast?forecastdetailid=${id}`, null, function (data) {
                if (data?.affectedRows > 0) {
                    worqbox.showAlertWithType("Forecast deleted successfully.", "success", 3000);
                    LoadListing();
                } else {
                    worqbox.showAlertWithType("Something wrong.", "info", 3000)
                }
            });

        },
            function () { }, "No")
    }
    Reset = function () {
        $('#SelectListforResource').val('').change(); // Select the option with a value of ''
        $('#SelectListforMonthD').val(0); // Select the option with a value of ''
        $('#SelectListforYearResource').val(0); // Select the option with a value of ''
     
       
        LoadListing();
      
    }
})
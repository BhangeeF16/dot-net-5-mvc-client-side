
$(document).ready(function () {

    setDefaultMonth = function () {
        debugger
        let userID = $("#LoggedInUserID").val();
        let defaultMonthFromLocalStorage = localStorage.getItem(`DefaultMonth_${userID}`);
        if (defaultMonthFromLocalStorage == "" || defaultMonthFromLocalStorage == null) {
            let date = new Date(Date.now());
            let currentMonthName=date.toLocaleString('en-US', { month: 'short' });

            $("#DefaultMonthLookup option").each(function () {
                if ($(this).text() == currentMonthName) {
                    $(this).attr('selected', 'selected');
                }
            });
        }
    }

    setDefaultMonth();

    BindMonthProjectForecastRecord = function () {
        let userID = $("#LoggedInUserID").val();
        let _defaultMonth = $("#DefaultMonthLookup option:selected").val();
        if (_defaultMonth != null && _defaultMonth != '')
        {
            localStorage.setItem(`DefaultMonth_${userID}`, _defaultMonth);
            worqbox.partialPageLoadingToElement(`/ProjectForecast/GetAllProjectForcast?BillingMonth=${_defaultMonth}`, null, "ProjectForcastTemplateTypeSection");
        }
        let date = new Date(Date.now());
        let currentMonthName = date.toLocaleString('en-US', { month: 'short' });

        $("#SelectListforMonth").val(_defaultMonth).change();
        $('#SelectListforMonth').select2();

    }

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

        var path = `/ProjectForecast/GetAllProjectForcast`;
        if (requestParam == null)
        {
            let userID = $("#LoggedInUserID").val();
            let _defaultMonth = localStorage.getItem(`DefaultMonth_${userID}`);
            if (_defaultMonth != null && _defaultMonth != '')
            {
                $("#DefaultMonthLookup").val(_defaultMonth);
                path = `/ProjectForecast/GetAllProjectForcast?BillingMonth=${_defaultMonth}`;
            }
        }

        worqbox.partialPageLoadingToElement(path, requestParam, "ProjectForcastTemplateTypeSection");
    }

    LoadListing();

    ForecastDetailModel = function (projectforecastID, ProjectName, EstBillable, EstNonBillable, LoggedNonBillable, LoggedBillable, TotalLoggedInMonth, BillingMonth,Projectid) {
        $("#ResourceEstimatedBillableHoursDiv").addClass('d-none');
        $("#ResourceEstimatedNonBillableHoursDiv").addClass('d-none');
        $.ajax({
            type: "GET",
            url: `/ProjectForecast/LookupPeople`,
            data: "{}",
            success: function (data) {
                var options = '';
                if (data != null) {
                    options += '<option value="">Select Resource</option>';
                    options += data.map((val) => `<option value='${val.username}' >${val.fullName}</option>`);

                    $(".SelectListforLookupPeople").html(options);
                }
                $('.SelectListforLookupPeople').select2();
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
       

        worqbox.partialPageLoadingToElement(`/ProjectForecast/GetResourcesForecast?projectForeCastId=${projectforecastID}`, null, "ProjectForcastForResourceSection");

        $("#addForcastDetailModal").modal('show');
    }

    DeleteForecast = function (id) {
        worqbox.showDecisionAlertWithHTmlCustom("", "Do you want to delete this project forcast?", "info", "Yes", function () {
            worqbox.ajaxPostCall(`/ProjectForecast/DeleteProjectForecast?forecastId=${id}`, null, function (data) {
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

    DeleteResource = function (id) {
        worqbox.showDecisionAlertWithHTmlCustom("", "Do you want to delete this resource from forcast?", "info", "Yes", function () {
            worqbox.ajaxPostCall(`/ProjectForecast/DeleteResourcesForecast?forecastdetailid=${id}`, null, function (data) {
                if (data?.affectedRows > 0) {
                    worqbox.showAlertWithType("Resource deleted successfully.", "success", 3000);
                    let _forcastID = $("#ProjectForecastId").val();
                    worqbox.partialPageLoadingToElement(`/ProjectForecast/GetResourcesForecast?projectForeCastId=${_forcastID}`, null, "ProjectForcastForResourceSection");

                } else {
                    worqbox.showAlertWithType("Something wrong.", "info", 3000)
                }
            });

        },
            function () { }, "No")
    }

    let $dataFormFilter = $('#upsertforcastformFilter');
    $(document).off('click', "#upsertforcastformFilterbtn").on('click', "#upsertforcastformFilterbtn", function (e) {
        let requestParam = worqbox.getFormData($dataFormFilter);
        LoadListing(requestParam);
    });
});
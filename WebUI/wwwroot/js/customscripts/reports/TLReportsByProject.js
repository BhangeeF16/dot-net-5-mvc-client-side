
$(document).ready(function () {
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
        debugger
        var path = `/Reports/TLReportsByProjectPV`;

        worqbox.partialPageLoadingToElement(path, requestParam, "TLReportsByProjectSection");
    }

    LoadListing();

    let $dataForm = $('#upsertforcastformFilter');
    $(document).off('click', "#SearchBTnForProjectTL").on('click', "#SearchBTnForProjectTL", function (e) {
        let requestParam = worqbox.getFormData($dataForm);
        LoadListing(requestParam);
    });
});
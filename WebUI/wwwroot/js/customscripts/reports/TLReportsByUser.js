
$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: `/ProjectForecast/LookupPeople`,
        data: "{}",
        success: function (data) {
            var options = '<option value="">Select Resource</option>';
            if (data != null) {
                options += data.map((item) => `<option value="${item.id}">${item.username}</option>`);
                $(".SelectListforResourceLookup").html(options);
            }
            $('.SelectListforResourceLookup').select2();
        }
    });

    LoadListing = (requestParam = null) => {
        var path = `/Reports/TLReportsByUserPV`;
        worqbox.partialPageLoadingToElement(path, requestParam, "TLReportsByResourceSection");
    }

    ResetResourceReport = () => {

        $("#SelectListforMonthTL").val('0')
        $("#SelectListforYearTL").val('0')
        $("#SelectListforResourceID").val('').change();
        LoadListing();
    }

    LoadListing();

    let $dataForm = $('#upsertforcastformFilter');
    $(document).off('click', "#SearchBTnForResourceTL").on('click', "#SearchBTnForResourceTL", function (e) {

        let requestParam = $dataForm.serializeArray();
        
        let _resourceUsername = $(".SelectListforResourceLookup option:selected").text();
        if (_resourceUsername != null && _resourceUsername.trim() != '' && _resourceUsername.trim() != 'Select Resource')
        {
            requestParam.push({ name: "ResourceUsername", value: _resourceUsername });
        }
        LoadListing(requestParam);
    });
});


$(document).off('click', "#upsertforcastbtn").on('click', "#upsertforcastbtn", function (e) {
    let $dataFormAD = $('#upsertforcastform');
    if (worqbox.validateForm($dataFormAD)) {
        let requestParam = worqbox.getFormDataWithSerializedArray('upsertforcastform');
        worqbox.ajaxPostDataWithFiles("/ProjectForecast/UpsertProjectForcastRequest", requestParam, "", function (data) {
            if (data?.affectedRows > 0) {
                worqbox.showAlertWithType("Project forecast upsert Successfully.", "success", 3000);
                $dataFormAD.trigger("reset");
                $("#addForcastModal").modal("hide");
                LoadListing();
            } else {
                worqbox.showAlertWithType("Something went wrong! Please contact Support.", "error", 3000);
            }
        });

    }
    else {
        return false;
    }
});

let data = [];

   

$(document).off('click', "#upsertforcastbtn").on('click', "#upsertforcastbtn", function (e) {
    
    var myTableArray = [];
        
        $("#dvExcel tr").each(function (i) {
            var arrayOfThisRow = [];
            var tableData = $(this).find('td');
            if (tableData.length > 0) {

                var _ = prepareObjectByTable(tableData);
                myTableArray.push(_);
            }
        });
     
    let request = { UpsertProjectForecastRequestVM: myTableArray}
    worqbox.ajaxPostJSON("/ProjectForecast/UpsertProjectForcastRequest", request, function (data) {
            if (data?.affectedRows > 0) {
                worqbox.showAlertWithType("Project forecast upsert Successfully.", "success", 3000);
               $('#upsertforcastform').trigger("reset");
                $("#addForcastModal").modal("hide");
                LoadListing();
            } else {
                worqbox.showAlertWithType("Something went wrong! Please contact Support.", "error", 3000);
            }
        });
});
//function addData() {
$(document).off('click', "#addbtn").on('click', "#addbtn", function (e) {
        debugger
        $("#dvExcel").html('');
        let $dataFormAD = $('#upsertforcastform');
        if (worqbox.validateForm($dataFormAD)) {
            let requestParam = worqbox.getFormDataWithSerializedArray('upsertforcastform');
           // let form = new FormData(requestParam);
            //console.log(form);
            let jsonData = Object.fromEntries(requestParam.entries())
            jsonData.ProjectName = $("#SelectListforProject option:selected").text();
            jsonData.MonthName = $("#SelectListforMonth option:selected").text()
            let isExists = checkIfExists(jsonData);
            if (!isExists) {
                 data.push(jsonData);
            }
           
            const isNullOrEmpty = (value) => {
                return value === null || value === undefined || value === '';
            };

            
            for (var i = 0; i < data.length; i++) {
                // Validate data
                var row = `<tr>
                                <td class='${isNullOrEmpty(data[i].ProjectName) ? '' : ''}'>${isNullOrEmpty(data[i].ProjectName) ? '' : data[i].ProjectName}</td>
                                <td class='${isNullOrEmpty(data[i].EstimatedBillableHours) ? 'invalid-cell' : ''}'>${isNullOrEmpty(data[i].EstimatedBillableHours) ? '' : data[i].EstimatedBillableHours}</td>
                                <td class='${isNullOrEmpty(data[i].EstimatedNonBillableHours) ? 'invalid-cell' : ''}'>${isNullOrEmpty(data[i].EstimatedNonBillableHours) ? '' : data[i].EstimatedNonBillableHours}</td>
                                <td>${isNullOrEmpty(data[i].BillingMonth) ? '' : data[i].BillingMonth}</td>
                                <td>${isNullOrEmpty(data[i].BillingYear) ? '' : data[i].BillingYear}</td>
                                <td class='${isNullOrEmpty(data[i].ProjectId) ? 'd-none' : 'd-none'}'>${isNullOrEmpty(data[i].ProjectId) ? '' : data[i].ProjectId}</td>
                          
                            </tr>`;
                $("#dvExcel").append(row);

            }
            $('#upsertforcastbtn').prop('disabled', false)
            $('#table-list').removeClass('d-none');
            var params = null; //Parameters
            var colsEdi = null;
            var newColHtml = `<div class="btn-group pull-right">
                    <button id="bEdit" type="button" class="btn btn-icon mr-1 rounded-circle btn-sm btn-outline-primary" onclick="rowEdit(this);">
                    <i class="fa fa-pencil" > </i>
                    </button>
                    <button id="bAcep" type="button" class="btn btn-sm mr-1 btn-icon rounded-circle btn-outline-secondary" style="display:none;" onclick="rowAcep(this);">
                    <i class="fas fa-check" > </i>
                    </button>
                    <button id="bCanc" type="button" class="btn btn-sm btn-icon rounded-circle btn-outline-info" style="display:none;" onclick="rowCancel(this);">
                    <i class="far fa-window-close"> </i>
                    </button>
                    </div>`;
            var colEdicHtml = '<td name="buttons">' + newColHtml + "</td>";

            $.fn.SetEditable = function (options) {
                var defaults = {
                    columnsEd: "1,2", //Index to editable columns. If null all td editables. Ex.: "1,2,3,4,5"
                    $addButton: null, //Jquery object of "Add" button
                    onEdit: function () { }, //Called after edition
                    onBeforeDelete: function () { }, //Called before deletion
                    onDelete: function () { }, //Called after deletion
                    onAdd: function () { } //Called when added a new row
                };
                params = $.extend(defaults, options);
                this.find("tbody tr").append(colEdicHtml);
                var $tabedi = this; //Read reference to the current table, to resolve "this" here.
                if (params.$addButton != null) {
                    params.$addButton.click(function () {
                        rowAddNew($tabedi.attr("id"));
                    });
                }
                if (params.columnsEd != null) {
                    colsEdi = params.columnsEd.split(",");
                }
            };
            IterarCamposEdit = function ($cols, tarea) {
                var n = 0;
                $cols.each(function (index) {
                    n++;
                    if ($(this).attr("name") == "buttons") return;
                    if (!EsEditable(n - 1)) return;
                    tarea($(this), index);
                });

                function EsEditable(idx) {
                    if (colsEdi == null) {
                        return true;
                    } else {
                        for (var i = 0; i < colsEdi.length; i++) {
                            if (idx == colsEdi[i]) return true;
                        }
                        return false;
                    }
                }
            }
            ModeNormal = function (_row) {
                debugger
                $(_row).parent().find("#bAcep").hide();
                $(_row).parent().find("#bCanc").hide();
                $(_row).parent().find("#bEdit").show();
                $(_row).parent().find("#bElim").show();
                var $row = $(_row).parents("tr");
                $row.attr("id", "");
            }
            ModeEdit = function (_row) {
                $("#upsertforcastbtn").prop('disabled', true);
                $(_row).parent().find("#bAcep").show();
                $(_row).parent().find("#bCanc").show();
                $(_row).parent().find("#bEdit").hide();
                $(_row).parent().find("#bElim").hide();
                var $row = $(_row).parents("tr");
                $row.attr("id", "editing");
            }
            isInEditMode = function ($row) {
                if ($row.attr("id") == "editing") {
                    return true;
                } else {
                    return false;
                }
            }
            rowAcep = function (_row) {
                debugger
                var $row = $(_row).parents("tr");
                var $cols = $row.find("td");
                if (!isInEditMode($row)) return;
                IterarCamposEdit($cols,
                    function ($td, index) {
                        val = 0;
                        debugger
                        if (index == 1) { // EstBillableHours
                            val = $td.find("input").val().trim();
                        }
                        
                        if (index == 2) { // EstNonBillableHours
                            val = $td.find("input").val().trim();
                        }
                        
                        if (index == 3) { // Month
                            val = $('#ListforMonth').val().trim();
                        }
                        
                        if (index == 4) {
                            val = $('#ListforYear').val().trim();
                        }
                        
                        var cont = $td.find("div").html();
                        $td.html(!!val ? val : cont);
                    });
                ModeNormal(_row);
                params.onEdit($row);
                $("#upsertforcastbtn").prop('disabled', false);

            }
            rowCancel = function (_row) {
                var $row = $(_row).parents("tr");
                var $cols = $row.find("td");
                if (!isInEditMode($row)) return;
                IterarCamposEdit($cols,
                    function ($td) {
                        var cont = $td.find("div").html();
                        $td.html(cont);
                    });
                ModeNormal(_row);
            }
            rowEdit = function (_row) {
                var $row = $(_row).parents("tr");
                var $cols = $row.find("td");
                if (isInEditMode($row)) return;
                IterarCamposEdit($cols,
                    function ($td, i) {
                        var cont = $td.html();
                        var div = '<div style="display: none;">' + cont + "</div>";
                        var input = '';
                        if (i==0) { 
                            input = ` <div id='projectLookupDiv' class="form-group mb-3">
                                <select id="projectLookup"
                                    class="form-control searchStr" style="width: 100%">
                                    <option></option>
                                </select>
                            </div>`;
                        }
                        //else if (i == 3) { // Grade
                        //    input = `  <div > <select class="form-control" name="BillingMonth" id="ListforMonth" required>
                        //            <option value="1">January</option>
                        //            <option value="2">February</option>
                        //            <option value="3">March</option>
                        //            <option value="4">April</option>
                        //            <option value="5">May</option>
                        //            <option value="6">June</option>
                        //            <option value="7">July</option>
                        //            <option value="8">August</option>
                        //            <option value="9">September</option>
                        //            <option value="10">October</option>
                        //            <option value="11">November</option>
                        //            <option value="12">December</option>
                        //        </select >
                        //    </div>`;
                        //}
                        //else if (i == 4) {
                        //    input = ` <div  class="form-group mb-3">
                        //        <select class="form-control" name="BillingYear" id="ListforYear" required>
                        //            <option value="2022">2022</option>
                        //            <option value="2021">2021</option>
                        //            <option value="2020">2020</option>
                        //        </select>
                        //    </div>`;
                        //}
                        else {
                            input = '<input class="form-control input-sm" required value="' + cont + '">';
                        }
                        $td.html(div + input);
                        worqbox.Select2('#projectLookup', '/ProjectForecast/GetProjectLookup', 'id', 'title', "Search Project", '#projectLookupDiv');
                    });
                ModeEdit(_row);
            }
            rowElim = function (_row) {
                var $row = $(_row).parents("tr"); //accede a la fila
                params.onBeforeDelete($row);
                $row.remove();
                params.onDelete();
            }
            function rowAddNew(tabId) {
                var $tab_en_edic = $("#" + tabId); //Table to edit
                var $filas = $tab_en_edic.find("tbody tr");
                if ($filas.length == 0) {
                    var $row = $tab_en_edic.find("thead tr");
                    var $cols = $row.find("th");
                    var htmlDat = "";
                    $cols.each(function () {
                        if ($(this).attr("name") == "buttons") {
                            htmlDat = htmlDat + colEdicHtml;
                        } else {
                            htmlDat = htmlDat + "<td></td>";
                        }
                    });
                    $tab_en_edic.find("tbody").append("<tr>" + htmlDat + "</tr>");
                } else {

                    var $ultFila = $tab_en_edic.find("tr:last");
                    $ultFila.clone().appendTo($ultFila.parent());
                    $ultFila = $tab_en_edic.find("tr:last");
                    var $cols = $ultFila.find("td");


                    $cols.each(function () {
                        if ($(this).attr("name") == "buttons") {
                        } else {
                            $(this).html("");
                        }
                    });
                }
                params.onAdd();
            }
            TableToCSV = function (tabId, separator) {
                var datFil = "";
                var tmp = "";
                var $tab_en_edic = $("#" + tabId); //Table source
                $tab_en_edic.find("tbody tr").each(function () {
                    if (isInEditMode($(this))) {
                        $(this).find("#bAcep").click(); //acepta edición
                    }
                    var $cols = $(this).find("td"); //lee campos
                    datFil = "";
                    $cols.each(function () {
                        if ($(this).attr("name") == "buttons") {
                        } else {
                            datFil = datFil + $(this).html() + separator;
                        }
                    });
                    if (datFil != "") {
                        datFil = datFil.substr(0, datFil.length - separator.length);
                    }
                    tmp = tmp + datFil + "\n";
                });
                return tmp;
            }
            //apply
            $("#table-list").SetEditable({
                $addButton: $("#add")
            });

        }

});
checkIfExists = function (Obj) {
    let exists = false;
    data.forEach(function (item, i) {
        if (item.ProjectId == Obj.ProjectId && item.BillingMonth == Obj.BillingMonth && item.BillingYear == Obj.BillingYear) {
            data[i] = Obj;
            exists= true;
        }
        
    });
    return exists;
   
   
}
// prepare object to post
prepareObject = function (tableData) {
    return {
        ProjectId: parseInt(tableData.ProjectId),
        EstimatedBillableHours: parseFloat(tableData.EstimatedBillableHours).toFixed(2),
        EstimatedNonBillableHours: parseFloat(tableData.EstimatedNonBillableHours).toFixed(2),
        BillingMonth: parseInt(tableData.BillingMonth),
        BillingYear: parseInt(tableData.BillingYear),
        LoggedInUser:""
    };
};

// prepare object to post
prepareObjectByTable = function (tableData) {
    return {
        ProjectId: parseInt($(tableData[5]).text().trim()),
        EstimatedBillableHours: parseFloat($(tableData[1]).text().trim()).toFixed(2),
        EstimatedNonBillableHours: parseFloat($(tableData[2]).text().trim()).toFixed(2),
        BillingMonth: parseInt( $(tableData[3]).text().trim()),
        BillingYear: parseInt($(tableData[4]).text().trim()),
        LoggedInUser: $("#LoggedInUserID").val()

           };
};
ResetModal = function () {
    $('#upsertforcastbtn').prop('disabled', true)
    $("#dvExcel").html('');
    $("#dvExcel").empty();
    $('#table-list').addClass('d-none');
    data = [];
    $('#upsertforcastform').removeClass('was-validated');
    $('#upsertforcastform').trigger('reset');
    $("#EstimatedNonBillableHours").val('')
    $("#EstimatedBillableHours").val('')
    $("#SelectListforProject").val('').trigger('change');
}
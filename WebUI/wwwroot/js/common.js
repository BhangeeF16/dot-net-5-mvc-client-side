(function ($) {
    $.fn.serializeObject = function () {

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push": /^$/,
                "fixed": /^\d+$/,
                "named": /^[a-zA-Z0-9_]+$/
            };


        this.build = function (base, key, value) {
            base[key] = value;
            return base;
        };

        this.push_counter = function (key) {
            if (push_counters[key] === undefined) {
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function () {

            // Skip invalid keys
            if (!patterns.validate.test(this.name)) {
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while ((k = keys.pop()) !== undefined) {

                // Adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // Push
                if (k.match(patterns.push)) {
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // Fixed
                else if (k.match(patterns.fixed)) {
                    merge = self.build([], k, merge);
                }

                // Named
                else if (k.match(patterns.named)) {
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);

var worqbox = worqbox || {};

/*Adding zone in all ajax call*/
$.ajaxSetup({
    headers: {
        'UserTimeZone': ((new Date().getTimezoneOffset() / 60) * -1).toString()
    }
});

worqbox.routers = {
    // Controller Routes
    GetAllUsers: "/User/GetAllUser?partialViewIdentifier=",
    GetAllReseller: "/Reseller/GetAllReseller?partialViewIdentifier=",
    GetAllOrganization: "/Organization/GetAllOrganization?partialViewIdentifier=",
    GetAllChildOrganization: "/Organization/GetAllChildOrganization",
    GetAllLicense: "/License/GetAllLicense?partialViewIdentifier=",
    GetAllSchool: "/School/GetAllSchool?partialViewIdentifier=",
    GetAllTeacher: "/Teacher/GetAllTeacher?partialViewIdentifier=",
    GetAllOrgAdmin: "/Organization/GetAllOrgAdmin?partialViewIdentifier=",

    GetAllClass: "/Class/GetAllClass?partialViewIdentifier=",
    GetAllStudent: "/Student/GetAllStudent?partialViewIdentifier=",
    GetAllRep: "/SaleRep/GetAllRep?partialViewIdentifier=",
    GetAllResellerCSR: "/User/GetUserWithRoleIDAndResellerID?",

    GetAllOU: "/OrganizationUnit/GetAllOU?partialViewIdentifier=",
    GetActiveLicense: "/License/GetActiveLicense?customerId=",
    GetOrgsLookupForLicenses: "/Organization/GetOrgsLookupForLicenses",



    // Lookup Route
    GetSchoolsLookup: "/School/GetSchoolsLookup",
    GetTeachersLookup: "/Teacher/GetTeachersLookup",
    GetClassesLookup: "/Report/GetAllClasses",
    GetPSTLookup: "/Report/GetAllPSTTime",
    GetCoursesLookup: "/Report/GetAllCourses"

};

worqbox.subRouters = {
    LicenseLUPV: "_LicenseLUPV",
    LicenseResellerView: "_LicenseResellerView",
    LicenseUsage: "_LicenseUsage",
    LicenseUsageOrg: "_LicenseUsageOrg",
    LicensesStatusStudentView: "_LicensesStatusStudentView",
    LicensesList: "_LicenseList",
    LicensesOrgList: "_LicenseOrgList",
    Users: "_Users",
    UserLUPV: "_UserLUPV",
    UsersListing: "_UsersListing",
    OrganizationLUAdminPV: "_OrganizationLUAdminPV",
    OrganizationResellerPV: "_OrganizationResellerPV",
    OrganizationResellerRepPV: "_OrganizationResellerRepPV",
    OrganizationDetailPagePV: "_OrganizationDetailPagePV",
    OrganizationWS: "_OrganizationWS",
    RepDetailOrgList: "_RepDetailOrgList",
    ResellerOrgRPV: "_ResellerOrgRPV",
    Organization: "_Organization",
    ChildOrg: "_ChildOrg",
    ChildOrgRep: "_ChildOrgRep",
    OrgQuickView: "_OrgQuickView",

    SchoolLUPV: "_SchoolLUPV",
    Schools: "_Schools",
    SchoolsRepDashboard: "_SchoolsRepDashboard",

    Teachers: "_Teachers",
    TeachersOrgAdminPV: "_TeachersOrgAdminPV",

    Classes: "_Classes",
    ClassesOrgAdminPV: "_ClassesOrgAdminPV",
    ClassesSchoolAdminPV: "_ClassesSchoolPV",
    ClassesTeacherPV: "_ClassesTeacherPV",
    ClassTileDashBoard: "_ClassTileDashBoard",

    StudentListing: "_StudentListing",
    Students: "_Students",
    StudentsOrgAdminPV: "_StudentsOrgAdminPV",
    StudentsTeacherPV: "_StudentsTeacherPV",
    StudentTeacherRPV: "_StudentTeacherRPV",
    StudentPickerRV: "_StudentPickerRV",
    StudentORGListPV: "_StudentORGListPV",

    Resellers: "_Resellers",
    ResellerLUPV: "_ResellerLUPV",
    RepsQuickView: "_RepsQuickView",
    Reps: "_Reps",
    ResellerRepRPV: "_ResellerRepRPV",

    OrganizationUnitsDetailPagePV: "_OrganizationUnitsDetailPagePV",
    OrganizationUnitsDetailPV: "_OrganizationUnitsDetailPV",
    OrganizationUnitsList: "_OrganizationUnitsList",
    OUList: "_OUList",
    ResellerOURPV: "_ResellerOURPV",
    OU: "_OU",
    OrganizationUnits: "_OrganizationUnits"


}

worqbox.box = {
    Success: "Success",
    Alert: "Alert",
    Warning: "Warning",
    Error: "Error",
    Validation: "Validation"
};

worqbox.commonFeedbackMessages = {
    ErrorMessage: "An unexpected error has been occured while processing your request.Please contact support."
};

worqbox.partialPageLoadingToElement = function (pageUrl, dataObj, elementId, btnForLoading, callback, showOverlay = false, append = false, overlayID = null) {

    if (!worqbox.isNullOrEmpty(btnForLoading)) {
        var btnOriginalHtml = worqbox.showLoadingToButtonAndReturnOriginalHtml(btnForLoading, append);
    }
    $.ajax({
        async: true,
        cache: false,
        url: pageUrl,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        data: dataObj,
        dataType: 'html',
        success: function (data) {
            if (data.indexOf('"error":true,') !== -1) {
                worqbox.showAlertWithType(JSON.parse(data).msg, "error");
            } else {
                if (append) {

                    $("#" + elementId).append(data);
                    worqbox.hideLoading();
                } else {
                    $("#" + elementId).empty().html(data);
                    worqbox.hideLoading();

                }
            }
            worqbox.handleAjaxCallBackAndLoadingButton(btnForLoading, btnOriginalHtml, callback, data);
            if (!append) {
                worqbox.hideLoading(overlayID);
            }
        },
        xhr: function () {

            var xhr = new window.XMLHttpRequest();
            //Download progress
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    $("#" + elementId).find('.progress-bar').css('width', Math.round(evt.loaded / evt.total * 100) + "%");
                }
            }, false);
            return xhr;
        },
        beforeSend: function () {
            if (!append) {
                if (showOverlay) {
                    worqbox.showLoading(null, overlayID);
                }
                else if (worqbox.isNullOrEmpty(btnForLoading)) {
                    const columns = 8;

                    $("#" + elementId).empty().html(worqbox.GetProgressBarHtml(worqbox.ColorClass.Primary, columns));
                }
            }
        },
        error: function (ex) {

            if (!worqbox.isNullOrEmpty($("#" + elementId).find('.progress-bar'))) {
            }
            worqbox.handleAjaxCallBackAndLoadingButton(btnForLoading, btnOriginalHtml, callback, false);
        }
    });
};

worqbox.partialPageLoadingToElementPostCall = function (pageUrl, dataObj, elementId, btnForLoading, callback, showOverlay = false) {
    if (!worqbox.isNullOrEmpty(btnForLoading)) {
        var btnOriginalHtml = worqbox.showLoadingToButtonAndReturnOriginalHtml(btnForLoading);
    }
    $.ajax({
        cache: false,
        url: pageUrl,
        type: 'POST',
        async: true,
        data: dataObj,
        success: function (data) {
            if (data.indexOf('"error":true,') !== -1) {
                worqbox.showAlertWithType(JSON.parse(data).msg, "error");
            } else {
                $("#" + elementId).empty().html(data);
            }
            worqbox.handleAjaxCallBackAndLoadingButton(btnForLoading, btnOriginalHtml, callback, data);
            worqbox.hideLoading();
        },
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            //Download progress
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    $("#" + elementId).find('.progress-bar').css('width', Math.round(evt.loaded / evt.total * 100) + "%");
                }
            }, false);
            return xhr;
        },
        beforeSend: function () {
            if (showOverlay) {
                worqbox.showLoading();
            }
            else if (worqbox.isNullOrEmpty(btnForLoading)) {
                $("#" + elementId).empty().html(worqbox.GetProgressBarHtml(worqbox.ColorClass.Primary));
            }
        },
        error: function (ex) {
            if (!worqbox.isNullOrEmpty($("#" + elementId).find('.progress-bar'))) {
                $("#" + elementId).empty();
            }
            worqbox.handleAjaxCallBackAndLoadingButton(btnForLoading, btnOriginalHtml, callback, false);
            worqbox.ajaxErrorCall(ex);
        }
    });
};
worqbox.ajaxPostJSON = function (pageUrl, dataObj, callback, btnForLoading, showOverlay = true, btnOriginalHtmlText = null) {
    if (!worqbox.isNullOrEmpty(btnForLoading)) {
        var btnOriginalHtml = btnOriginalHtmlText == null ? $(btnForLoading)[0].innerHTML : btnOriginalHtmlText;
        worqbox.showLoadingToButtonAndReturnOriginalHtml(btnForLoading);
    }
    if (showOverlay) {
        worqbox.showLoading();
    }
    $.ajax({
        cache: false,
        url: pageUrl,
        contentType: "application/json",
        dataType: "json",
        timeout: 60 * 60 * 1000, // 1 hour
        type: 'POST',
        data: JSON.stringify(dataObj),
        success: function (data, status, xhr) {
            debugger
            worqbox.hideLoading();
            if (!worqbox.isNullOrEmpty(btnForLoading)) {
                btnOriginalHtml = btnOriginalHtmlText == null ? $(btnForLoading)[0].innerHTML : btnOriginalHtmlText;
                worqbox.hideLoadingFromButton(btnForLoading, btnOriginalHtml);
            }
            if (!worqbox.isNullOrEmpty(callback)) {
                callback(data);
            }
        },
        error: function (xhr, ex) {

            if (!worqbox.isNullOrEmpty(btnForLoading)) {
                btnOriginalHtml = btnOriginalHtmlText == null ? $(btnForLoading)[0].innerHTML : btnOriginalHtmlText;
                worqbox.hideLoadingFromButton(btnForLoading, btnOriginalHtml);
            }
            worqbox.ajaxErrorCall(ex);
        }
    });
};

worqbox.ajaxPostCall = function (pageUrl, dataObj, callback, btnForLoading, showOverlay = true, btnOriginalHtmlText = null, loadingMessage = null) {
    if (!worqbox.isNullOrEmpty(btnForLoading)) {
        var btnOriginalHtml = btnOriginalHtmlText == null ? $(btnForLoading)[0].innerHTML : btnOriginalHtmlText;
        worqbox.showLoadingToButtonAndReturnOriginalHtml(btnForLoading);
    }
    if (showOverlay) {
        worqbox.showLoading(loadingMessage);
    }
    $.ajax({
        cache: false,
        url: pageUrl,
        type: 'POST',
        data: dataObj,
        async: true,
        success: function (data, status, xhr) {
            worqbox.hideLoading();
            if (!worqbox.isNullOrEmpty(btnForLoading)) {
                btnOriginalHtml = btnOriginalHtmlText == null ? $(btnForLoading)[0].innerHTML : btnOriginalHtmlText;
                worqbox.hideLoadingFromButton(btnForLoading, btnOriginalHtml);
            }
            if (!worqbox.isNullOrEmpty(callback)) {
                callback(data);
            }
        },
        error: function (xhr, ex) {

            if (!worqbox.isNullOrEmpty(btnForLoading)) {
                btnOriginalHtml = btnOriginalHtmlText == null ? $(btnForLoading)[0].innerHTML : btnOriginalHtmlText;
                worqbox.hideLoadingFromButton(btnForLoading, btnOriginalHtml);
            }
            worqbox.ajaxErrorCall(ex);
        }
    });
};

worqbox.handleAjaxCallBackAndLoadingButton = function (btnForLoading, btnOriginalHtml, callback, data) {

    if (!worqbox.isNullOrEmpty(btnForLoading)) {
        worqbox.hideLoadingFromButton(btnForLoading, btnOriginalHtml);
    }
    if (!worqbox.isNullOrEmpty(callback)) {
        callback(data);
    }
};

worqbox.showLoading = function (msg, overlayID = null) {

    if (overlayID != null) {
        $(overlayID).removeClass('d-none');
    } else {
        $('#overlay-text').html(worqbox.isNullOrEmpty(msg) ? "Loading please wait..." : msg);
        $('#overlay').removeClass('d-none');
    }
};

worqbox.hideLoading = function (overlayID = '#overlay') {

    $(overlayID).addClass('d-none');
};

worqbox.partialPageLoadingPost = function (pageUrl, dataObj) {
    worqbox.showLoading();
    $.ajax({
        cache: false,
        url: pageUrl,
        type: 'POST',
        data: dataObj,
        success: function (data, status, xhr) {
            if (xhr.getResponseHeader('LOGIN_SCREEN_Ready') === '1') {
                worqbox.WhenSessionIsExpired();
                return;
            }
            $('#RenderBody').empty().html(data);
            worqbox.hideLoading();
        },
        error: function (xhr, ex) {
            if (xhr.getResponseHeader('LOGIN_SCREEN_Ready') === '1') {
                worqbox.WhenSessionIsExpired();
                return;
            }
            worqbox.ajaxErrorCall(ex);
        }

    });

};

worqbox.ajaxPostDataWithFiles = function (pageUrl, dataObj, successMessage, callBack, showMessage = true) {

    worqbox.showLoading();
    $.ajax({
        type: "POST",
        url: pageUrl,
        dataType: "json",
        contentType: false, // Not to set any content header
        processData: false, // Not to process data
        data: dataObj,
        success: function (result, status, xhr) {
            //if (showMessage) {
            //    if (result > 0 || result !== null || result !== "") {
            //        worqbox.notification(worqbox.box.Success, successMessage);
            //    }
            //    else {
            //        worqbox.notification(worqbox.box.Error, 'Something went wrong! Please Contact Support.....');
            //    }
            //}
            worqbox.hideLoading();
            if (callBack !== undefined) { callBack(result); }
        },
        error: function (xhr, status, error) {

            worqbox.hideLoading();
            if (xhr.getResponseHeader('LOGIN_SCREEN_Ready') === '1') {
                worqbox.WhenSessionIsExpired();
                return;
            }
            worqbox.notification("Error", 'Something went wrong! Please Contact Support!!!!');
        }
    });

};

worqbox.ajaxErrorCall = function (ex) {
    worqbox.hideLoading();
    if (ex.responseJSON !== undefined) {
        worqbox.showAlertWithType(ex.responseJSON.message, "error");
    } else if (ex.statusText !== undefined) {
        worqbox.showAlertWithType(ex.statusText, "error");
    } else if (ex.responseText !== undefined) {
        worqbox.showAlertWithType(ex.responseText, "error");
    } else {
        worqbox.showAlertWithType('Something went wrong.', "error");
    }
};

worqbox.showLoadingToButtonAndReturnOriginalHtml = function (btn) {
    let buttonPrevHtml = $(btn)[0].innerHTML;
    $(btn)[0].innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Please wait..';
    $(btn).attr("disabled", "disabled");
    return buttonPrevHtml;
};

worqbox.hideLoadingFromButton = function (btn, btnPrevHtml) {
    try {
        $(btn)[0].innerHTML = btnPrevHtml;
        $(btn).removeAttr("disabled");
    }
    catch {
        worqbox.hideLoading();
    }
};

worqbox.StatusCodes = {
    Success: 200,
    Duplication: 400,
    Error: 404,
    Forbidden: 403
};

worqbox.showNotificationByStatusCode = function (statusCode, feedBackMessage) {
    if (statusCode === worqbox.StatusCodes.Success) {
        worqbox.showAlertWithType(feedBackMessage, "success");
    } else if (statusCode === worqbox.StatusCodes.Duplication || statusCode === worqbox.StatusCodes.Warning) {
        worqbox.showAlertWithType(feedBackMessage, null, "warning", "Warning");
    }
    else {
        worqbox.showAlertWithType(feedBackMessage, "error");
    }
};

worqbox.showAlertWithType = function (msg, type = "success", timer = 3000) {
    Swal.fire(
        {
            //position: "top-end",
            type: type,
            title: msg,
            showConfirmButton: false,
            timer: timer,
        });
};

worqbox.getFormData = function ($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
};

worqbox.isNullOrEmpty = function (source) {
    if (source === "" || source === null || source === undefined) {
        return true;
    }
    return false;
};

worqbox.emptyStringWhenFalsey = function (value) {
    return worqbox.isNullOrEmpty(value) ? '' : value;
}

worqbox.GetCurrentDate = function () {
    var tdate = new Date();
    var dd = tdate.getDate(); //yields day
    var MM = tdate.getMonth(); //yields month
    var yyyy = tdate.getFullYear(); //yields year
    var currentDate = (MM + 1) + "/" + dd + "/" + yyyy;
    return currentDate;
}

worqbox.ValidateEmail = function (email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
};

worqbox.ValidateDateOfBirth = function (dob) {
    var myDate = new Date(dob);
    if (myDate === 'Invalid Date') {
        worqbox.notification(worqbox.box.Validation, 'Wrong Date Of Birth! because it is invalid Date');
        return false;
    }
    var today = new Date();
    var startDate = new Date('1900, 01, 01');
    if (myDate > today) {
        worqbox.notification(worqbox.box.Validation, 'Wrong Date Of Birth! because it is future Date');
        return false;
    } else {
        if (myDate < startDate) {
            worqbox.notification(worqbox.box.Validation, 'Wrong Date Of Birth! because it is old Date');
            return false;
        } else {
            return true;
        }
    }
};

worqbox.ValidateDate = function (date, fieldName) {
    var myDate = new Date(date);
    if (myDate === 'Invalid Date') {
        worqbox.notification(worqbox.box.Validation, 'Wrong ' + fieldName + ' Date! because it is invalid Date');
        return false;
    }
    var today = new Date();
    var startDate = new Date('1900, 01, 01');
    if (myDate > today) {
        worqbox.notification(worqbox.box.Validation, 'Wrong ' + fieldName + ' Date! because it is future Date');
        return false;
    } else {
        if (myDate < startDate) {
            worqbox.notification(worqbox.box.Validation, 'Wrong ' + fieldName + ' Date! because it is old Date');
            return false;
        } else {
            return true;
        }
    }
};

worqbox.ValidatePhoneNumber = function validatePhoneNumber(elementValue) {
    var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return phoneNumberPattern.test(elementValue);
};

worqbox.CopyToClipboard = function (textToCopy, message) {
    //
    const el = document.createElement('textarea');
    //message = message || 'copied to clipboard';
    el.value = textToCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": 100,
        "hideDuration": 100,
        "timeOut": 2000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    toastr["success"]((message || 'copied to clipboard'), "Success");
};

worqbox.showDecisionAlert = function (title, message, type = "warning", confirmationText, confirmationCallBack, cancelCallBack, cancelButtonText = "Cancel", showCancelButton = true, showDefaultTitle = true) {
    Swal.fire(
        {
            title: worqbox.isNullOrEmpty(title) && showDefaultTitle ? "Are you sure?" : title,
            text: message,
            type: worqbox.isNullOrEmpty(type) ? "warning" : type,
            showCancelButton: showCancelButton,
            reverseButtons: true,
            confirmButtonText: '<i class="fal fa-check mr-1"></i>' + confirmationText,
            cancelButtonText: '<i class="fal fa-times mr-1"></i>' + cancelButtonText,
            onBeforeOpen: function (ele) {
                $(ele).find('button.swal2-confirm.swal2-styled').toggleClass('swal2-confirm swal2-styled swal2-confirm btn btn-sm btn-primary ml-1')
                $(ele).find('button.swal2-cancel.swal2-styled').toggleClass('swal2-cancel swal2-styled swal2-cancel btn btn-sm btn-info mr-1')
            },

        }).then(function (result) {
            if (result.value) {
                if (!worqbox.isNullOrEmpty(confirmationCallBack)) {
                    confirmationCallBack();
                }
            }
            else {
                if (!worqbox.isNullOrEmpty(cancelCallBack)) {
                    cancelCallBack();
                }
            }
        });
};

worqbox.showDecisionAlertWithHTml = function (title, html, type = "warning", confirmationText, confirmationCallBack, cancelCallBack, cancelButtonText = "Cancel", showCancelButton = true, width = "") {
    Swal.fire(
        {
            title: worqbox.isNullOrEmpty(title) ? "Are you sure?" : title,
            html: html,
            type: type,
            showCancelButton: showCancelButton,
            reverseButtons: true,
            width: width,
            confirmButtonText: '<i class="fal fa-check mr-1"></i>' + confirmationText,
            cancelButtonText: '<i class="fal fa-times mr-1"></i>' + cancelButtonText,
            onBeforeOpen: function (ele) {
                $(ele).find('button.swal2-confirm.swal2-styled').toggleClass('swal2-confirm swal2-styled swal2-confirm btn btn-sm btn-info ml-1')
                $(ele).find('button.swal2-cancel.swal2-styled').toggleClass('swal2-cancel swal2-styled swal2-cancel btn btn-sm btn-danger mr-1')
            }

        }).then(function (result) {
            if (result.value) {
                if (!worqbox.isNullOrEmpty(confirmationCallBack)) {
                    confirmationCallBack();
                }
            }
            else {
                if (!worqbox.isNullOrEmpty(cancelCallBack)) {
                    cancelCallBack();
                }
            }
        });
};

worqbox.showDecisionAlertWithHTmlCustom = function (title, html, type = "warning", confirmationText, confirmationCallBack, cancelCallBack, cancelButtonText = "Cancel", showCancelButton = true, width = "") {
    Swal.fire(
        {
            title: worqbox.isNullOrEmpty(title) ? "" : title,
            html: html,
            type: type,
            showCancelButton: showCancelButton,
            reverseButtons: true,
            width: width,
            allowOutsideClick: false,
            confirmButtonText: '<i class="fal fa-check mr-1"></i>' + confirmationText,
            cancelButtonText: '<i class="fal fa-times mr-1"></i>' + cancelButtonText,
            onBeforeOpen: function (ele) {
                $(ele).find('button.swal2-confirm.swal2-styled').toggleClass('swal2-confirm swal2-styled swal2-confirm btn btn-sm btn-info ml-1')
                $(ele).find('button.swal2-cancel.swal2-styled').toggleClass('swal2-cancel swal2-styled swal2-cancel btn btn-sm btn-danger mr-1')
            }

        }).then(function (result) {
            if (result.value) {
                if (!worqbox.isNullOrEmpty(confirmationCallBack)) {
                    confirmationCallBack();
                }
            }
            else {
                if (!worqbox.isNullOrEmpty(cancelCallBack)) {
                    cancelCallBack();
                }
            }
        });
};

worqbox.showDecisionAlertWithBothFunc = function (title, html, type = "warning", confirmationText, confirmationCallBack, cancelCallBack, cancelButtonText = "Cancel", showCancelButton = true, width = "") {
    Swal.fire(
        {
            title: worqbox.isNullOrEmpty(title) ? "" : title,
            html: html,
            type: type,
            showCancelButton: showCancelButton,
            reverseButtons: true,
            width: width,
            allowOutsideClick: false,
            confirmButtonText: '<i class="fal fa-check mr-1"></i>' + confirmationText,
            cancelButtonText: '<i class="fal fa-times mr-1"></i>' + cancelButtonText,
            onBeforeOpen: function (ele) {
                $(ele).find('button.swal2-confirm.swal2-styled').toggleClass('swal2-confirm swal2-styled swal2-confirm btn btn-sm btn-primary ml-1')
                $(ele).find('button.swal2-cancel.swal2-styled').toggleClass('swal2-cancel swal2-styled swal2-cancel btn btn-sm btn-info mr-1')
            }
        }).then(function (result) {
            if (result.value) {
                if (!worqbox.isNullOrEmpty(confirmationCallBack)) {
                    confirmationCallBack();
                }
            }
            else {
                if (!worqbox.isNullOrEmpty(cancelCallBack)) {
                    cancelCallBack();
                }
            }
        });
};

worqbox.setOldValuesInContainerFileds = function ($container, flagPopulateOldValue) {
    if (flagPopulateOldValue) {
        $.each($($container.find('select')), function (key, element) {
            $(element).val($(element).data('oldvalue')).trigger('change');
        });
        $.each($($container.find('input')), function (key, element) {
            $(element).val($(element).data('oldvalue'));
        });
        $.each($($container.find('input[type=checkbox]')), function (key, element) {

            if ($(element).val() === 'True') {
                $(element).prop('checked', true);
            } else {
                $(element).prop('checked', false);
            }
        });
        $container.find('.btn_save_patient').html(`<span class="fal fa-pencil mr-1"></span>Update`);
    }
    else {
        $($container.find('input')).val('');
        $($container.find('select')).val(null).trigger('change');
        $container.find('.btn_save_patient').html(`<span class="fal fa-save mr-1"></span>Save`);
    }
};

worqbox.checkIfContainerStateChangedAndPromptSave = function ($container, flagShowAlert) {
    let state = false;
    $.each($($container.find('input')), function (key, element) {
        if ($(element).attr('id') === 'PatientPhoneNumber1' || $(element).attr('id') === 'PatientMobileNumber' || $(element).attr('id') === 'RPMobile' || $(element).attr('id') === 'RPPhoneNumber') {
            if ($(element).data('oldvalue') !== $(element).val().replace(/\D/g, '')) {
                return state = true;
            }
        }
        else if ($(element).data('oldvalue') !== $(element).val()) {
            flipEmailVerificationButton(false);

            return state = true;
        }
    });

    $.each($($container.find('select')), function (key, element) {
        if ($(element).data('oldvalue') !== $(element).val()) {
            return state = true;
        }
    });
    $.each($($container.find('input[type=checkbox]')), function (key, element) {
        let oldvalue = $(element).data('oldvalue') === 'True' ? true : false;
        if (oldvalue !== $(element).is(':checked')) {
            return state = true;
        }
    });
    if (flagShowAlert && state) {
        worqbox.showDecisionAlert("You have Pending changes!", "Do you want to save them?", "warning", 'Yes', function () {
            $($container).find('.btn_save_patient').trigger('click');
        }, function () {
            $($container).modal('hide');
        }, "No");
    } else {
        $($container).modal('hide');
    }
    return state;
};

worqbox.cloneValuesByName = function ($source, $destination) {
    $.each($($source.find('select')), function (key, element) {
        $destination.find(`select[name *= ${$(element).attr('name')}]`).val($(element).val()).trigger('change');
    });
    $.each($($source.find('input')), function (key, element) {
        $destination.find(`input[name *= ${$(element).attr('name')}]`).val($(element).val());
    });
};

worqbox.toDate = function (date) {
    return new Date(date)
};

worqbox.formatDate = function formatDate(date) {
    if (date) {
        var date = worqbox.toDate(date);
        return `${date.toLocaleString('default', { month: 'short' })} ${worqbox.minNString(date.getDate())} ${worqbox.minNString(date.getFullYear(), 4)} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return "N/A";
};

worqbox.getTimeDiffInMinutes = function diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

};

worqbox.formatPhoneNumber = function (phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
};

worqbox.DateRangeFilter = {
    Today: 1,
    Yesterday: 2,
    Last2Days: 15,
    Last7Days: 3,
    Last14Days: 16,
    Last30Days: 4,
    Last60Days: 5,
    Last90Days: 6,
    MonthToDate: 7,
    PreviousMonth: 8,
    CurrentQuarter: 9,
    PreviousQuarter: 10,
    YearToDate: 11,
    PreviousYear: 12,
    CustomDateRange: 13,
    All: 14
};

worqbox.GetSpinnerHtml = function (spinnerType, spinnerColor) {
    return `<div class="spinner-${spinnerType} text-${spinnerColor}" role="status"></div>`;
};

worqbox.SpinnerType = {
    Border: "border",
    Grow: "grow",
    CubeBorder: "border rounded-0",
    GrowCube: "grow rounded-0"
};

worqbox.ColorClass = {
    Success: "success",
    Secondary: "secondary",
    Primary: "primary",
    Danger: "danger",
    Warning: "warning",
    Info: "info",
    Light: "light",
    Dark: "dark"
};

worqbox.ShowSpinnerToElement = function (element, spinnerType, spinnerColor) {
    let buttonPrevHtml = $(element)[0].innerHTML;
    $(element)[0].innerHTML = worqbox.GetSpinnerHtml(spinnerType, spinnerColor);
    return buttonPrevHtml;
};

worqbox.RemoveSpinnerFromElementAnAppendOrignalHtml = function (element, prevHtml) {
    $(element)[0].innerHTML = prevHtml;
};

worqbox.getRandomArbitrary = function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

worqbox.GetProgressBarHtml = function (className, columns = 0) {
    var val = Math.floor(this.getRandomArbitrary(this.getRandomArbitrary(20, 40), this.getRandomArbitrary(50, 80)));

    return `<tr>
                <td colspan='${columns}' align='center' >
                    <div class="fs-xl color-danger-300 mb-1"><i class="fal fa-cog fa-spin mr-1"></i>Loading please wait...</div>
                    <div class="progress">
                        <div style="width: ${val}% !important" class="progress-bar progress-bar-striped bg-${className}-500 progress-bar-animated" role="progressbar" 
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </td>
            </tr>
    `;
};

worqbox.validateForm = function ($form) {
    $form.addClass('was-validated');
    return $form[0].checkValidity();
};

worqbox.ScrollDiv = function () {
    $('.slimscroll').slimScroll({
        position: 'right',
        height: '350px',
        railVisible: true //,
    });
}

worqbox.resetFormForAdd = function ($form) {
    $form.removeClass('was-validated');
    $form.find('input').val('');
    $form.find('textarea').val('');
    $form.find('select').val('').trigger('change');
};

worqbox.toggleSwitch = function (_that, flag, dataAttr = 'isactive') {
    $(_that).prop('checked', flag);
    $(_that).data(dataAttr, flag);
};

worqbox.getFormDataWithSerializedArray = function (formID, turnKeysEndingWithXtoBoolean = false, having = 'Notifications') {
    var form = $('#' + formID);
    formData = new FormData()
    formParams = form.serializeArray();
    $.each(form.find('input[type="file"]'), function (i, tag) {
        $.each($(tag)[0].files, function (i, file) {
            formData.append(tag.name, file);
        });
    });
    $.each(form.find('input[type="checkbox"]'), function (i, input) {
        $.each($(input), function (i, val) {
            formData.append(val.name, val.checked);
        });
    });

    $.each(formParams, function (i, val) {
        if (turnKeysEndingWithXtoBoolean && val.name.endsWith(having)) {
            //formData.append(val.name, !!val.value || val.value.toLowerCase() == 'on' ? true : false);
        }
        else {
            formData.append(val.name, val.value);
        }
    });
    return formData;
}

worqbox.isDataTable = function (tableID) {
    return $.fn.dataTable.isDataTable('#' + tableID);
}

worqbox.CustomDatatableBasic = function (tableID) {
    if ($.fn.dataTable.isDataTable('#' + tableID)) {
        $('#' + tableID).DataTable();
    }
    else {
        $('#' + tableID).DataTable({
            /* No ordering applied by DataTables during initialisation */
            "order": [],
            //"responsive":true,
            'aoColumnDefs': [{
                'bSortable': false,
                'aTargets': ['nosort']
            }],
            "scrollY": "200px",
            "paging": false,
            "bFilter": true,
            "bPaginate": false,
            "bLengthChange": false
        });
    }
}

worqbox.CustomDatatable = function (tableID, skipSortingForArr = [], pageSize = 'A4') {

    if ($.fn.dataTable.isDataTable('#' + tableID)) {
        $('#' + tableID).DataTable();
    }
    else {
        $('#' + tableID).DataTable({
            'aoColumnDefs': [{
                'bSortable': false,
                "aTargets": 'nosort'
            },
            {
                'bSortable': false,
                'aTargets': skipSortingForArr
            }],
            /* No ordering applied by DataTables during initialisation */
            "order": [],
            "paging": false,
            "bFilter": false,
            "bInfo": false,
            "bPaginate": false,
            "bLengthChange": false
        });
    }
}

worqbox.CustomDatatable2 = function (tableID, skipSortingForArr) {
    if ($.fn.dataTable.isDataTable('#' + tableID)) {
        $('#' + tableID).DataTable();
    }
    else {
        $('#' + tableID).DataTable({
            /* No ordering applied by DataTables during initialisation */
            "order": [],
            'aoColumnDefs': [{
                'bSortable': false,
                "aTargets": 'nosort'
            },
            {
                'bSortable': false,
                'aTargets': skipSortingForArr
            }],
            "responsive": true,
            "paging": false,
            "bFilter": false,
            "bPaginate": false,
            "bLengthChange": false
        });
    }
}

worqbox.markMatch = function (text, term) {
    // Find where the match is

    var match = text.toUpperCase().indexOf(term.toUpperCase());
    var $result = $('<span></span>');

    // If there is no match, move on
    if (match < 0) {
        return $result.text(text);
    }

    // Put in whatever text is before the match
    $result.text(text.substring(0, match));

    // Mark the match
    var $match = $('<span style="text-decoration:underline; font-weight:bold"></span>');
    $match.text(text.substring(match, match + term.length));
    // Append the matching text
    $result.append($match);

    // Put in whatever is after the match
    $result.append(text.substring(match + term.length));

    return $result;
}

worqbox.InitSmartPanel = function () {
    $('#panel-1').smartPanel({
        localStorage: true,
        onChange: function () { },
        onSave: function () { },
        opacity: 1,
        sortable: false,
        buttonOrder: '%collapse% %fullscreen% %close%',
        buttonOrderDropdown: '%refresh% %locked% %color% %custom% %reset%',
        customButton: false,
        customButtonLabel: "Custom Button",
        onCustom: function () { },
        closeButton: false,
        onClosepanel: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onClosepanel")
        },
        fullscreenButton: true,
        onFullscreen: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onFullscreen")
        },
        collapseButton: true,
        onCollapse: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onCollapse")
        },
        lockedButton: false,
        refreshButton: false,
        refreshButtonLabel: "Refresh Content",
        onRefresh: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onRefresh")
        },
        colorButton: false,
        colorButtonLabel: "Panel Style",
        onColor: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onColor")
        },
        panelColors: ['bg-primary-700 bg-success-gradient text-white',
            'bg-primary-500 bg-info-gradient text-white',
            'bg-primary-600 bg-primary-gradient text-white',
            'bg-info-600 bg-primray-gradient text-white',
            'bg-info-600 bg-info-gradient text-white',
            'bg-info-700 bg-success-gradient text-white',
            'bg-success-900 bg-info-gradient text-white',
            'bg-success-700 bg-primary-gradient text-white',
            'bg-success-600 bg-success-gradient text-white',
            'bg-danger-900 bg-info-gradient text-white',
            'bg-fusion-400 bg-fusion-gradient text-white',
            'bg-faded'],
        resetButton: false,
        resetButtonLabel: "Reset Panel",
        onReset: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onReset callback")
        }

    });
}

worqbox.InitSmartPanel = function () {
    $('#panel-1').smartPanel({
        localStorage: true,
        onChange: function () { },
        onSave: function () { },
        opacity: 1,
        sortable: false,
        buttonOrder: '%collapse% %fullscreen% %close%',
        buttonOrderDropdown: '%refresh% %locked% %color% %custom% %reset%',
        customButton: false,
        customButtonLabel: "Custom Button",
        onCustom: function () { },
        closeButton: false,
        onClosepanel: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onClosepanel")
        },
        fullscreenButton: true,
        onFullscreen: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onFullscreen")
        },
        collapseButton: true,
        onCollapse: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onCollapse")
        },
        lockedButton: false,
        refreshButton: false,
        refreshButtonLabel: "Refresh Content",
        onRefresh: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onRefresh")
        },
        colorButton: false,
        colorButtonLabel: "Panel Style",
        onColor: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onColor")
        },
        panelColors: ['bg-primary-700 bg-success-gradient text-white',
            'bg-primary-500 bg-info-gradient text-white',
            'bg-primary-600 bg-primary-gradient text-white',
            'bg-info-600 bg-primray-gradient text-white',
            'bg-info-600 bg-info-gradient text-white',
            'bg-info-700 bg-success-gradient text-white',
            'bg-success-900 bg-info-gradient text-white',
            'bg-success-700 bg-primary-gradient text-white',
            'bg-success-600 bg-success-gradient text-white',
            'bg-danger-900 bg-info-gradient text-white',
            'bg-fusion-400 bg-fusion-gradient text-white',
            'bg-faded'],
        resetButton: false,
        resetButtonLabel: "Reset Panel",
        onReset: function () {
            if (myapp_config.debugState)
                console.log($(this).closest(".panel").attr('id') + " onReset callback")
        }

    });
}

worqbox.minNString = function (num, minLength = 2) {


    return (num ?? 0).toString().padStart(minLength, "0");
}

worqbox.renderPartialWithPagination = function (pageUrl, tableID, tbodyID, showMoreBtnIdentifier, overlay, totalRowsIdentifier = null, CustomDatatable = null, skipSortingForArr = [], pageSize = 'A4', loaderHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Please wait..', IsOrgAdminAdvancedFilterWithSortingBind = false) {
    try {
        var params = { pageIndex: 1 };
        worqbox.partialPageLoadingToElement(pageUrl, params, tbodyID, null,
            function () {
                var totalRows = $(`#${tbodyID}`).children().last().data('totalrows');
                var currentPageIndex = $(`#${tbodyID}`).children().last().data('pageindex');
                var currentPageSize = $(`#${tbodyID}`).children().last().data('pagesize');
                if (IsOrgAdminAdvancedFilterWithSortingBind) {
                    loaderHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Please wait..';
                    $(`#${tableID} thead input[type=hidden]`).val(JSON.stringify($(`#${tbodyID}`).children().last().data('searchkeyword')))
                }
                var hasMoreData = (totalRows - (currentPageIndex * currentPageSize)) > 0;

                if (totalRowsIdentifier) {
                    if (totalRows > 0) {
                        $(totalRowsIdentifier).html(worqbox.minNString(totalRows));
                        $(totalRowsIdentifier).fadeIn();
                    } else {
                        $(totalRowsIdentifier).fadeOut();
                    }
                }
                if (CustomDatatable) {
                    worqbox.CustomDatatable(tableID, skipSortingForArr, pageSize);
                }
                else {
                    worqbox.CustomDatatable2(tableID, skipSortingForArr);// wanted by default
                }

                if (hasMoreData)
                    $(showMoreBtnIdentifier).parent().removeClass('d-none');
                else {
                    $(showMoreBtnIdentifier).parent().addClass('d-none');
                }

              

                if ($(".growthReportOptionalColumns").length > 0) {

                    let _optionalColumn = $(".growthReportOptionalColumns").val();

                    if (_optionalColumn.includes("ClassNames")) {
                        $(".studentClassesHideSectionGrowth").removeClass('d-none');

                    } else {
                        $(".studentClassesHideSectionGrowth").addClass('d-none');

                    }

                    if (_optionalColumn.includes("WhatsAppNumber")) {
                        $(".whatsNumberHideSectionGrowth").removeClass('d-none');

                    } else {
                        $(".whatsNumberHideSectionGrowth").addClass('d-none');

                    }

                    if (_optionalColumn.includes("EnrollDate")) {
                        $(".enrollDateHideSectionGrowth").removeClass('d-none');
                    } else {
                        $(".enrollDateHideSectionGrowth").addClass('d-none');
                    }
                }

                if ($(".englishReportOptionalColumns").length > 0) {

                    let _optionalColumn = $(".englishReportOptionalColumns").val();

                    if (_optionalColumn.includes("ClassNames")) {
                        $(".studentClassesHideSectionEnglish").removeClass('d-none');

                    } else {
                        $(".studentClassesHideSectionEnglish").addClass('d-none');

                    }

                    if (_optionalColumn.includes("WhatsAppNumber")) {
                        $(".whatsNumberHideSectionEnglish").removeClass('d-none');

                    } else {
                        $(".whatsNumberHideSectionEnglish").addClass('d-none');

                    }

                    if (_optionalColumn.includes("EnrollDate")) {
                        $(".enrollDateHideSectionEnglish").removeClass('d-none');
                    } else {
                        $(".enrollDateHideSectionEnglish").addClass('d-none');
                    }
                }

                if ($(".mathReportOptionalColumns").length > 0) {

                    let _optionalColumn = $(".mathReportOptionalColumns").val();

                    if (_optionalColumn.includes("ClassNames")) {
                        $(".studentClassesHideSectionMath").removeClass('d-none');
                    } else {
                        $(".studentClassesHideSectionMath").addClass('d-none');
                    }

                    if (_optionalColumn.includes("WhatsAppNumber")) {
                        $(".whatsNumberHideSectionMath").removeClass('d-none');
                    } else {
                        $(".whatsNumberHideSectionMath").addClass('d-none');
                    }

                    if (_optionalColumn.includes("EnrollDate")) {
                        $(".enrollDateHideSectionMath").removeClass('d-none');
                    } else {
                        $(".enrollDateHideSectionMath").addClass('d-none');
                    }
                }

                if ($(".progressReportOptionalColumns").length > 0) {

                    let _optionalColumn = $(".progressReportOptionalColumns").val();

                    if (_optionalColumn.includes("ClassNames")) {
                        $(".studentClassesHideSectionProgress").removeClass('d-none');
                    } else {
                        $(".studentClassesHideSectionProgress").addClass('d-none');
                    }

                    if (_optionalColumn.includes("WhatsAppNumber")) {
                        $(".whatsNumberHideSectionProgress").removeClass('d-none');
                    } else {
                        $(".whatsNumberHideSectionProgress").addClass('d-none');
                    }

                    if (_optionalColumn.includes("EnrollDate")) {
                        $(".enrollDateHideSectionProgress").removeClass('d-none');
                    } else {
                        $(".enrollDateHideSectionProgress").addClass('d-none');
                    }
                }


            }, true, false, overlay);
    }
    catch (e) {
    }

    // Binds Click event of search button 
    $(`#${tableID}_SearchButton`).off('click').on('click', () => {
        var tableSelector = `#${tableID}`;
        var button = $(`${tableSelector}_SearchButton`);
        var searchKeyword = $(`${tableSelector}_SearchInput`).val();
        var sortDirection = $(`#${tbodyID}`).children().last().data('sortdirection');
        var sortColumn = $(`#${tbodyID}`).children().last().data('sortcolumn');
        button.html(loaderHTML);
        button.attr("disabled", "disabled");
        try {
            console.log('searched: ' + searchKeyword);

            $('#' + tbodyID).data('searchkeyword', searchKeyword);

            var params = {
                pageIndex: 1,
                keyword: searchKeyword
            };
            if (sortDirection) {
                params.sortDirection = sortDirection;
            }
            if (sortColumn) {
                params.sortColumn = sortColumn;
            }
            worqbox.partialPageLoadingToElement(pageUrl, params, tbodyID, null,
                function () {
                    button.empty().html('').html("<i class='fal fa-search'></i>");

                    var totalRows = $(`#${tbodyID}`).children().last().data('totalrows');
                    var currentPageIndex = $(`#${tbodyID}`).children().last().data('pageindex');
                    var currentPageSize = $(`#${tbodyID}`).children().last().data('pagesize');
                    var hasMoreData = (totalRows - (currentPageIndex * currentPageSize)) > 0;

                    if (totalRowsIdentifier) {
                        if (totalRows > 0) {
                            $(totalRowsIdentifier).html(worqbox.minNString(totalRows));
                            $(totalRowsIdentifier).fadeIn();
                        } else {
                            $(totalRowsIdentifier).fadeOut();
                        }
                    }

                    if (!hasMoreData) {
                        $(showMoreBtnIdentifier).parent().addClass('d-none');
                    } else {
                        $(showMoreBtnIdentifier).parent().removeClass('d-none');

                    }
                    button.removeAttr("disabled");
                }
                , true, false, overlay);
        }
        catch (e) {
        }
    });

    // Binds Sorting event
    $(document).off('click', `#${tableID} thead th[data-sort-column]`).on('click', `#${tableID} thead th[data-sort-column]`, function (e) {
        if (e.target.tagName == 'TH') {
            var searchkeyword = $(`#${tbodyID}`).data('searchkeyword');

            var key = $(event.target).data("sort-column");
            var isDataTable = worqbox.isDataTable(tableID);
            if (isDataTable && key) {
                var table = $(`#${tableID}`).DataTable();
                table.rows().clear(); table.draw();
                let [, dir] = table.order().length > 0 ? table.order()[0] : [0, 'desc'];

                try {
                    var params = {};
                    if (tableID.trim() == 'OrgAdminStudentDetailDatatableID' && $(`#${tableID} thead input[type=hidden]`).val() != '' && $(`#${tableID} thead input[type=hidden]`).val() != undefined && $(`#${tableID} thead input[type=hidden]`).val() != null) {
                        let advancedSearchFilter = JSON.parse($(`#${tableID} thead input[type=hidden]`).val());
                        params = { pageIndex: 1, sortColumn: key, sortDirection: dir, keyword: advancedSearchFilter.keyword, selectedSchoolID: advancedSearchFilter.selectedSchoolID, teacherId: advancedSearchFilter.teacherID, studentStatus: advancedSearchFilter.studentStatus };
                    } else {
                        params = { pageIndex: 1, sortColumn: key, sortDirection: dir, keyword: searchkeyword };
                    }
                    worqbox.partialPageLoadingToElement(pageUrl, params, tbodyID, null,
                        function () {
                            var totalRows = $(`#${tbodyID}`).children().last().data('totalrows');
                            var currentPageIndex = $(`#${tbodyID}`).children().last().data('pageindex');
                            var currentPageSize = $(`#${tbodyID}`).children().last().data('pagesize');

                            var hasMoreData = (totalRows - (currentPageIndex * currentPageSize)) > 0;
                            if (totalRowsIdentifier) {
                                if (totalRows > 0) {
                                    $(totalRowsIdentifier).html(worqbox.minNString(totalRows));
                                    $(totalRowsIdentifier).fadeIn();
                                } else {
                                    $(totalRowsIdentifier).fadeOut();
                                }
                            }
                            worqbox.CustomDatatable2(tableID, skipSortingForArr);
                            if (hasMoreData)
                                $(showMoreBtnIdentifier).parent().removeClass('d-none');
                            else {
                                $(showMoreBtnIdentifier).parent().addClass('d-none');
                            } 


                            if ($(".growthReportOptionalColumns").length > 0) {

                             let _optionalColumn =   $(".growthReportOptionalColumns").val();

                                if (_optionalColumn.includes("ClassNames"))
                                {
                                    $(".studentClassesHideSectionGrowth").removeClass('d-none');

                                } else {
                                    $(".studentClassesHideSectionGrowth").addClass('d-none');

                                }

                                if (_optionalColumn.includes("WhatsAppNumber")) {
                                    $(".whatsNumberHideSectionGrowth").removeClass('d-none');

                                } else {
                                    $(".whatsNumberHideSectionGrowth").addClass('d-none');

                                }

                                if (_optionalColumn.includes("EnrollDate")) {
                                    $(".enrollDateHideSectionGrowth").removeClass('d-none');
                                } else {
                                    $(".enrollDateHideSectionGrowth").addClass('d-none');
                                }
                            }

                            if ($(".englishReportOptionalColumns").length > 0) {

                                let _optionalColumn = $(".englishReportOptionalColumns").val();

                                if (_optionalColumn.includes("ClassNames")) {
                                    $(".studentClassesHideSectionEnglish").removeClass('d-none');

                                } else {
                                    $(".studentClassesHideSectionEnglish").addClass('d-none');

                                }

                                if (_optionalColumn.includes("WhatsAppNumber")) {
                                    $(".whatsNumberHideSectionEnglish").removeClass('d-none');

                                } else {
                                    $(".whatsNumberHideSectionEnglish").addClass('d-none');

                                }

                                if (_optionalColumn.includes("EnrollDate")) {
                                    $(".enrollDateHideSectionEnglish").removeClass('d-none');
                                } else {
                                    $(".enrollDateHideSectionEnglish").addClass('d-none');
                                }
                            }

                            if ($(".mathReportOptionalColumns").length > 0) {

                                let _optionalColumn = $(".mathReportOptionalColumns").val();

                                if (_optionalColumn.includes("ClassNames")) {
                                    $(".studentClassesHideSectionMath").removeClass('d-none');
                                } else {
                                    $(".studentClassesHideSectionMath").addClass('d-none');
                                }

                                if (_optionalColumn.includes("WhatsAppNumber")) {
                                    $(".whatsNumberHideSectionMath").removeClass('d-none');
                                } else {
                                    $(".whatsNumberHideSectionMath").addClass('d-none');
                                }

                                if (_optionalColumn.includes("EnrollDate")) {
                                    $(".enrollDateHideSectionMath").removeClass('d-none');
                                } else {
                                    $(".enrollDateHideSectionMath").addClass('d-none');
                                }
                            }

                            if ($(".progressReportOptionalColumns").length > 0) {

                                let _optionalColumn = $(".progressReportOptionalColumns").val();

                                if (_optionalColumn.includes("ClassNames")) {
                                    $(".studentClassesHideSectionProgress").removeClass('d-none');
                                } else {
                                    $(".studentClassesHideSectionProgress").addClass('d-none');
                                }

                                if (_optionalColumn.includes("WhatsAppNumber")) {
                                    $(".whatsNumberHideSectionProgress").removeClass('d-none');
                                } else {
                                    $(".whatsNumberHideSectionProgress").addClass('d-none');
                                }

                                if (_optionalColumn.includes("EnrollDate")) {
                                    $(".enrollDateHideSectionProgress").removeClass('d-none');
                                } else {
                                    $(".enrollDateHideSectionProgress").addClass('d-none');
                                }
                            }


                        }, true, false, overlay);
                }
                catch (e) {
                }
            }
        }

    });

    // Binds Click event of show more button
    $(showMoreBtnIdentifier).off('click').on('click', () => {
        var button = $(showMoreBtnIdentifier);
        button.html(loaderHTML);
        button.attr("disabled", "disabled");
        var totalRows = $(`#${tbodyID}`).children().last().data('totalrows');
        var currentPageIndex = $(`#${tbodyID}`).children().last().data('pageindex');
        var currentPageSize = $(`#${tbodyID}`).children().last().data('pagesize');
        var searchkeyword = $(`#${tbodyID}`).children().last().data('searchkeyword');
        var sortDirection = $(`#${tbodyID}`).children().last().data('sortdirection');
        var sortColumn = $(`#${tbodyID}`).children().last().data('sortcolumn');
        var hasMoreData = (totalRows - (currentPageIndex * currentPageSize)) > 0;

        if (totalRowsIdentifier) {
            if (totalRows > 0) {
                $(totalRowsIdentifier).html(worqbox.minNString(totalRows));
                $(totalRowsIdentifier).fadeIn();
            } else {
                $(totalRowsIdentifier).fadeOut();
            }
        }
        if (hasMoreData) {
            try {
                var params = { pageIndex: currentPageIndex + 1, keyword: searchkeyword };
                if (sortDirection) {
                    params.sortDirection = sortDirection;
                }
                if (sortColumn) {
                    params.sortColumn = sortColumn;
                }
                worqbox.partialPageLoadingToElement(pageUrl, params, tbodyID, null,
                    function () {
                        // fix for load more button issue
                        var totalRows = $(`#${tbodyID}`).children().last().data('totalrows');
                        var currentPageIndex = $(`#${tbodyID}`).children().last().data('pageindex');
                        var currentPageSize = $(`#${tbodyID}`).children().last().data('pagesize');
                        var hasMoreData_ = (totalRows - (currentPageIndex * currentPageSize)) > 0;
                        button.empty().html('').html("Load More");
                        button.removeAttr("disabled");

                        if (!hasMoreData_) {
                            $(showMoreBtnIdentifier).parent().addClass('d-none');
                        }
                    }
                    , true, true, overlay);
            }
            catch (e) {
            }

        }
        else {
            $(showMoreBtnIdentifier).parent().addClass('d-none');
        }
    });
};

worqbox.SafeExecute = function (func, exceptionHandler = (ex) => { console.log(JSON.stringify(ex)) }) {
    return () => {
        try {
            if (func)
                func();
        }
        catch (ex) {
            if (exceptionHandler) exceptionHandler(ex);
            else console.log(JSON.stringify(ex))
        }

    }

}

worqbox.ConvertStringArrayToInt = function (arr, _parseInt = true) {
    if (!!arr) {
        let _ = [...arr];
        // Remove empty items 
        _ = _.filter((el) => el != '');
        // conversion
        return _.map((el) => _parseInt ? parseInt(el) : el);
    }
    return [];
}

worqbox.renderPartialCardsWithPagination = function (pageUrl, tbodyID, showMoreBtnIdentifier, searchButtonIdentifier, append = false, loaderHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Please wait..') {
    try {

        var addClassHTML = `<div class="col-lg-3 col-sm-12 col-md-4 mb-g">
                <div class="card card-body-custom-selector border showAddClassModalBtn h-100 w-100">
                    <div class="card-body h-100 w-100 text-center">
                        <button style='white-space: nowrap;' class="btn btn-xl btn-block text-center btn-outline-primary pt-1 h-100 w-100" onclick="showAddClassModal()" title="Add New Class" data-toggle="tooltip"><i class='fal fa-plus-circle'></i> Add Class</button>
                    </div>
                </div>
            </div>`;

        var params = { pageIndex: 1 };
        worqbox.partialCardLoadingToElement(pageUrl, params, tbodyID, showMoreBtnIdentifier,
            function () {
                _showMoreBtnIdentifier = "#" + showMoreBtnIdentifier;

                var totalRows = $(`#${tbodyID}`).children().last().data('totalrows');
                var currentPageIndex = $(`#${tbodyID}`).children().last().data('pageindex');
                var currentPageSize = $(`#${tbodyID}`).children().last().data('pagesize');
                var hasMoreData = (totalRows - (currentPageIndex * currentPageSize)) > 0;

                if (hasMoreData)
                    $(_showMoreBtnIdentifier).parent().removeClass('d-none');
                else {
                    $(_showMoreBtnIdentifier).parent().addClass('d-none');
                }
            }, false, addClassHTML);

    }
    catch (e) {
    }

    // Binds Click event of search button 
    $(`#${tbodyID}_SearchButton`).click(() => {


        var tableSelector = `#${tbodyID}`;

        var button = $(`${tableSelector}_SearchButton`);
        var searchKeyword = $(`${tableSelector}_SearchInput`).val();

        button.html(loaderHTML);
        button.attr("disabled", "disabled");
        try {
            console.log('searched: ' + searchKeyword);

            var params = {
                pageIndex: 1,
                keyword: searchKeyword
            };
            worqbox.partialCardLoadingToElement(pageUrl, params, tbodyID, showMoreBtnIdentifier,
                function () {
                    button.empty().html('').html("<i class='fal fa-search'></i>");
                    button.removeAttr("disabled");
                    _showMoreBtnIdentifier = "#" + showMoreBtnIdentifier;

                    var totalRows = $(`#${tbodyID}`).children().last().data('totalrows');
                    var currentPageIndex = $(`#${tbodyID}`).children().last().data('pageindex');
                    var currentPageSize = $(`#${tbodyID}`).children().last().data('pagesize');
                    var hasMoreData = (totalRows - (currentPageIndex * currentPageSize)) > 0;

                    if (hasMoreData)
                        $(_showMoreBtnIdentifier).parent().removeClass('d-none');
                    else {
                        $(_showMoreBtnIdentifier).parent().addClass('d-none');
                    }


                    if ($("#IsLargeTiles").length > 0) {
                        if ($("#IsLargeTiles").prop("checked") == true) {
                            $(".card-body-custom-selector").addClass("card-body-custom");

                        } else {
                            $(".card-body-custom-selector").removeClass("card-body-custom");

                        }
                    }

                }, false, addClassHTML);
        }
        catch (e) {
        }

    });

    // Binds Click event of show more button
    $('#' + showMoreBtnIdentifier).click(() => {
        var button = $("#" + showMoreBtnIdentifier);
        var totalRows = $(`#${tbodyID}`).children().last().data('totalrows');
        var currentPageIndex = $(`#${tbodyID}`).children().last().data('pageindex');
        var currentPageSize = $(`#${tbodyID}`).children().last().data('pagesize');
        var searchkeyword = $(`#${tbodyID}`).children().last().data('searchkeyword');
        var hasMoreData = (totalRows - (currentPageIndex * currentPageSize)) > 0;

        if (hasMoreData) {
            try {
                var params = { pageIndex: currentPageIndex + 1, keyword: searchkeyword };
                button.html(loaderHTML);
                button.attr("disabled", "disabled");

                worqbox.partialCardLoadingToElement(pageUrl, params, tbodyID, showMoreBtnIdentifier,
                    function () {
                        debugger
                        var _showMoreBtnIdentifier = "#" + showMoreBtnIdentifier;

                        var totalRows = $(`#${tbodyID}`).children().last().data('totalrows');
                        var currentPageIndex = $(`#${tbodyID}`).children().last().data('pageindex');
                        var currentPageSize = $(`#${tbodyID}`).children().last().data('pagesize');
                        var hasMoreData = (totalRows - (currentPageIndex * currentPageSize)) > 0;

                        if (hasMoreData) {
                            //button.attr("disabled", "disabled");
                            $(_showMoreBtnIdentifier).parent().removeClass('d-none');
                        }
                        else {
                            $(_showMoreBtnIdentifier).parent().addClass('d-none');
                        }

                        //var button = $("#" + showMoreBtnIdentifier);
                        button.html("").html("Load More");
                        button.removeAttr("disabled");

                        if ($("#IsLargeTiles").length > 0) {
                            if ($("#IsLargeTiles").prop("checked") == true) {
                                $(".card-body-custom-selector").addClass("card-body-custom");

                            } else {
                                $(".card-body-custom-selector").removeClass("card-body-custom");

                            }
                        }


                    }, true, addClassHTML);
            }
            catch (e) {
                button.html("").html("Load More");
                button.removeAttr("disabled");
            }
        }
        else {
            $(showMoreBtnIdentifier).parent().addClass('d-none');
            button.html("").html("Load More");
            button.removeAttr("disabled");
        }
    });

};

worqbox.partialCardLoadingToElement = function (pageUrl, dataObj, elementId, btnForLoading, callback, append = false, prependedResultHTML = null) {

    var btnOriginalHtml = 'Load More';

    $.ajax({
        async: true,
        cache: false,
        url: pageUrl,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        data: dataObj,
        dataType: 'html',
        success: function (data) {

            if (data.indexOf('"error":true,') !== -1) {
                worqbox.showAlertWithType(JSON.parse(data).msg, "error");
            } else {
                if (append) {
                    $("#" + elementId).append(data);
                } else {

                    $("#" + elementId).empty().html(prependedResultHTML + data);
                }
            }
            worqbox.handleAjaxCallBackAndLoadingButton("#" + btnForLoading, btnOriginalHtml, callback, data);
            if ($("#IsLargeTiles").length > 0) {
                if ($("#IsLargeTiles").prop("checked") == true) {
                    $(".card-body-custom-selector").addClass("card-body-custom");

                } else {
                    $(".card-body-custom-selector").removeClass("card-body-custom");

                }
            }

            worqbox.hideLoading();
        },
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            // Download progress
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    $("#" + elementId).find('.progress-bar').css('width', Math.round(evt.loaded / evt.total * 100) + "%");
                }
            }, false);
            return xhr;
        },
        beforeSend: function () {
            worqbox.showLoading();
        },
        error: function (ex) {
            worqbox.hideLoading();
            if (!worqbox.isNullOrEmpty($("#" + elementId).find('.progress-bar'))) {

            }
            worqbox.handleAjaxCallBackAndLoadingButton(btnForLoading, btnOriginalHtml, callback, false);

        }
    });
};

worqbox.PasswordGenerator = function (firstname, lastname) {

    var fn = '';
    var ln = '';
    if (firstname.length > 5 && lastname.length > 5) {
        fn = firstname.substring(0, firstname.length > 5 ? 5 : firstname.length);
        ln = lastname.substring(0, lastname.length > 5 ? 5 : lastname.length);
    }
    else {
        fn = firstname.trim();
        ln = lastname.trim();
    }
    return fn.toLowerCase() + ln.toLowerCase() + Math.floor(Math.random() * 89) + 7;
}

worqbox.DatatableWithCustomSorting = function (tableID, columnsDefine = []) {
    $('#' + tableID).DataTable({
        columnDefs: columnsDefine,
        "bSort": true,
        "ordering": true,
        "bFilter": false,
        "paging": false,
        "bInfo": false,
        "bPaginate": false,
        "bLengthChange": false
    });
}

worqbox.SetUserTimeZone = function () {

    //let usertTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //let usertTimeZoneNames = usertTimeZone.split('/');
    //let userTimeZoneOffset = (new Date().getTimezoneOffset() / 60) * -1;
    //$(".timeZone > option").each(function () {
    //    //console.log('Ittertaing Text: '+this.text);
    //    if (this.value == userTimeZoneOffset && usertTimeZoneNames.some(userTimeZonesName => this.text.toLowerCase().includes(userTimeZonesName.toLowerCase()))) {

    //        $(this).attr('selected', 'selected');
    //    }
    //});
    console.log("SetUserTimeZone");
}

worqbox.RemoveTableColum = function (str = [], tableID) {
    str.forEach((column) => {
        // Get target th with the name you want to remove.
        var target = $('#' + tableID + ' tr').find('th[data-name="' + column + '"]');
        // Find its index among other ths 
        var index = (target).index();
        // For each tr, remove all th and td that match the index.
        $('#' + tableID + ' tr').find('th:eq(' + index + '),td:eq(' + index + ')').remove();

    });
}

worqbox.OpenModalWithTemplate = function (modalid, template) {

    for (const [key, value] of Object.entries(template)) {
        console.log(key, value);
        if (value?.setValue) {
            $('#' + key).val(value.val).trigger('change');
        }
        else
            $('#' + key).html(value.val);
    }
    $('#' + modalid).modal('show');

}

worqbox.PhoneMask = function (inputFieldID, appendWithClass = '', append = false) {
    var telInput = $("#" + inputFieldID),
        errorMsg = $(".error-msg" + (append ? appendWithClass : "")),
        validMsg = $(".valid-msg" + (append ? appendWithClass : ""));
    var instance = telInput.intlTelInput({
        allowExtensions: true,
        formatOnDisplay: true,
        autoFormat: true,
        autoHideDialCode: true,
        autoPlaceholder: true,
        defaultCountry: "us",
        ipinfoToken: "yolo",
        nationalMode: false,
        numberType: "MOBILE",
        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        preferredCountries: ['sa', 'ae', 'qa', 'om', 'bh', 'kw', 'ma'],
        preventInvalidNumbers: true,
        separateDialCode: true,
        initialCountry: "us",
        geoIpLookup: function (callback) {
            $.get("http://ipinfo.io", function () { }, "jsonp").always(function (resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
    });


    var reset = function () {
        telInput.removeClass("error");
        errorMsg.addClass("d-none");
        validMsg.addClass("d-none");
    };

    // on blur: validate
    telInput.blur(function () {
        reset();
        if ($.trim(telInput.val())) {
            if (instance.isValidNumber()) {
                validMsg.removeClass("d-none");
            } else {
                telInput.addClass("error");
                errorMsg.removeClass("d-none");
            }
        }
    });

    // on keyup / change flag: reset
    telInput.on("keyup change", reset);

    return instance;
}

worqbox.getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
}

worqbox.GetRandomBadge = function () {
    switch (worqbox.getRandomArbitrary(1, 5)) {
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:

            break;
        default:
            return "primary";
    }
}

worqbox.BindSchoolsLookup = function (selector, parentID, placeholder = 'Search School', IsResellerIDBind = false, lookupSelector = null) {
    let _val = lookupSelector == null ? parseInt($("#ResellerCSRLookup option:selected").val()) : parseInt($("#" + lookupSelector + " option:selected").val());
    let _resellerID = (IsResellerIDBind == true ? _val : 0);
    $(selector).select2({
        placeholder: placeholder,
        dropdownParent: $(parentID),
        dropdownCssClass: "alwaysOnTopClass", closeOnSelect: false,
        ajax: {
            url: worqbox.routers.GetSchoolsLookup,
            type: 'POST',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    searchParam: params.term,
                    resellerID: _resellerID
                };
            },
            processResults: function (json, params) {
                var results = [];
                json.forEach((v, index) => {
                    results.push({
                        id: v.schoolID,
                        text: v.schoolName
                    });
                });
                return {
                    results: results,
                    more: false
                };
            },
            cache: false
        },
        templateResult: function (item) {
            if (item.loading) {
                return item.text;
            }
            var term = query.term || '';
            var $result = worqbox.markMatch(item.text, term);
            return $result;
        },
        templateSelection: function (data) {
            return data.text;
        },
        minimumInputLength: 0,
        language: {
            searching: function (params) {
                query = params;
                return 'Searching...' + (!!query.term ? query.term : "") + '...';
            }
        }
    });
}

worqbox.BindClassesLookup = function (selector) {
    $.ajax({
        type: "GET",
        url: worqbox.routers.GetClassesLookup,
        data: "{}",
        success: function (data) {

            var options = '<option value="0" selected="">All Classes</option>';
            for (var i = 0; i < data.length; i++) {
                options += '<option value="' + data[i].classID + '">' + data[i].className + '</option>';
            }
            $(selector).html(options);
        }
    });
}

worqbox.BindCoursesLookup = function (selector) {
    $.ajax({
        type: "GET",
        url: "/Report/GetAllCourses",
        data: "{}",
        success: function (data) {
            var options = '<option value="0" selected="">Please Select a Course</option>';
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    options += '<option value="' + data[i].courseID + '">' + data[i].courseName + '</option>';
                }
                $(selector).html(options);
            }

        }
    });
}

// Ajax call generic set for all over the app

worqbox.BindPSTLookup = function (selector) {
    //$.ajax({
    //    type: "GET",
    //    url: worqbox.routers.GetPSTLookup,
    //    data: "{}",
    //    success: function (data)
    //    {
    //        var options = '<option value="">Please Select a Time Zone</option>';
    //        for (var i = 0; i < data.length; i++) {
    //            var timezone = data[i].timeZone;
    //            options += '<option ' + (data[i].isCurrent ? "selected='selected'" : "") + ' value="' + timezone.baseUtcOffset.hours + '">' + timezone.displayName + '</option>';
    //        }
    //        $(selector).html(options);
    //        worqbox.SetUserTimeZone();
    //    }
    //});



    var timezones = moment.tz.names();
    var timezoneList = [];
    var timezones = moment.tz.names();
    var timezoneList = [];
    for (var i = 0; i < timezones.length; i++) {
        var timezone = timezones[i];
        var offset = moment.tz(timezone).format('Z');
        var isCurrent = moment.tz.zone(timezone).name === moment.tz.guess();
        try {
            if (offset) {
                const splits = offset.split(':');
                if (splits && splits.length > 0) {
                    var offset_ = parseInt(splits[0]);
                    timezoneList.push({ timezone, offset: offset_, isCurrent });
                }
            }
        }
        catch (err) { }
    }
    var options = '<option value="-1">Please Select a PST Time</option>';
    for (var i = 0; i < timezoneList.length; i++) {
        var timezone = timezoneList[i].timezone;

        options += '<option ' + (timezoneList[i].isCurrent ? "selected='selected'" : "") + ' value="' + timezoneList[i].offset + '">' + timezoneList[i].timezone + '</option>';
    }
    $(selector).html(options);
}

worqbox.BindSelectedSchoolLookup = function (selector, isOrgStudent = false) {
    $.ajax({
        type: "GET",
        url: worqbox.routers.GetSchoolsLookup,
        data: "{}",
        success: function (data) {
            if (data != null && data[0] != null) {
                $(selector).select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });

                if (isOrgStudent) {
                    FirstLoadData();
                    //$("#OrgAdminStudentFilterbtn").trigger('click');
                }
            }

        }
    });
}

worqbox.ChangeSchoolLookup = function (selectedSchoolIdSelector, select2Selector, parentSelect2Selector) {

    if ($(selectedSchoolIdSelector).find(':selected').val().trim() != '') {
        let selectedSchoolID = $(selectedSchoolIdSelector).find(':selected').val().trim();
        $(select2Selector).select2({
            placeholder: "Search Teacher",
            dropdownParent: $(parentSelect2Selector),
            dropdownCssClass: "alwaysOnTopClass", closeOnSelect: false,
            ajax:
            {
                url: worqbox.routers.GetTeachersLookup,
                type: 'POST',
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        searchParam: params.term,
                        schoolID: selectedSchoolID
                    };
                },
                processResults: function (json, params) {
                    ;
                    var results = [];
                    json.forEach((v, index) => {
                        results.push({
                            id: v.teacherID,
                            text: v.teacherName
                        });
                    });
                    return {
                        results: results,
                        more: false
                    };
                },
                cache: false
            },
            templateResult: function (item) {
                if (item.loading) {
                    return item.text;
                }
                var term = query.term || '';
                var $result = worqbox.markMatch(item.text, term);
                return $result;
            },
            templateSelection: function (data) {
                return data.text;
            },
            minimumInputLength: 0,
            language:
            {
                searching: function (params) {
                    query = params;
                    return 'Searching...' + (!!query.term ? query.term : "") + '...';
                }
            }
        });

    }
}

worqbox.changeTeacherLookup = function (teacherSelect2ID) {
    let selectedTeacherID = parseInt($(teacherSelect2ID).find(':selected').val());
    if (selectedTeacherID > 0) {
        $.ajax({
            type: "GET",
            url: `/Report/GetAllClasses?teacherID=${selectedTeacherID}`,
            data: "{}",
            success: function (data) {
                var options = '<option value="0" selected="">All Classes</option>';
                for (var i = 0; i < data.length; i++) {
                    options += '<option value="' + data[i].classID + '">' + data[i].className + '</option>';
                }
                $(".classes").html(options);
            }
        });
    }

}

worqbox.OrgDefaultSchoolBindInReportSchoolLookup = function () {
    $.ajax({
        type: "GET",
        url: worqbox.routers.GetSchoolsLookup,
        data: "{}",
        success: function (data) {
            if (data != null && data[0] != null) {
                $("#searchSchoolMonitorStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });
                $("#searchSchoolProgressStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });
                $("#searchSchoolTimeStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });
                $("#searchSchoolPacingStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });
                $("#searchSchoolTimeClassStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });
                $("#searchSchoolclassSummaryFilterStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });

                $("#searchSchoolclassSummaryFilterStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });
                $("#searchSchoolStudentGrowthReportStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });
                $("#searchSchoolStudentNRSCASASReportStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });
                $("#searchSchoolEnglishSubjectAreaStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });
                $("#searchSchoolCEFREnglishSubjectAreaStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });
                $("#searchSchoolMathSubjectAreaStr").select2("trigger", "select", {
                    data: { id: data[0].schoolID, text: data[0].schoolName }
                });

            }

        }
    });
}

worqbox.BindResellerLookup = function (selector) {
    $.ajax({
        type: "GET",
        url: `/Reseller/GetResellerLookup`,
        data: "{}",
        success: function (data) {
            var options = '<option selected="" value="">Please choose any reseller</option>';
            for (var i = 0; i < data.length; i++) {
                options += '<option value="' + data[i].resellerID + '">' + data[i].resellerName + '</option>';
            }
            $(selector).html(options);
        }
    });
}

worqbox.BindCustomerLicense = function (totalseatselector, activeseatselector, IsSchoolChangeLookupBindingEnable = false, schoolSelect2ID, additionalLook) {
    debugger
    let pageUrl = `/License/GetLicenseStatus`;
    if (IsSchoolChangeLookupBindingEnable) {
        debugger
        let selectedSchoolID = parseInt($(schoolSelect2ID + " option:selected").val().trim());
        pageUrl = pageUrl + `?customerID=${selectedSchoolID}`
    }

    worqbox.ajaxPostCall(pageUrl, null, function (data) {
        if (data != null) {

            $(totalseatselector).html('').append(data.result.totalSeats == null ? 0 : data.result.totalSeats);
            let availableSeats = parseInt(data.result.totalSeats) - parseInt(data.result.activeSeats);
            $(activeseatselector).html('').append(availableSeats);
            $("#selectedSchoolName").html('').append($(schoolSelect2ID + " option:selected").text().trim());
            $("#classDetailtotalseats").html('').append(data.result.totalSeats == null ? 0 : data.result.totalSeats);
            $("#classDetailactiveseats").html('').append(availableSeats);

        } else {
            $(totalseatselector).html('').append('0');
            $(activeseatselector).html('').append('0');
        }
    });
}

worqbox.StudentCheckBoxSelector = function (checkboxselector, datatableselector, actionbtnSelector, callBack = null) {
    $(document).off('change', checkboxselector).on('change', checkboxselector, function () {
        let selectedStudents = [];
        $(datatableselector + ' tr td:first-child input:checkbox:checked').each(function () {
            selectedStudents.push($(this).val());
        }).get();
        selectedStudents = selectedStudents.filter((el) => el != '');
        if (selectedStudents.length <= 0) {
            $(actionbtnSelector).addClass("disabled");
        } else {
            $(actionbtnSelector).removeClass("disabled");
        }
        if(callBack != null){
            callBack(selectedStudents);
        }
    });

}

worqbox.Print = function () {

}


worqbox.DetailBox = function (title, type, message) {
    Swal.fire(
        {
            title: worqbox.isNullOrEmpty(title) && showDefaultTitle ? "Details" : title,
            text: message,
            type: worqbox.isNullOrEmpty(type) ? "info" : type,
            cancelButtonText: '<i class="fal fa-times mr-1"></i> Close'
        }).then(function (result) {
        });
}

worqbox.ExportPDF = function (btnSelector, filename, pageSelector, pageFormat = 'letter', pageOrientation = 'landscape') {
    $(btnSelector).click(
        //Create PDf from HTML...
        async function CreatePDFfromHTML() {
            worqbox.showLoading();
            window.scrollTo(0, 0);
            var opt = {
                margin: 1,
                filename: filename + '.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, dpi: 192, letterRendering: true },
                jsPDF: { unit: 'in', format: pageFormat, orientation: pageOrientation }
            };

            const doc = new jsPDF(opt.jsPDF);
            const pageSize = jsPDF.getPageSize(opt.jsPDF);

            var pages = $(pageSelector);

            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];

                const pageImage = await html2pdf().set(opt).from($(page).html()).outputImg();

                if (i != 0) doc.addPage();

                doc.addImage(pageImage.src, 'jpeg', 0, 0, pageSize.width, pageSize.height, null, 'FAST');
                worqbox.showLoading(`Converting ${i + 1} of ${pages.length}`);
            }

            doc.output('save', opt.filename);
            worqbox.hideLoading();
        }
    );
}

worqbox.hideableModal = function (btnSelector, modalCustomClass, appendContainerClass) {

    var $content, $modal, $apnData, $modalCon;
    $content = $(".min");
    //To fire modal
    $(btnSelector).click(function (e) {
        e.preventDefault();
        var $id = $(this).attr("data-target");

        $($id).modal({ backdrop: false, keyboard: false });

    });

    $(".modalMinimize").on("click", function () {

        $modalCon = $(this).closest(modalCustomClass).attr("id");

        $apnData = $(this).closest(modalCustomClass);

        $modal = "#" + $modalCon;

        $(".modal-backdrop").addClass("display-none");

        $($modal).toggleClass("min");

        if ($($modal).hasClass("min")) {

            $(".minmaxCon").append($apnData);

            $(this).find("i").toggleClass('fa-minus').toggleClass('fa-clone');

        }
        else {

            $(appendContainerClass).append($apnData);

            $(this).find("i").toggleClass('fa-clone').toggleClass('fa-minus');

        };

    });
    $("button[data-dismiss='modal']").click(function () {

        $(this).closest(modalCustomClass).removeClass("min");

        $(appendContainerClass).removeClass($apnData);

        $(this).next('.modalMinimize').find("i").removeClass('fa fa-clone').addClass('fa fa-minus');
    });
}
// booolean to Yes/No
worqbox.YesNo = function (value) {
    return !!value ? "Yes" : "No";
}
worqbox.DownloadFromURL = function (url) {
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
worqbox.ResetStepper = worqbox.SafeExecute(function () {
    // $('#Usernametxt').val('');
    $('#step0').removeClass('d-none');
    $('#step1').addClass('d-none');
    $('#step2').addClass('d-none');
    $('#step3').addClass('d-none');
    $('#step4').addClass('d-none');
    $("#step1btn").addClass('d-none');
    $("#step2btn").addClass('d-none');
    $("#step3btn").addClass('d-none');
    $('#step2AddStudentForm').addClass('d-none');
    $('#step2AddStudentFormbtn').addClass('d-none');
})
// converts null values to empty string in object
worqbox.ConvertNullToEmptyString = function (obj) {
    for (var key in obj) {
        if (obj[key] === null) {
            obj[key] = '';
        }
    }
    return obj;
}
// converts empty string to null
worqbox.ConvertEmptyStringToNull = function (strValue) {
    if (strValue == '' || !strValue)
        return null;
    return strValue;
}
// if value valid returns, else returns default value
worqbox.SafeValue = function (value, defaultValue = '') {
    if (value == null || value == undefined) {
        return defaultValue;
    }
    return value;
}

worqbox.ResetAddStudentForm = worqbox.SafeExecute(function () {
    // $("#formAddNewStudent").trigger('reset');
    $('#formAddNewStudent').removeClass('was-validated');
    $('#Usernametxt').removeClass('is-valid');
    $('#Usernametxt').removeClass('is-invalid');
    $("#Usernametxt").val('');
    $("#Passwordtxt").val('');
    $("#searchStudentOrganizationStr").val('').trigger('change');
    $("#searchTeacherListStr").html('').select2({ data: [{ id: '', text: '' }] });
    $("#selectedLURSClassID").html('');
    $('#addForm_WhatsAppNumber').val('')
    $("#addForm_WhatsAppNumber").parent().removeClass('disabled');
    $('#phone').off('keyup');
    $(".custom-file-label").html('Choose File');
    $(".error-msg").addClass('d-none');
    $(".valid-msg").addClass('d-none');
    $(".error-msg_WhatsAppNumber").addClass('d-none');
    $(".valid-msg_WhatsAppNumber").addClass('d-none');
    $("#searchCountryStr").val('').change();
    $('.custom-file-input').val('');
    $("#searchCourseStr").html('').select2({ data: [{ id: '', text: '' }] });
});

worqbox.ResetEditStudentForm = function () {

}
worqbox.CheckUsernameExists = (username) => new Promise((resolve, error) => {
    try {
        worqbox.ajaxPostCall(`/Account/CheckUsernameExists?username=${username}`, null, function (data) { resolve(data) }, null, true, null, `Checking Username Exists for "${username}"`);
    }
    catch {
        resolve(null);
    }
});
// To Select2
worqbox.Select2 = function (selector,
    ajaxUrl,
    idKey,
    textKey,
    placeholder = "Search",
    dropdownParent = null,
    dropdownCssClass = 'alwaysOnTopClass',
    closeOnSelect = false,
    minimumInputLength = 0,
    additionalSearchParams = null) {
    if (!selector) return;
    worqbox.SafeExecute($(selector).select2({
        placeholder,
        dropdownParent: $(dropdownParent),
        dropdownCssClass,
        closeOnSelect,
        ajax: {
            url: ajaxUrl,
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    searchParam: params.term, // search term
                    ...additionalSearchParams
                };
            },
            processResults: function (json, params) {
                var results = [];
                debugger
                json.forEach((v, index) => {
                    results.push({
                        id: v[idKey],
                        text: v[textKey]
                    });
                });
                return {
                    results: results,
                    more: false
                };
            },
            cache: false
        },
        templateResult: function (item) {
            if (item.loading) {
                return item.text;
            }
            var term = query.term || '';
            var $result = worqbox.markMatch(item.text, term);
            return $result;
        },
        templateSelection: function (data) {
            return data.text;
        },
        minimumInputLength,
        language: {
            searching: function (params) {
                query = params;
                return 'Searching...' + (!!query.term ? query.term : "") + '...';
            }
        }
    }));
}
// Set value of select2
worqbox.SetSelect2Value = function (selector, id, text, isSelectorID = true) {
    if (!selector) return;
    if ($(isSelectorID ? `#${selector}` : selector).data('select2')) {
        $(isSelectorID ? `#${selector}` : selector).select2("trigger", "select", { data: { id, text } });
    }
}
// Reset select2
worqbox.ResetSelect2 = function (selector, isSelectorID = true) {
    debugger
    if (!selector) return;
    $(isSelectorID ? `#${selector}` : selector).val('').trigger('change');
}

worqbox.OptionalColumnLookup = function (select2Selector,dropdownParentSelector, placeholderText ='Optional columns' ) {

    $(select2Selector).select2(
        {
            dropdownParent: $(dropdownParentSelector),
            placeholder: placeholderText
        });
}

worqbox.OptionalColumnBind = function (select2ClassName)
{
    $(document.body).on("change", `.${select2ClassName}`, function () {
        var data = [];
        var $el = $(`.${select2ClassName}`);
        $el.find('option:selected').each(function () {
            data.push($(this).val());
        });
        
        if (data != null && data.length > 0)
        {
            if (select2ClassName == 'growthReportOptionalColumns') {

                if ($.inArray("ClassNames", data) !== -1) {
                    $('.studentClassesHideSectionGrowth').removeClass('d-none');
                } else {
                    $('.studentClassesHideSectionGrowth').addClass('d-none');
                }


                if ($.inArray("WhatsAppNumber", data) !== -1) {
                    $('.whatsNumberHideSectionGrowth').removeClass('d-none');
                } else {
                    $('.whatsNumberHideSectionGrowth').addClass('d-none');
                }

                if ($.inArray("EnrollDate", data) !== -1) {
                    $('.enrollDateHideSectionGrowth').removeClass('d-none');
                } else {
                    $('.enrollDateHideSectionGrowth').addClass('d-none');
                }

            }
            else if (select2ClassName == 'mathReportOptionalColumns')

            {
                if ($.inArray("ClassNames", data) !== -1) {
                    $('.studentClassesHideSectionMath').removeClass('d-none');
                } else {
                    $('.studentClassesHideSectionMath').addClass('d-none');
                }


                if ($.inArray("WhatsAppNumber", data) !== -1) {
                    $('.whatsNumberHideSectionMath').removeClass('d-none');
                } else {
                    $('.whatsNumberHideSectionMath').addClass('d-none');
                }

                if ($.inArray("EnrollDate", data) !== -1) {
                    $('.enrollDateHideSectionMath').removeClass('d-none');
                } else {
                    $('.enrollDateHideSectionMath').addClass('d-none');
                }
            }
            else if (select2ClassName == 'progressReportOptionalColumns') {
                if ($.inArray("ClassNames", data) !== -1) {
                    $('.studentClassesHideSectionProgress').removeClass('d-none');
                } else {
                    $('.studentClassesHideSectionProgress').addClass('d-none');
                }


                if ($.inArray("WhatsAppNumber", data) !== -1) {
                    $('.whatsNumberHideSectionProgress').removeClass('d-none');
                } else {
                    $('.whatsNumberHideSectionProgress').addClass('d-none');
                }

                if ($.inArray("EnrollDate", data) !== -1) {
                    $('.enrollDateHideSectionProgress').removeClass('d-none');
                } else {
                    $('.enrollDateHideSectionProgress').addClass('d-none');
                }
            }
            else if (select2ClassName == 'englishReportOptionalColumns')
            {
                if ($.inArray("ClassNames", data) !== -1) {
                    $('.studentClassesHideSectionEnglish').removeClass('d-none');
                } else {
                    $('.studentClassesHideSectionEnglish').addClass('d-none');
                }


                if ($.inArray("WhatsAppNumber", data) !== -1) {
                    $('.whatsNumberHideSectionEnglish').removeClass('d-none');
                } else {
                    $('.whatsNumberHideSectionEnglish').addClass('d-none');
                }

                if ($.inArray("EnrollDate", data) !== -1) {
                    $('.enrollDateHideSectionEnglish').removeClass('d-none');
                } else {
                    $('.enrollDateHideSectionEnglish').addClass('d-none');
                }
            }
        } else
        {
            if (select2ClassName == 'growthReportOptionalColumns') {
                $('.studentClassesHideSectionGrowth').addClass('d-none');
                $('.whatsNumberHideSectionGrowth').addClass('d-none');
                $('.enrollDateHideSectionGrowth').addClass('d-none');
            } else if (select2ClassName == 'mathReportOptionalColumns') {
                $('.studentClassesHideSectionMath').addClass('d-none');
                $('.whatsNumberHideSectionMath').addClass('d-none');
                $('.enrollDateHideSectionMath').addClass('d-none');
            } else if (select2ClassName == 'progressReportOptionalColumns') {
                $('.studentClassesHideSectionProgress').addClass('d-none');
                $('.whatsNumberHideSectionProgress').addClass('d-none');
                $('.enrollDateHideSectionProgress').addClass('d-none');
            } else if (select2ClassName == 'englishReportOptionalColumns') {
                $('.studentClassesHideSectionEnglish').addClass('d-none');
                $('.whatsNumberHideSectionEnglish').addClass('d-none');
                $('.enrollDateHideSectionEnglish').addClass('d-none');
            }
            
        }

    });

   
  

}

worqbox.ResetOptionalColumns = function () {
    $(".progressReportOptionalColumns").val('').trigger('change');
    $(".growthReportOptionalColumns").val('').trigger('change');
    $(".mathReportOptionalColumns").val('').trigger('change');
    $(".englishReportOptionalColumns").val('').trigger('change');
    $('.studentClassesHideSectionGrowth').addClass('d-none');
    $('.whatsNumberHideSectionGrowth').addClass('d-none');
    $('.enrollDateHideSectionGrowth').addClass('d-none');
    $('.studentClassesHideSectionMath').addClass('d-none');
    $('.whatsNumberHideSectionMath').addClass('d-none');
    $('.enrollDateHideSectionMath').addClass('d-none');
    $('.studentClassesHideSectionProgress').addClass('d-none');
    $('.whatsNumberHideSectionProgress').addClass('d-none');
    $('.enrollDateHideSectionProgress').addClass('d-none');
    $('.studentClassesHideSectionEnglish').addClass('d-none');
    $('.whatsNumberHideSectionEnglish').addClass('d-none');
    $('.enrollDateHideSectionEnglish').addClass('d-none');
}

$('.datepicker').datepicker({ dateFormat: 'mm-dd-yyyy' });
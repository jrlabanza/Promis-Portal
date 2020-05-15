function showimagepreview(input) {

    if (input.files && input.files[0]) {//checks if file exists
        var filerdr = new FileReader(); //reads file format
        filerdr.onload = function (e) { //jquery on load
            $('#image-change').attr('src', e.target.result); // change attribute
        };
        filerdr.readAsDataURL(input.files[0]);
        
    }
}

function sanitizeInput(input) {
    /*
    var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
                 replace(/<[\/\!]*?[^<>]*?>/gi, '').
                 replace(/<style[^>]*?>.*?<\/style>/gi, '').
                 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
    return output;
    */
    return input.replace(/<(|\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '');
};

$(document).on("click", "#submit-safety-calendar-message", function () {

    var formData = new FormData();

    var fileLen = $("input#current_images")[0].files.length;
    var addfileLen = $("input#additional-attachment")[0].files.length;
    
    if (fileLen == 0) {
        var toastHTML2 = "PLEASE INPUT IMAGE!";
        M.toast({ html: toastHTML2 });
    }
    else {
        formData.append("title", $("#broadcast-title").val());
        formData.append("date", $("#safety-date").val());
        formData.append("message", $("#safety-message").val());
        formData.append("fileLen", $("input#current_images")[0].files.length);
        formData.append("hyperlink", $("#additional-links").val());
        formData.append("hyperlink_header", $("#link-header").val());
        formData.append("imageupload", $("input#current_images")[0].files[0]);
        formData.append("additional", $("input#additional-attachment")[0].files[0]);
        formData.append("additional_attachment_header", $("#additional-attachment-header").val());
     

        var request = $.ajax({
            url: base_url + "Portal/UploadDocumentsBroadcast",
            type: "post",
            data: formData,
            contentType: false,
            cache: false,
            processData: false
        });

        request.done(function (uploadImage) {

            var toastHTML = "SENDING";
            M.toast({ html: toastHTML });
            $(".indeterminate").show();
            setTimeout(function () {
                var toastHTML2 = "SUCCESS!";
                M.toast({ html: toastHTML2 });
                window.location.reload();
            }, 2000);

        });
    }
});

$("#browse_image_for_current").on("click", function () {
    $("#current_images").click();
});

$("#update-safety-days").on("click", function () {
    var current_record = $("#current-record-edit").val();
    var previous_record = $("#previous-record-edit").val();

    $.post(
    base_url + "Portal/updateSafetyDays",
    {
        "current_record": current_record,
        "previous_record":previous_record
    },
    function (data) {
        window.location.reload();
    }
);
});

$("#reset-safety-days").on("click", function () {

    $.post(
    base_url + "Portal/resetSafetyDays",

    function (data) {
        window.location.reload();
    }
);
});
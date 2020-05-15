function showimagepreview(input) {

    if (input.files && input.files[0]) {//checks if file exists
        var filerdr = new FileReader(); //reads file format
        filerdr.onload = function (e) { //jquery on load
            $('#image-change').attr('src', e.target.result); // change attribute
        };
        filerdr.readAsDataURL(input.files[0]);
        
    }
}

$(document).on("click", "#submit-safety-calendar-message", function () {

    //var toastHTML = $("#safety-date").val();
    
    //M.toast({ html: toastHTML });

    var formData = new FormData();
    var fileLen = $("input#current_images")[0].files.length;
    formData.append("title", $("#broadcast-title").val());
    formData.append("date", $("#safety-date").val());
    formData.append("message", $("#safety-message").val());
    formData.append("fileLen", $("input#current_images")[0].files.length);

    for (var i = 0; i < fileLen; i++) {
        nameTmp = "" + i;
        formData.append(nameTmp, $("input#current_images")[0].files[i]);
    }

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



});

$("#browse_image_for_current").on("click", function () {
    $("#current_images").click();
});

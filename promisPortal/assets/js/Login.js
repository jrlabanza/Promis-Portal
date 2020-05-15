var loginfunc = function ()
{
    var username = $(".username").val();
    var password = $(".password").val();

    var USER_LOGIN = {
        "ffID": username,
        "password": password
    }
    //$.post(
    //    base_url + "Users/is_valid",
    //    {
    //        "FFID": username
    //    },
    //    function (is_valid) {
    //        console.log(is_valid);
    //        if (is_valid == "YES")
    //        {
    //            alert("YES");
    //        }
    //        if (is_valid == "NO") {
    //            alert("NO");
    //        }
    //    }
    //)
  
    $.post(
        base_url + "Users/Login_employee",
            USER_LOGIN,
            function (data) {
                console.log(data);

                if (data.done == "TRUE") {

                    var toastHTML = 'SUCCESS! LOGGING IN';
                    M.toast({ html: toastHTML });
                    setTimeout(function () { window.location.reload(); }, 3000);
                }
                else if (data.done == "FALSE") {

                    var toastHTML = 'INVALID CREDENTIALS! TRY AGAIN';
                    M.toast({ html: toastHTML });
                }
                else if (data.done == "INVALID") {

                    var toastHTML = 'UNATHORIZED PERSONNEL';
                    M.toast({ html: toastHTML });
                }
            }
    );

}
$(document).on("click", "#log-in", function () {
    loginfunc();
});

$(document).keypress(function (e) {
    if ((e.keycode == 13 || e.which == 13) && ($("#login_modal").hasClass("open"))) {
        loginfunc();
    }
});

$("#logout_user").on("click", function () {
    $.post(
        base_url + "Users/Logout",
            function (data) {
                var toastHTML = 'LOGGING OUT';
                M.toast({ html: toastHTML });
                setTimeout(function () { window.location.reload(); }, 3000);
          
            }
    );
});

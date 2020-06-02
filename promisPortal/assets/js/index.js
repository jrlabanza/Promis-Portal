document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
    });
});

function refreshClock() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var monthOG = d.getMonth() + 1;
    var hour = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (month == 1) {
        month = "January";
    }

    else if (month == 2) {
        month = "February";
    }

    else if (month == 3) {
        month = "March";
    }

    else if (month == 4) {
        month = "April";
    }

    else if (month == 5) {
        month = "May";
    }

    else if (month == 6) {
        month = "June";
    }

    else if (month == 7) {
        month = "July";
    }

    else if (month == 8) {
        month = "August";
    }

    else if (month == 9) {
        month = "September";
    }

    else if (month == 10) {
        month = "October";
    }

    else if (month == 11) {
        month = "November";
    }

    else if (month == 12) {
        month = "December";

    }
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (monthOG < 10) {
        monthOG = "0" + monthOG;
    }
    var date = month + " " + day + " " + year + " " + hour + ":" + minutes + ":" + seconds;

    $("#daily-date").val(date);

}

function refreshContent() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var monthOG = d.getMonth() + 1;
    if (day < 10) {
        day = "0" + day;
    }
    if (monthOG < 10) {
        monthOG = "0" + monthOG;
    }
    var datemessageverify = monthOG + "/" + day;

    $.post(
        base_url + "Portal/getQualityCalendar",
        function (data) {
            var message = "";
            var answer = "";
            $.each(data, function (i, safety_data) {

                if (datemessageverify == safety_data.new_date) {
                    message = safety_data.qualityMessage;
                    answer = safety_data.qualityAnswers;
                    $(".quality-message").html(message);
                    $(".quality-answer").html(answer);
                }
            });
        }
    );

    $.post(
        base_url + "Portal/getSafetyCalendar",
        function (data) {
            var message = "";
            var answer = "";
            $.each(data, function (i, safety_data) {
                if (datemessageverify == safety_data.new_date) {
                    message = safety_data.qualityMessage;
                    answer = safety_data.qualityAnswers;
                    $(".safety-message").html(message);
                    $(".safety-answer").html(answer);
                }
            });

        }
    );

    $.post(
        base_url + "Portal/getCovidCalendar",
        {
            "day":day
        },
        function (data) {
            var message = "";
            var answer = "";
            $.each(data, function (i, safety_data) {
             
                message = safety_data.covidMessage;
                answer = safety_data.covidAnswers;
                $(".covid-message").html(message);
                $(".covid-answer").html(answer);
            
            });

        }
    );

    $.post(
        base_url + "Portal/getSafetyDays",
        function (data) {
            $("#previous-record").html(data.previous_record);
            $("#current-record").html(data.current_record);
            $("#previous-record-edit").val(data.previous_record);
            $("#current-record-edit").val(data.current_record);
        }
    );

    $.post(
        base_url + "Portal/getBroadcast",
        function (getBroadcast) {
            var d = new Date();
            var day = d.getDate();
            var month = d.getMonth() + 1;
            var monthOG = d.getMonth() + 1;
            var year = d.getFullYear();
            if (day < 10) {
                day = "0" + day;
            }
            if (monthOG < 10) {
                monthOG = "0" + monthOG;
            }
            var date = year + "-" + monthOG + "-" + day;

            var slide_data = "";
            $.each(getBroadcast, function (i, broadcastResults) {
                if (new Date(date) <= new Date(broadcastResults.new_date)) {
                    slide_data += "<li class='remove-broadcast'>";
                    slide_data += "<img src='../uploads/" + broadcastResults.photo_header + "'>";
                    slide_data += "<div class='caption center-align' style='background-color:black;'>";
                    slide_data += "<h4>" + broadcastResults.subject + "</h4>";
                    slide_data += "<h5 class='light grey-text text-lighten-3'><a class='modal-trigger' href='../Portal/Broadcast?newsID=" + broadcastResults.id + "' target='_blank'>READ MORE</a></h5>";
                    slide_data += "</div>";
                    slide_data += "</li>";
                }
            });

            $("#add-slides").append(slide_data);
            $('.slider').slider({
                height: 400
            });
        }
    );

}

refreshClock();
refreshContent();

setInterval(function () {
    refreshClock();
}, 1000);

setInterval(function () {
    $(".remove-broadcast").remove();
    refreshContent();
}, 600000);

if (newsID != null) {

    $.post(
        base_url + "Portal/getBroadcastByID",
        {
            "newsID": newsID
        },
        function (getBroadcastByID) {
            console.log(getBroadcastByID);

            $("#broadcast-header").html("'" + getBroadcastByID.subject + "'");
            $("#broadcast-image").attr("src", "../uploads/" + getBroadcastByID.photo_header);
            $("#broadcast-body").val(getBroadcastByID.body);
            
            if (getBroadcastByID.hyperlink != "") {
                var hyperlink = "<a href='" + getBroadcastByID.hyperlink + "' class='btn btn-lg' target='_blank'>" + getBroadcastByID.hyperlink_header + "</a>";
                $("#add-hyperlink").append(hyperlink)
            }

            if (getBroadcastByID.additional_attachment != "") {
                var additional_attachment = "<a href='../uploads/" + getBroadcastByID.additional_attachment + "' class='btn btn-lg' target='_blank'>" + getBroadcastByID.additional_attachment_header + "</a>";
                $("#add-additional-attachment").append(additional_attachment)
            }
        }
    );
}

$(document).on("click", ".tabs", function () {
    if ($(".tab-safety-color-1").hasClass("active") == true) {
        $(".card-content.tab-safety-message").css("background-color", "#e8f5e9")
    }

    if ($(".tab-safety-color-2").hasClass("active") == true) {
        $(".card-content.tab-safety-message").css("background-color", "#FFEBEE")
    }

    if ($(".tab-quality-color-1").hasClass("active") == true) {
        $(".card-content.tab-quality-message").css("background-color", "#e8f5e9")
    }

    if ($(".tab-quality-color-2").hasClass("active") == true) {
        $(".card-content.tab-quality-message").css("background-color", "#FFEBEE")
    }

    if ($(".tab-covid-color-1").hasClass("active") == true) {
        $(".card-content.tab-covid-message").css("background-color", "#e8f5e9")
    }

    if ($(".tab-covid-color-2").hasClass("active") == true) {
        $(".card-content.tab-covid-message").css("background-color", "#FFEBEE")
    }
})

$(document).on("click", ".circle", function () {
    alert("yes");
});




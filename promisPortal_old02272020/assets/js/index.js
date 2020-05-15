document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
    });
});

var d = new Date();
var day = d.getDate();
var month = d.getMonth() + 1;
var monthOG = d.getMonth() + 1;
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
var date = month + " " + day + " " + year;

$("#daily-date").val(date);

var datemessageverify = monthOG + "/" + day;
$.post(
    base_url + "Portal/getQualityCalendar",
    function (data) {
        var message = "";
        $.each(data, function (i, safety_data) {
            
            if (datemessageverify == safety_data.new_date) {
                message = safety_data.qualityMessage;
                $(".quality-message").append(message);
            }
            else {
               
            }
        });
        
    }
);

$.post(
    base_url + "Portal/getSafetyCalendar",
    function (data) {
        var message = "";
        $.each(data, function (i, safety_data) {

            if (datemessageverify == safety_data.new_date) {
                message = safety_data.qualityMessage;
                $(".safety-message").append(message);
            }
            else {

            }
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
                slide_data += "<li>";
                slide_data += "<img src='../uploads/" + broadcastResults.photo_header + "'>";
                slide_data += "<div class='caption center-align' style='background-color:black;'>";
                slide_data += "<h4>" + broadcastResults.subject + "</h4>";
                slide_data += "<h5 class='light grey-text text-lighten-3'><a class='modal-trigger' href='../Portal/Broadcast?newsID=" + broadcastResults.id + "' target='_blank'>READ MORE</a></h5>";
                slide_data += "</div>";
                slide_data += "</li>";
            }
            else {
            }

        });

        $("#add-slides").append(slide_data);
        $('.slider').slider({
            height: 400
        });
    }
);

$.post(
    base_url + "Portal/getBroadcastByID",
    {
        "newsID":newsID
    },
    function (getBroadcastByID) {
        console.log(getBroadcastByID);
        $("#broadcast-image").attr("src", "../uploads/"+getBroadcastByID.photo_header);
        $("#broadcast-header").html("'"+getBroadcastByID.subject+"'");
        $("#broadcast-body").html(getBroadcastByID.body);
        console.log(getBroadcastByID.hyperlink);

        if (getBroadcastByID.hyperlink != "") {
            var hyperlink = "<a href='" + getBroadcastByID.hyperlink +"' class='btn btn-lg' target='_blank'>" + getBroadcastByID.hyperlink_header + "</a>";
            $("#add-hyperlink").append(hyperlink)
       
        }
    }
);




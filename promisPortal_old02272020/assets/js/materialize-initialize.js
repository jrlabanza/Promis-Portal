﻿$(document).ready(function () {


    $('.materialboxed').materialbox();
    $('.tooltipped').tooltip();
    $('.sidenav').sidenav();

    $('.collapsible').collapsible({
        accordion: false
    });
    $('.parallax').parallax();
    $('.modal').modal();

    $('.tap-target').tapTarget();
    $('.tooltipped').tooltip();

    $('.carousel').carousel({
        fullWidth: true,
        indicators: true,
        noWrap: true

    });

    
});
$(".rvs-container").rvslider();

$('.fixed-action-btn').floatingActionButton({
    hoverEnabled: false
});
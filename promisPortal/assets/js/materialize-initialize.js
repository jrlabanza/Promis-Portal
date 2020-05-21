$(document).ready(function () {


    $('.materialboxed').materialbox();
    $('.tooltipped').tooltip();
    $('.sidenav').sidenav({
        isOpen: true
    });

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
    $('.tabs').tabs();

    
});
$(".rvs-container").rvslider();

$('.fixed-action-btn').floatingActionButton({
    hoverEnabled: false
});

$('.tabs').tabs();
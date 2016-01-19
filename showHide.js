$(document).ready(function () {
	$("#closebutton").hide();
    $(document).on('mouseenter', '#widget', function () {
        $(this).find("#closebutton").show();
    }).on('mouseleave', '#widget', function () {
        $(this).find("#closebutton").hide();
    });
});
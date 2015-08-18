//radio checked one at the time
$('.radio').on('change', function(){
    $('.radio').not(this).prop('checked', false);
});
$('.mradio').on('change', function(){
    $('.mradio').not(this).prop('checked', false);
});
$('.cradio').on('change', function(){
    $('.cradio').not(this).prop('checked', false);
});


//=====================
// for disabled inputs
//=====================
$( "#rectangular" ).click(function() {
  $('.measurements').prop('disabled', false);
  $('.diameter').prop('disabled', true);
});
$( "#circular" ).click(function() {
  $('.measurements').prop('disabled', true);
  $('.diameter').prop('disabled', false);
});

$( "#centimeters" ).click(function() {
	$('.unit').html('centimeters');
});
$( "#inches" ).click(function() {
	$('.unit').html('inches');
});


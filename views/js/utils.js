$('input[type="radio"]').mousedown(function() { 
    if(this.checked) {
        $(this).mouseup(function() {  
            var radio = this;
            setTimeout(function() { 
                radio.checked = false; 
            }, 5); 
            $(this).unbind('mouseup');
        });
    }
});

$('input[type=radio]').on('change', function(){
    $('input[type=radio]').not(this).prop('checked', false);
});

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

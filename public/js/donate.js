$(document).ready(function(){
$('#money').on('keyup change', function(){
  var total = $(this).val() * $('#curr').val() * 10;
  $('#virtualMoney').val(total);
});
$('#curr').on('change', function(){
  $('#money').change();
});
$('#gift').on('click', function(){
  $(this).prop('checked')==true ? $('#username').prop('readonly', false).val('') : $('#username').prop('readonly', true).val(name);
})


 $('#donate').validate({
    rules: {
      "username": {
        minlength: 3,
        namecheck : true,
        required: true
      },
      "money": {
        required: true,
        numcheck: true
      }
    },
    messages: {
      "username": {
        required: "Обязательное поле",
        minlength: "Минимальная длинна имени - 3 символа",
        namecheck : "Недопустимые символы"
      },
      "money": {
        required: "Обязательное поле",
        numcheck: "Недопустимое значение"
      }
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function ( error, element ) {
      error.addClass( "help-block" );
      element.parents( ".form-group" ).addClass( "has-feedback" );
      if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function ( element, errorClass, validClass ) {
      $( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
    },
    unhighlight: function ( element, errorClass, validClass ) {
      $( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
    }
  } );
  $.validator.addMethod("namecheck", function(value) {
         return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
             && /[a-z]/.test(value) // has a lowercase letter
       });
 $.validator.addMethod("numcheck", function(value) {
         return /^[1-9]/.test(value)
       });




});
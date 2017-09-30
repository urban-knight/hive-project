$(document).ready( function () {
  $('#login').validate({
    rules: {
      "username": {
        minlength: 3,
        namecheck : true
      },
      "password": {
        required: true,
        minlength: 6
      }
    },
    messages: {
      "username": {
        required: "Введите свое имя",
        minlength: "Минимальная длинна имени - 3 символа",
        namecheck : "Недопустимые символы"
      },
      "password": {
        required: "Обязательное поле",
        minlength: "Ваш пароль сликом короткий"
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
});
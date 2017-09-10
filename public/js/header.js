$(document).ready(function(){
  $('.launch-modal').on('click', function(e){
    e.preventDefault();
    $( '#' + $(this).data('modal-id') ).modal();
  });

  $('#loginForm').validate({
   rules: {
    "user[userName]": {
      namecheck: true,
      required: true,
      minlength: 4,
      maxlength:20
    },
    "user[password]": {
      pwcheck: true,
      required: true,
      minlength: 6,
      maxlength: 16
    }
  },
  messages: {
    "user[userName]": {
      namecheck: "Недопустимый формат имени",
      required: "Введите имя пользователя",
      minlength: "Минимальная длинна имени - 4 символа",
      maxlength: "Максимальная длинна имени - 20 символов"
    },
    "user[password]": {
      pwcheck: "Недопустимый пароль",
      required: "Введите пароль",
      minlength: "Минимальная длинна пароля - 6 символов",
      maxlength: "Максимальная длинна пароля - 16 символов"
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
});
  $.validator.addMethod("pwcheck", function(value) {
   return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
       && /[a-z]/.test(value) // has a lowercase letter
       && /\d/.test(value) // has a digit
     });
  $.validator.addMethod("namecheck", function(value) {
   return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
       && /[a-z]/.test(value) // has a lowercase letter
     });
});
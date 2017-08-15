
$( document ).ready( function () {
  $('#registrationForm').validate({
   rules: {
    "user[firstName]": {
      maxlength:10,
      kyrylic_namecheck : true
    },

    "user[lastname]": {
     maxlength:10,
      kyrylic_namecheck : true
   },

   "user[username]": {
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
  },
  password_confirm: {
    required: true,
    minlength: 6,
    maxlength: 16,
    equalTo: "#password"
  },
  "user[email]": {
    required: true,
    email: true
  },

},
messages: {
  "user[firstName]": {
    required: "Введите свое имя",
    maxlength: "Максимальная длинна имени - 10 символов",
    kyrylic_namecheck : "Недопустимые символы"
  },
  "user[lastname]": {
   required: "Введите свою фамилию",
   maxlength: "Допустимая длинна - 10 символов",
   kyrylic_namecheck : "Недопустимые символы"
 },

 "user[username]" : {
  namecheck: "Имя должно состоять из букв верхнего и нижнего реестра а также цифр",
  required: "Введите имя пользователя",
  minlength: "Минимальная длинна имени - 4 символа"
},
"user[password]": {
  pwcheck: "Пароль должен состоять из букв верхнего и нижнего реестра а также цифр",
  required: "Придумайте Ваш пароль",
  minlength: "Ваш пароль сликом короткий"
},
password_confirm: {
  required: "Повторите пароль",
  minlength: "Ваш пароль сликом короткий",
  equalTo: "Пароли не совпадают"
},
"user[email]": "Введите настоящий E-mail-адрес",
CheckBoxConfirm: "Приймите условия пользовательского соглашения"
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
  if ( !element.next( "span" )[ 0 ] ) {
    $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
  }

},
success: function ( label, element ) {
          // Add the span element, if doesn't exists, and apply the icon classes to it.
          if ( !$( element ).next( "span" )[ 0 ] ) {
            $( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
          }
        },
        highlight: function ( element, errorClass, validClass ) {
          $( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
          $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
        },
        unhighlight: function ( element, errorClass, validClass ) {
          $( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
          $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
        }
      } );
  $.validator.addMethod("pwcheck", function(value) {
   return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
       && /[a-z]/.test(value) // has a lowercase letter
       && /\d/.test(value) // has a digit
     });
  $.validator.addMethod("namecheck", function(value) {
   return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
       && /[a-z]/.test(value) // has a lowercase letter
      // && /\d/.test(value) // has a digit
    });
    $.validator.addMethod("kyrylic_namecheck", function(value) {
   return /^[А-Яа-яA-Za-z]*$/.test(value) // consists of only these
    });
} );
$(document).ready( function () {
  var countryData = $.fn.intlTelInput.getCountryData();
  $.each(countryData, function(i, country) {
    country.name = country.name.replace(/.+\((.+)\)/,"$1");
  });

  $("#phone").intlTelInput({
    onlyCountries: ["ua", "ru", "md", "kz", "by", "ge", "ee", "lt", "lv", "pl" ,"az", "ro", "hu", "au", "br", "tr", "tn", "am"],
    initialCountry: "auto",
    geoIpLookup: function(callback) {
      $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        callback(countryCode);
      });
    },
    utilsScript: "./../../lib/intl-tel-input/build/js/intlTelInput.js"
  });
$('form').each(function() {
  $(this).validate({
    rules: {
      "user[firstName]": {
        maxlength:10,
        minlength: 3,
        kyrylic_namecheck : true
      },
      "user[lastName]": {
        maxlength:10,
        minlength: 3,
        kyrylic_namecheck : true
      },
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
      },
      password_confirm: {
        required: true,
        minlength: 6,
        maxlength: 16,
        equalTo: "#reg_password"
      },
      "user[email]": {
        required: true,
        email: true
      },
      "user[phone]" :{
        required: true,
        number: true
      }
    },
    messages: {
      "user[phone]":{
        required: "Обязательное поле",
        number: "Недопустимые символы"
      },
      "user[firstName]": {
        required: "Введите свое имя",
        maxlength: "Максимальная длинна имени - 10 символов",
        minlength: "Минимальная длинна имени - 3 символа",
        kyrylic_namecheck : "Недопустимые символы"
      },
      "user[lastName]": {
        required: "Введите свою фамилию",
        maxlength: "Допустимая длинна - 10 символов",
        minlength: "Минимальная длинна имени - 3 символа",
        kyrylic_namecheck : "Недопустимые символы"
      },
      "user[userName]" : {
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
    },
    highlight: function ( element, errorClass, validClass ) {
      $( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
    },
    unhighlight: function ( element, errorClass, validClass ) {
      $( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
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
         return /^[А-Яа-я]*$/.test(value) // consists of only these
       });
});
});
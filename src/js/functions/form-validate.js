import $ from 'jquery';
import 'jquery-validation';

$(function () {
  $('#form').each(function () {
    $(this).validate({
      errorPlacement(error, element) {
        return true;
      },
      focusInvalid: true, // не фокусируется
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
        },
      },
      submitHandler(form) { // не работает
        let th = $(form);
        console.log(th);
        $.ajax({
          type: 'POST',
          url: '../mail.php',
          data: th.serialize(),
        }).done(() => {
          alert('Good Job!');
          th.trigger('reset');
        });

        return false;
      }
    });
  });
});

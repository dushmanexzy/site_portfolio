import $ from 'jquery';
import validate from '../vendor/jquery.validate';

$(document).ready(() => {
  $('#form').each(function () {
    $(this).validate({
      errorPlacement(error, element) {
        return true;
      },
      focusInvalid: false,
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
        },
      },
      submitHandler(form) {
        let th = $(form);

        $.ajax({
          type: 'POST',
          url: '../mail.php',
          data: th.serialize(),
        }).done(() => {
          alert('Отправлено!!');

          th.trigger('reset');
        });

        return false;
      }
    })
  });
});

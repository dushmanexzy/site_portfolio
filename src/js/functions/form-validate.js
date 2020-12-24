import $ from 'jquery';
import validate from '../vendor/jquery.validate';

$(document).ready(() => {
  $('#form').each(function () {
    $(this).validate({
      errorPlacement(error, element) {
        return false;
      },
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
          maxlength: 6,
        },
      },
      messages: {
        name: {
          required: 'Введите что-нибудь!'
        },
        email: {
          required: 'Введите что-нибудь!',
          maxlength: 'Не более 6 символов'
        }
      },
      submitHandler(form) {
        let th = $(form);

        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: th.serialize(),
        }).done(() => {
          th.trigger('reset');
        });

        return false;
      }
    })
  });
});

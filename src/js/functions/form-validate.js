import $ from 'jquery';
import 'jquery-validation';

const shortShowMessageElement = () => {
  let messageBlock = document.createElement('div');
  messageBlock.className = 'js-message';
  messageBlock.innerHTML = `<strong>Сообщение отправлено!</strong>`;

  document.body.prepend(messageBlock);

  setTimeout(() => messageBlock.remove(), 2000);
}

$(function () {
  $('#form').each(function () {
    $(this).validate({
      errorPlacement(error, element) {
        return true;
      },
      focusInvalid: true,
      rules: {
        name: {
          required: true,
          minlength: 8,
        },
        email: {
          required: true,
          email: true,
        },
      },
      submitHandler(form) {
        let th = $(form);

        $.ajax({
          type: 'POST',
          url: '../mail.php',
          data: th.serialize(),
        }).done(() => {
          shortShowMessageElement();
          th.trigger('reset');
        });

        return false;
      }
    });
  });
});

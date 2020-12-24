import vars from '../_vars';
import InputMask from '../vendor/inputmask';

let maskTel = new InputMask("+7(999) 999-99-99");
maskTel.mask(vars.$inputMask);

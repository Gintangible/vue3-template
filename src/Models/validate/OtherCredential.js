import ValidationResult from '@/models/common/ValidationResult';

const NUMBER_REGEXP = /^[a-zA-Z0-9.]{2,60}$/;

export default {
  isValid(number) {
    return NUMBER_REGEXP.test(number);
  },
  validResult(number, name = '') {
    if (!number) {
      return new ValidationResult(false, `${name}证件111号码不能为空`);
    }
    return new ValidationResult(this.isValid(number, true), `${name}证件号码错误，请进行核对并修改`);
  },
};

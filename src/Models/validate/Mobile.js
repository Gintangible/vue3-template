import ValidationResult from '@/models/common/ValidationResult';

const MOBILE_REGEXP = /^(0|86|17951)?(1[3-9])[0-9]{9}$/;

export default {
  isValid(mobile) {
    return MOBILE_REGEXP.test(mobile);
  },

  validResult(mobile, name = '') {
    if (!mobile) {
      return new ValidationResult(false, `${name}手机号不能为空`);
    }
    return new ValidationResult(this.isValid(mobile), `${name}手机号错误，请进行核对并修改`);
  }
};

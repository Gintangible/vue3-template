import { DEFAULT_CREDENTIAL_TYPE } from '@/models/common/CredentialType';
import ValidationResult from '@/models/common/ValidationResult';
import IdentityCard from './validate/IdentityCard';
import OtherCredential from './validate/OtherCredential';

class Credential {
  constructor(type = DEFAULT_CREDENTIAL_TYPE.value, number = '') {
    this.type = type || '';
    this.number = number || '';
    this.long_term = false;        // 证件是否长期有效，0表示否，1表示是
    this.valid_from = '';          // 证件有效期起始日期，格式yyyy-MM-dd
    this.valid_until = '';         // 证件有效期截止日期，格式yyyy-MM-dd
  }

  isIdentityCard() {
    return (this.type === DEFAULT_CREDENTIAL_TYPE.value);
  }

  assign(obj = {}) {
    this.type = obj.type || DEFAULT_CREDENTIAL_TYPE.value;
    this.number = obj.number || '';
    this.long_term = obj.long_term || false;
    this.valid_from = obj.valid_from || '';
    this.valid_until = obj.valid_until || '';
  }

  static create(obj) {
    const result = new Credential();
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      result.assign(obj);
    }
    return result;
  }

  validate(field, name) {
    if (!field || field === '*') {
      const all = ['type', 'number'];
      return this.validate(all, name);
    } else if (Array.isArray(field)) {
      const results = [];
      for (let i = 0; i < field.length; ++i) {
        const r = this.validate(field[i], name);
        results.push(r);
      }
      return ValidationResult.merge(results);
    } else if (typeof field === 'string') {
      switch (field) {
        case 'type':
          return new ValidationResult(!!this.type, `请选择${name || ''}证件类型`);
        case 'number':
          if (this.isIdentityCard(this.type)) {
            return IdentityCard.validResult(this.number, name);
          }
          return OtherCredential.validResult(this.number, name);
        case 'validTerm':
          if (!this.valid_from) {
            return new ValidationResult(false, `请选择${name || ''}证件有效期起始日期`);
          }
          if (!this.valid_until || !this.long_term) {
            return new ValidationResult(false, `请选择${name || ''}证件有效期截止日期`);
          }
          return new ValidationResult(true);
        default:
          throw new Error(`Unsupported field name: ${field}`);
      }
    } else {
      throw new Error(`Unsupported field type: ${typeof field}`);
    }
  }
}

export default Credential;

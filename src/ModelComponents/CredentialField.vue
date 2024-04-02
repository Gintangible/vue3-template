<template>
  <div class="credential-field">
    <EnumSelect
      v-model="credential.type"
      :columns="credentialTypes"
      :label="typeLabel"
      :name="`${name}CredentialType`"
      :required="required"
      :rules="typeRules"
      :input-align="inputAlign"
      :placeholder="typePlaceholder"
      :readonly="readonly || typeReadonly"
      :readonly-tip="typeReadonlyTip"
      @confirm="onConfirmType"
      @change="onChangeType"
    />
    <van-field
      v-model.trim="credential.number"
      :readonly="readonly || numberReadonly"
      :label="numberLabel"
      :name="`${name}CredentialNumber`"
      :placeholder="numberPlaceholder"
      :required="required"
      :rules="credentialNumberRule"
      :error-message-align="inputAlign"
      :input-align="inputAlign"
      @click="onNumberFieldClick"
      @update:value="onChangeNumber"
      @blur="onNumberFieldBlur"
    />
  </div>
</template>

<script setup>
import { showToast } from 'vant';
import { CREDENTIAL_TYPES } from '@/models/common/CredentialType';
import Credential from '@/models/Credential';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  required: Boolean,
  name: {
    type: String,
    default: '',
  },
  typeLabel: {
    type: String,
    default: '证件类型',
  },
  typeReadonlyTip: {
    type: String,
    default: ''
  },
  typePlaceholder: {                // 证件类型选项框提示文字
    type: String,
    default: '请选择证件类型',
  },
  typeReadonly: Boolean,
  typeRules: {
    type: Array,
    default: () => [],
  },
  credentialTypes: {                // 证件类型选项
    type: Array,
    default: () => CREDENTIAL_TYPES,
  },
  numberLabel: {                    // 证件号码输入框标签
    type: String,
    default: '证件号码',
  },
  numberPlaceholder: {              // 证件号码输入框提示文字
    type: String,
    default: '请填写证件号码',
  },
  numberRules: {
    type: Array,
    default: () => [],
  },
  numberReadonly: Boolean,
  readonly: Boolean,
  readonlyTip: {
    type: String,
    default: '',
  },
  inputAlign: {
    type: String,
    default: 'right',
  },
});

const emit = defineEmits([
  'update:modelValue',
  'confirm-type',
  'change-type',
  'change-number',
  'change',
  'clear-error',
  'error',
]);

const credential = useVModel(props, 'modelValue', emit);

const credentialNumberRule = computed(() => [{
  required: props.required,
  trigger: 'onBlur',
  validator: (val, rule) => {
    const result = credential.value.validate('number');
    rule.message = result.description;
    return result.success;
  },
}].concat(props.numberRules));

function onChangeType(type) {
  emit('change-type', type);
}

function onConfirmType(type) {
  // 修改证件类型，并将其号码清空
  // this.credential.changeType(type);
  emit('confirm-type', type);
  emit('change', Credential.create(credential.value));
  emit('clear-error');
}

function onChangeNumber(number) {
  credential.value.number = number?.trim()?.toUpperCase();
  emit('clear-error');
}

function onNumberFieldClick() {
  if (props.readonly || props.numberReadonly) {
    // 注意标签可能含有空格，但提示信息中不应该有空格，此方案仅适用于中文标签，英文则不适合
    const label = props.readonlyTip || props.numberLabel;
    showToast(`${label}不可更改`);
  }
}

function onNumberFieldBlur() {
  const result = credential.value.validate('number');
  emit('change-number', credential.value.number);
  emit('change', Credential.create(credential.value));
  if (!result.success) {
    emit('error', result.description);
  }
}
</script>
<style scoped lang="less">
</style>

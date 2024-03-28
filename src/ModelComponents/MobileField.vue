<template>
  <van-field
    v-model.trim="mobile"
    :name="name"
    type="tel"
    :readonly="readonly"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :error-message-align="inputAlign"
    :rules="mobileRule"
    :input-align="inputAlign"
    @click="onClick"
    @update:model-value="onChange"
    @blur="onBlur"
  />
</template>

<script setup>
import { showToast } from 'vant';
import Mobile from '@/models/validate/Mobile';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: '',
  },
  name: {
    type: String,
    default: 'mobile',
  },
  readonly: Boolean,
  readonlyTip: {
    type: String,
    default: '姓名',
  },
  required: Boolean,
  rules: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: '手机号码',
  },
  placeholder: {
    type: String,
    default: '请填写手机号码',
  },
  inputAlign: {
    type: String,
    default: 'right',
  },
});

const emit = defineEmits([
  'update:modelValue',
  'error',
  'error-clear',
]);

const mobile = useVModel(props, 'modelValue', emit);

const mobileRule = computed(() => [{
  required: props.required,
  trigger: 'onBlur',
  validator: (val, rule) => {
    const result = Mobile.validResult(val);
    rule.message = result.description;
    return result.success;
  },
}].concat(props.rules));

watch(() => props.value, (newValue) => {
  mobile.value = newValue;
}, {
  immediate: true,
  deep: true,
});

function onClick() {
  if (props.readonly) {
    showToast(`${props.readonlyTip}不可更改`);
  }
}

function onChange(value) {
  mobile.value = value?.toUpperCase()?.trim();
  emit('error-clear');
}

function onBlur() {
  const result = Mobile.validResult(mobile.value);
  if (!result.success) {
    emit('error', result.description);
  }
}
</script>
<style scoped lang="less">
</style>

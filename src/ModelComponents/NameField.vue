<template>
  <van-field
    v-model.trim="text"
    :name="name"
    :readonly="readonly"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :error-message-align="inputAlign"
    :rules="nameRule"
    :input-align="inputAlign"
    @click="onClick"
    @update:model-value="onChange"
    @blur="onBlur"
  />
</template>

<script setup>
import { showToast } from 'vant';
import Name from '@/models/validate/Name';

const props = defineProps({
  name: {
    type: String,
    default: 'name',
  },
  modelValue: {
    type: String,
    required: true,
    default: '',
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
    default: '姓　　名',
  },
  placeholder: {
    type: String,
    default: '请填写姓名',
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

const text = useVModel(props, 'modelValue', emit);

const nameRule = computed(() => [{
  required: props.required,
  trigger: 'onBlur',
  validator: (val, rule) => {
    const result = Name.validResult(val);
    rule.message = result.description;
    return result.success;
  },
}].concat(props.rules));

function onClick() {
  if (props.readonly) {
    showToast(`${props.readonlyTip}不可更改`);
  }
}

function onChange(value) {
  text.value = value?.toUpperCase()?.trim();
  emit('error-clear');
}

function onBlur() {
  const result = Name.validResult(text.value);
  if (!result.success) {
    emit('error', result.description);
  }
}
</script>
<style scoped lang="less">
</style>

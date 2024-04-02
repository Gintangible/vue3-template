<template>
  <EnumSelect
    v-model="gender"
    :name="name"
    :required="required"
    :columns="genders"
    :label="label"
    :placeholder="placeholder"
    :input-align="inputAlign"
    :readonly="readonly"
    @confirm="onConfirm"
  />
</template>

<script setup>
import GENDERS from '@/models/common/Gender';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: '',
  },
  name: {
    type: String,
    default: 'gender',
  },
  genders: {                             // 性别下拉框的选项列表
    type: Array,
    default: () => GENDERS,
  },
  readonly: Boolean,
  readonlyTip: {
    type: String,
    default: '性别',
  },
  required: Boolean,
  label: {
    type: String,
    default: '性　　别',
  },
  placeholder: {
    type: String,
    default: '请选择性别',
  },
  inputAlign: {
    type: String,
    default: 'right',
  },
});

const emit = defineEmits([
  'confirm',
  'update:modelValue',
]);

const gender = useVModel(props, 'modelValue', emit);

function onConfirm(value) {
  emit('confirm', value);
}
</script>
<style scoped lang="less">
</style>

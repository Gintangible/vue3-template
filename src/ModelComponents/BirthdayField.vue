<template>
  <DateSelect
    v-model="birthday"
    :name="name"
    :required="required"
    :label="label"
    :placeholder="placeholder"
    :default-picker-value="defaultPickerValue"
    :min-date="minDate"
    :max-date="maxDate"
    :input-align="inputAlign"
    :readonly="readonly"
  />
</template>

<script setup>
import dayjs from 'dayjs';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true,
  },
  name: {
    type: String,
    default: 'birthday',
  },
  label: {
    type: String,
    default: '出生日期',
  },
  placeholder: {
    type: String,
    default: '请选择出生日期',
  },
  minDate: {
    type: Date,
    default: () => dayjs().subtract(120, 'year').toDate(),
  },
  maxDate: {
    type: Date,
    default: () => dayjs().toDate(),
  },
  defaultPickerValue: {
    type: String,
    default: '1990-01-01',
  },
  inputAlign: {
    type: String,
    default: 'right',
  },
  readonly: Boolean,          // 选项框中选择的日期是否只读
  required: Boolean,
});

const emit = defineEmits([
  'update:modelValue',
]);

const birthday = useVModel(props, 'modelValue', emit);

</script>
<style scoped lang="less">
</style>

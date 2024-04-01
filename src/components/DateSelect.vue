<template>
  <div class="datetime-select">
    <van-field
      v-model="text"
      :name="name"
      :label="label"
      :placeholder="placeholder"
      readonly
      clickable
      :is-link="isLink"
      :input-align="inputAlign"
      :required="required"
      :rules="dateRule"
      @click="onClick"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-date-picker
        v-model="pickerValue"
        :columns-type="columnsType"
        :title="label"
        :loading="loading"
        :min-date="minDate"
        :max-date="maxDate"
        :filter="filter"
        :formatter="formatter"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      >
        <template #columns-top>
          <slot name="columns-top" />
        </template>
        <template #columns-bottom>
          <slot name="columns-bottom" />
        </template>
      </van-date-picker>
    </van-popup>
  </div>
</template>
<script setup>
import { showToast } from 'vant';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: '',
  },
  name: {
    type: String,
    default: 'DateSelect',
  },
  label: {
    type: String,
    default: '日期时间',
  },
  placeholder: {
    type: String,
    default: '请选择日期时间',
  },
  required: Boolean,
  rules: {
    type: Array,
    default: () => [],
  },
  isLink: Boolean,
  readonly: Boolean,
  readonlyTip: {
    type: String,
    default: '',
  },
  inputAlign: {
    type: String,
    default: 'right',
  },
  columnsType: {
    type: Array,
    default: () => ['year', 'month', 'day'],
  },
  textSeparate: {
    type: String,
    default: '-',
  },
  loading: Boolean,
  defaultPickerValue: {
    type: String,
    default: '',
  },
  /* eslint-disable */
  minDate: Date,
  maxDate: Date,
  formatter: Function,
  filter: Function,
  /* eslint-enable */
});

const emit = defineEmits([
  'update:modelValue',
  'confirm',
  'change',
]);

const dateRule = computed(() => [{
  required: props.required,
}].concat(props.rules));

const text = ref('');
const pickerValue = ref([]);
watch(() => props.modelValue, (newValue) => {
  text.value = newValue;
  const pickerVal = newValue || props.defaultPickerValue;
  pickerValue.value = pickerVal.split(props.textSeparate);
}, {
  immediate: true,
  deep: true,
});

const showPicker = ref(false);
function onClick() {
  if (!props.readonly) {
    showPicker.value = true;
  } else {
    showToast(`${props.readonlyTip || props.label}不可更改`);
  }
}

function onConfirm({ selectedValues, selectedOptions }) {
  showPicker.value = false;
  const value = selectedValues.join(props.textSeparate);
  emit('update:modelValue', value);
  emit('confirm', selectedOptions);
}
</script>
<style scoped lang="less">
</style>

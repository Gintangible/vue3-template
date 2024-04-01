<template>
  <div class="enum-select">
    <van-field
      ref="enum"
      v-model="text"
      type="textarea"
      autosize
      :rows="1"
      :name="name"
      :required="required"
      :label="label"
      :placeholder="placeholder"
      readonly
      :border="border"
      :is-link="isLink"
      :input-align="inputAlign"
      :rules="enumRule"
      @click="onClick"
    />
    <van-popup v-model:show="showPicker" :lock-scroll="false" position="bottom">
      <van-picker
        ref="picker"
        v-model="pickerValue"
        :columns="columns"
        :title="label"
        :readonly="readonly"
        :loading="loading"
        :columns-field-names="columnsFieldNames"
        show-toolbar
        @cancel="showPicker = false"
        @confirm="onConfirm"
        @change="onChange"
      >
        <template #default>
          <slot />
        </template>
        <template #title>
          <slot name="title" />
        </template>
      </van-picker>
    </van-popup>
  </div>
</template>

<script setup>
import { showToast } from 'vant';

const props = defineProps({
  modelValue: {
    type: [String, Array],
    required: true,
  },
  name: {
    type: String,
    default: 'enum',
  },
  border: Boolean,
  isLink: Boolean,
  required: Boolean,
  rules: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  inputAlign: {
    type: String,
    default: 'right',
  },
  columns: {
    type: Array,
    required: true,
    default: () => [],
  },
  loading: Boolean,
  columnsFieldNames: {
    type: Object,
    default: () => ({
      text: 'text',
      value: 'value',
      children: 'children',
    }),
  },
  textSeparate: {
    type: String,
    default: '/',
  },
  // 值分隔符，需要将最终结果的值拼接起来
  valueSeparate: {
    type: String,
    default: '',
  },
  readonly: Boolean,
  readonlyTip: {
    type: String,
    default: '',
  },
});

const emit = defineEmits([
  'update:modelValue',
  'confirm',
  'change',
]);

const enumRule = computed(() => [{
  required: props.required,
}].concat(props.rules));

function findDataByValues(data, values) {
  const matchedItems = [];
  let level = 0;

  function findInArray(arr, values) {
    arr.forEach((item) => {
      const targetValue = values[level];
      if (item.value === targetValue) {
        matchedItems.push(item);
        if (Array.isArray(item.children)) {
          level++;
          findInArray(item.children, values);
        }
      }
    });
  }
  findInArray(data, values);

  return matchedItems;
}

const text = ref('');
const pickerValue = ref([]);
function getTextDisplay(selectedOptions) {
  text.value = selectedOptions.map((item) => item[props.columnsFieldNames.text]).join(props.textSeparate);
}
function getSelectArray() {
  if (!props.columns.length || !pickerValue.value.length) {
    text.value = '';
    return;
  }
  const selectedOptions = findDataByValues(props.columns, pickerValue.value);
  getTextDisplay(selectedOptions);
}

function getPickerInfo() {
  if (Array.isArray(props.modelValue)) {
    pickerValue.value = props.modelValue;
    return;
  }
  if (props.valueSeparate) {
    pickerValue.value = props.modelValue.split(props.valueSeparate);
    return;
  }
  pickerValue.value = [props.modelValue];
}

watch(() => props.modelValue, () => {
  getPickerInfo();
  getSelectArray();
}, {
  immediate: true,
  deep: true,
});

watch(() => props.columns, () => {
  getPickerInfo();
  getSelectArray();
}, {
  immediate: true,
  deep: true,
});

const showPicker = ref(false);
function onClick() {
  if (!props.readonly) {
    showPicker.value = true;
  } else {
    showToast(`(props.readonlyTip || ${props.label})不可更改`);
  }
}
function updateModelValue(selectedValues) {
  let updateValue = selectedValues[0];
  if (Array.isArray(props.modelValue)) {
    updateValue = selectedValues;
  }
  if (props.valueSeparate) {
    updateValue = selectedValues.join(props.valueSeparate);
  }
  emit('update:modelValue', updateValue);
}
function onConfirm({ selectedValues, selectedOptions }) {
  showPicker.value = false;
  updateModelValue(selectedValues);
  emit('confirm', selectedOptions);
}

function onChange(val) {
  emit('change', val);
}
</script>
<style scoped lang="less">
</style>

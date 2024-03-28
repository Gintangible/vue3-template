<template>
  <div class="enum-select">
    <van-field
      ref="enum"
      type="textarea"
      autosize
      :rows="1"
      :name="name"
      :required="required"
      :value="text"
      :label="label"
      :placeholder="placeholder"
      readonly
      :border="border"
      :is-link="isLink"
      :input-align="inputAlign"
      :rules="enumRule"
      @click="onClick"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        ref="picker"
        :columns="columns"
        :title="label"
        :default-index="defaultIndex"
        :value-key="labelKey"
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
    type: null,
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
  readonly: Boolean,
  readonlyTip: {
    type: String,
    default: '',
  },
  labelKey: {
    type: String,
    default: 'name',
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  // 多列时，结果合并
  arrayDataMerge: Boolean,
  valueSeparator: {
    type: String,
    default: '：',
  },
});

const emit = defineEmits([
  'update:modelValue',
  'confirm',
  'change',
]);

const showPicker = ref(false);
const text = ref('');
const defaultIndex = ref(0);
const picker = ref(null);

const enumRule = computed(() => [{
  required: props.required,
}].concat(props.rules));

function $updatePicker(index) {
  // 当 mounted() 函数调用 $updateUI() 方法时，因为vant的Popup组件尚不可见，所以
  // vant的Picker组件尚未被渲染，this.$refs.picker 为undefined；
  // 此时只能通过绑定属性设置 Picker 的 defaultIndex 值
  defaultIndex.value = index;
  if (picker.value) {
    picker.value.setIndexes = [index];
  }
}
function $updateUI(newValue) {
  if (newValue === null || newValue === '') {
    text.value = '';
    $updatePicker(0);
    return;
  }
  if (props.arrayDataMerge) {
    text.value = newValue;
    return;
  }
  // 查找枚举值对应的索引
  const index = props.columns.findIndex((e) => (props.valueKey ? e[props.valueKey] === newValue : e === newValue));
  if (index < 0) {
    text.value = '';
    $updatePicker(0);
  } else {
    text.value = props.labelKey ? props.columns[index][props.labelKey] : props.columns[index];
    $updatePicker(index);
  }
}

watch(() => props.value, (newValue) => {
  $updateUI(newValue);
}, {
  immediate: true,
  deep: true,
});

watch(() => props.columns, (newValue) => {
  $updateUI(newValue);
}, {
  immediate: true,
  deep: true,
});

function onClick() {
  if (!props.readonly) {
    showPicker.value = true;
  } else {
    showToast(props.readonlyTip || `${props.label}不可更改`);
  }
}

function onConfirm(item) {
  showPicker.value = false;
  // 注意：这里无需再调用 $updateUI()，因为下面的语句触发了 input 事件，而
  // value 是作为 v-model 被绑定到本组件，因此 input 事件必然会自动
  // 更新 value 的值，而 value 更新后会触发对其的 watch 函数，
  // 该函数中会调用 $updateUI() 方法。
  if (props.arrayDataMerge) {
    const itemMerge = item.join(props.valueSeparator);
    emit('update:modelValue', itemMerge);
    emit('confirm', itemMerge);
    return;
  }
  const val = props.valueKey ? item[props.valueKey] : item;
  emit('update:modelValue', val);
  emit('confirm', val);
}

function onChange(picker, item) {
  // 触发 change 事件
  const val = props.valueKey ? item[props.valueKey] : item;
  emit('change', val);
}
</script>
<style scoped lang="less">
</style>

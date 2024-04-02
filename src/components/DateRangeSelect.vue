<template>
  <div
    :class="['datetime-range',
             inline ? 'datetime-range_inline' : ''
    ]"
  >
    <DateSelect
      v-model="startDate"
      :columns-type="columnsType"
      :name="`${name}Start`"
      :label="startLabel"
      :placeholder="startPlaceholder"
      :is-link="isLink"
      :input-align="inputAlign"
      :rules="dateRule"
      :min-date="minDate"
      :max-date="rangeMaxDate"
      class="datetime-range_item"
      @confirm="onConfirm"
    />
    <slot v-if="inline && separator" name="separator">
      <span class="separator-wrap">
        {{ separator }}
      </span>
    </slot>
    <DateSelect
      v-model="endDate"
      :name="`${name}End`"
      :columns-type="columnsType"
      :label="endLabel"
      :placeholder="endPlaceholder"
      :is-link="isLink"
      :input-align="inputAlign"
      :min-date="rangeMinDate"
      :max-date="maxDate"
      :rules="dateRule"
      class="datetime-range_item"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    default: 'dateRange',
  },
  startLabel: {
    type: String,
    default: '',
  },
  startPlaceholder: {
    type: String,
    default: '开始时间',
  },
  endLabel: {
    type: String,
    default: '',
  },
  endPlaceholder: {
    type: String,
    default: '结束时间',
  },
  // 时间类型
  columnsType: {
    type: Array,
    default: () => ['year', 'month', 'day'],
  },
  // 时间验证规则
  rules: {
    type: Array,
    default: () => [],
  },
  separator: {
    type: String,
    default: '/',
  },
  inline: {
    type: Boolean,
    default: true,
  },
  isLink: Boolean,
  inputAlign: {
    type: String,
    default: 'center',
  },
  minDate: {
    type: Date,
    default: () => dayjs().subtract(10, 'year').toDate(),
  },
  maxDate: {
    type: Date,
    default: () => dayjs().add(10, 'year').toDate(),
  },
});

const startDate = ref('');
const endDate = ref('');

const dateRule = computed(() => [{
  required: props.required,
}].concat(props.rules));

const rangeMinDate = computed(() => {
  const minDate = startDate.value || props.minDate;
  return dayjs(minDate).toDate();
});

const rangeMaxDate = computed(() => {
  const maxDate = endDate.value || props.maxDate;
  return dayjs(maxDate).toDate();
});

watch(() => props.modelValue, (newValue) => {
  startDate.value = newValue[0] || '';
  endDate.value = newValue[1] || '';
}, {
  immediate: true,
  deep: true,
});

const emit = defineEmits([
  'update:modelValue',
]);

function onConfirm() {
  emit('update:modelValue', [startDate.value, endDate.value]);
}
</script>

<style lang="less" scoped>
.datetime-range {
  font-size: 14px;
  background: #fff;
  &.datetime-range_inline {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .datetime-range_item {
      width: 48%;
    }
    :deep(.van-field) {
      padding: 0;
    }
  }
}
</style>

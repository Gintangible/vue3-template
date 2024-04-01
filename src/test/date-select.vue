<template>
  <div>
    <DateSelect
      v-model="currentDate"
      label="日期选择"
      :columns-type="columnsType"
    />
    {{ currentDate }}
    <!-- 提交按钮 -->
  </div>
</template>

<script setup>
import DateSelect from '@/components/DateSelect.vue';

const currentDate = ref('2021-01');
const columnsType = ['year', 'month'];
</script>

<style lang="less" scoped>
.form-content {
  margin: 20px 14px 0;
  padding: 10px;
}
</style>

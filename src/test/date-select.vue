<template>
  <div>
    <DateSelect
      v-model="currentDate"
      label="日期选择"
      :columns-type="columnsType"
    />
    <div>
      {{ currentDate }}
    </div>
    <DateRangeSelect
      v-model="rangeDate"
      :inline="false"
      start-label="开始日期"
      end-label="结束日期"
    />
    <DateRangeSelect v-model="rangeDate" />
    <van-field label="日期区间">
      <template #input>
        <DateRangeSelect v-model="rangeDate" />
      </template>
    </van-field>
    <div>
      {{ rangeDate }}
    </div>
  </div>
</template>

<script setup>
import DateSelect from '@/components/DateSelect.vue';
import DateRangeSelect from '@/components/DateRangeSelect.vue';

const currentDate = ref('2021-01');
const columnsType = ['year', 'month'];

const rangeDate = ref([]);
</script>

<style lang="less" scoped>
.form-content {
  margin: 20px 14px 0;
  padding: 10px;
}
</style>

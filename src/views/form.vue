<template>
  <van-form
    ref="addForm"
    show-error
    class="add-container"
    @failed="onFailed"
    @submit="onSubmit"
  >
    <div class="form-content box-shadow_radius">
      <NameField
        v-model="insured.name"
        required
        @error="getError"
        @error-clear="getErrorClear"
      />
    </div>
    <!-- 提交按钮 -->
    <div @click="formSubmit">
      提交
    </div>
  </van-form>
</template>

<script setup>
import NameField from '@/ModelComponents/NameField.vue';
import Person from '@/models/Person';

const insured = ref(new Person());

const addForm = ref(null);
function formSubmit() {
  addForm.value.submit();
}
function onSubmit(values) {
  console.log('gxw get values', values);
}
function onFailed(values) {
  console.log('gxw get onFailed values', values);
}

function getError(error) {
  console.log('gxw get getError ', error);
}

function getErrorClear() {
  console.log('gxw get getErrorClear ');
}
</script>

<style lang="less" scoped>
.form-content {
  margin: 20px 14px 0;
  padding: 10px;
}
</style>

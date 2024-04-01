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
      <MobileField v-model="insured.mobile" required />
    </div>
    <EnumSelect
      v-model="enumValue"
      label="单列选择"
      :columns-field-names="{ text: 'name' }"
      :columns="enumColumns"
    />
    <EnumSelect
      v-model="enumValue2"
      label="多列选择"
      :columns="enumColumns2"
      :loading="loading"
    />
    {{ enumValue }}
    {{ enumValue2 }}
    <!-- 提交按钮 -->
    {{ insured }}
    <div @click="formSubmit">
      提交
    </div>
  </van-form>

  <!-- <CredentialField v-model="insured.credential" required /> -->
</template>

<script setup>
import EnumSelect from '@/components/EnumSelect.vue';
import NameField from '@/modelComponents/NameField.vue';
// import CredentialField from '@/modelComponents/CredentialField.vue';
import MobileField from '@/modelComponents/MobileField.vue';
import Person from '@/models/Person';

const insured = ref(new Person());

console.log('gxw get start insured ', insured.value);

const addForm = ref(null);

function formSubmit() {
  addForm.value.submit();
}
function onSubmit(values) {
  console.log('gxw get insured ', insured.value);
  console.log('gxw get values', values);
}
function onFailed(values) {
  console.log('gxw get insured ', insured.value);
  console.log('gxw get onFailed values', values);
}

function getError(error) {
  console.log('gxw get getError ', error);
}

function getErrorClear() {
  console.log('gxw get getErrorClear ');
}

const enumValue = ref('HONGKONG_MACAO_TAIWAN_RESIDENCE_PERMIT');
const enumColumns = [{
  name: '港澳通行证',
  value: 'HONGKONG_MACAO_RETURN_PERMIT',
},
{
  name: '台湾通行证',
  value: 'TAIWAN_RETURN_PERMIT',
},
{
  name: '港澳台居民居住证',
  value: 'HONGKONG_MACAO_TAIWAN_RESIDENCE_PERMIT',
}];
const enumValue2 = ref(['Fujian', 'Xiamen', 'Haicang']);
const enumColumns2 = ref([]);
const data = [{
  text: '浙江',
  value: 'Zhejiang',
  children: [
    {
      text: '杭州',
      value: 'Hangzhou',
      children: [
        { text: '西湖区', value: 'Xihu' },
        { text: '余杭区', value: 'Yuhang' },
      ],
    },
    {
      text: '温州',
      value: 'Wenzhou',
      children: [
        { text: '鹿城区', value: 'Lucheng' },
        { text: '瓯海区', value: 'Ouhai' },
      ]
    },
  ],
}, {
  text: '福建',
  value: 'Fujian',
  children: [
    {
      text: '福州',
      value: 'Fuzhou',
      children: [
        { text: '鼓楼区', value: 'Gulou' },
        { text: '台江区', value: 'Taijiang' },
      ],
    },
    {
      text: '厦门',
      value: 'Xiamen',
      children: [
        { text: '思明区', value: 'Siming' },
        { text: '海沧区', value: 'Haicang' },
      ],
    },
  ],
}];

const loading = ref(true);
setTimeout(() => {
  enumColumns2.value = data;
  loading.value = false;
}, 2000);
</script>

<style lang="less" scoped>
.form-content {
  margin: 20px 14px 0;
  padding: 10px;
}
</style>

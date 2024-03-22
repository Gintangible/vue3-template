<template>
  <div class="container">
    <div class="content">
      <van-image :src="error404Image" />
      <div class="yi">
        咦…
      </div>
      <div class="text" @click="goHome">
        正在努力升级系统<br> 稍等一下下，马上回来
      </div>
      <Button
        :loading="loading"
        class="van-btn"
        size="small"
        type="info"
        @click="goHome"
      >
        回到首页
      </Button>
    </div>
  </div>
</template>

<script setup>
import error404Image from '@/assets/images/err_404.png';

const router = useRouter();
const loading = ref(false);

function goHome() {
  loading.value = true;
  router.push({
    name: 'Home'
  });
}

</script>

<style scoped lang="less">
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 180px;
    height: 540px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .yi {
      font-size: 12px;
      color: grey;
      padding-top: 18px;
    }
    .text {
      padding-top: 15px;
      padding-bottom: 2em;
      font-size: 11px;
      width: 120px;
      color: grey;
      text-align: center;
      white-space: 12px;
    }
    .van-btn {
      margin-top: 15px;
      padding: 0 4em;
      font-size: 11px;
    }
  }
}
</style>

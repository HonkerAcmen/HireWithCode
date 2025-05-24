<template>
  <div class="content">
    <Transition name="fade" mode="out-in">
      <div v-if="!showMainContent" key="welcome" class="info">
        <img class="logo" :src="logo" alt="" />
        <h2 class="title">欢迎来到 infist 线上面试环节，期待你的加入！</h2>
      </div>
      <div v-else key="mainContent" class="mainContent">
        <RouterView />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import logo from '/imgs/logo.png'
import { useRouter } from 'vue-router'
const router = useRouter()
const showMainContent = ref(false)

onMounted(() => {
  setTimeout(() => {
    showMainContent.value = true
    router.push('/reder')
  }, 2000)
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: --el-box-shadow-lighter;
  height: 600px;
  width: 600px;
  border-radius: 30px;
  transition: all 0.3s ease;
  .logo {
    width: 30%;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
  }
}

// transition 效果
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

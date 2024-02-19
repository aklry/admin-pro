<script setup lang="ts">
import useUserStore from '@/store/user'

const userStore = useUserStore()
userStore.userLoginAction({
  username: 'admin',
  password: 'admin',
})
</script>

<template>
  <div class="home-container">
    <h2>home</h2>
    <el-button>按钮</el-button>
  </div>
</template>

<style scoped></style>

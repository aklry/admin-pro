<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const setting = ref(false)
const userStore = useUserStore()
const { username } = storeToRefs(userStore)
const router = useRouter()
const handleSetting = () => {
  setting.value = true
}
const logout = () => {
  sessionStorage.removeItem('user')
  router.push('/login')
}
</script>

<template>
  <div class="header">
    <div class="flex-center">logo</div>
    <div class="flex-grow"></div>
    <div class="flex-center color-dark-black m05">
      <i-ep-user />
      {{ username }}
    </div>
    <div
      class="flex-center color-dark-black m05 setting"
      @click="handleSetting"
    >
      <i-ep-setting />
    </div>
  </div>
  <el-drawer v-model="setting" :show-close="false" :with-header="false">
    <div class="setting-header">
      <h2>项目配置</h2>
      <i-ep-close @click="setting = false" />
    </div>
    <div class="out">
      <el-button type="primary" @click="logout">退出</el-button>
    </div>
  </el-drawer>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  height: 60px;
}
.setting {
  cursor: pointer;
}
.setting-header {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  height: 60px;
  color: var(--ry-color-black);
}
.out {
  padding: 15px;
  text-align: center;
  .el-button {
    width: 100%;
  }
}
</style>

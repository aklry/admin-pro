<script setup lang="ts">
import { reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router'

const userInfo = reactive({
  username: '',
  password: '',
})
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

// 登录
const userStore = useUserStore()
const router = useRouter()
const handleUserLogin = async () => {
  await userStore.userLoginAction(userInfo)
  await router.push('/')
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <h1>企业级中后台管理系统</h1>
      <el-form :model="userInfo" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="userInfo.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="userInfo.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUserLogin" class="login-btn">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--ry-background-light);
  .login-form {
    width: 400px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .login-btn {
      width: 100%;
    }
  }
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>

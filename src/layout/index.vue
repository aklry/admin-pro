<script setup lang="ts">
import Header from './components/header.vue'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { path } = storeToRefs(userStore)

const handleSelect = (index: string) => {
  userStore.setPath(index)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            router
            @select="handleSelect"
          >
            <el-menu-item index="/">项目描述</el-menu-item>
            <el-menu-item index="/user">用户列表</el-menu-item>
            <el-menu-item index="role">角色列表</el-menu-item>
            <el-menu-item index="/auth">权限列表</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  height: 100vh;
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
}
.el-header {
  padding: 0;
}
.el-menu {
  border-right: none;
}
</style>

<script setup lang="ts">
import Header from './components/header.vue'
const router = useRouter()
const route = useRoute()
const menuList = router.getRoutes().filter((route) => {
  return route.meta.isShow
})
const activePath = route.path
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
            :default-active="activePath"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            router
          >
            <template v-for="item in menuList" :key="item.name">
              <el-menu-item :index="item.path">
                {{ item.meta.title }}
              </el-menu-item>
            </template>
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

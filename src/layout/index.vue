<script setup lang="ts">
import { useSettingStore } from '@/store/setting'
import useUserStore from '@/store/user'
import Header from './components/header.vue'

const router = useRouter()
const routes = router.options.routes[0].children
const menuList = routes?.filter((route) => {
  return route.meta!.isShow
})
const settingStore = useSettingStore()
const userStore = useUserStore()

const handleSelect = (path: string) => {
  userStore.setPathAction(path)
}
const { path } = storeToRefs(userStore)
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
            <template v-for="item in menuList" :key="item.name">
              <template v-if="!item.children">
                <el-menu-item :index="item.path">
                  {{ item.meta!.title }}
                </el-menu-item>
              </template>
              <template v-else>
                <el-sub-menu :index="item.path">
                  <template #title>
                    <span>{{ item.meta?.title }}</span>
                  </template>
                  <template
                    v-for="subItem in item.children"
                    :key="subItem.path"
                  >
                    <el-menu-item :index="subItem.path">
                      {{ subItem.meta?.title }}
                    </el-menu-item>
                  </template>
                </el-sub-menu>
              </template>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator="/">
            <template v-for="item in settingStore.titles" :key="item">
              <el-breadcrumb-item :to="{ name: item }">
                {{ item }}
              </el-breadcrumb-item>
            </template>
          </el-breadcrumb>
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

.el-breadcrumb {
  margin-bottom: 20px;
}
</style>

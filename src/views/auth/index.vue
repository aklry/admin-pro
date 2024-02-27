<script setup lang="ts">
import { getAuthList } from '@/api/auth/auth'
import { IAuth } from '@/api/auth/type'
import type { ElTree } from 'element-plus'
import { useCompRef } from '@/hooks/useCompRef'

onMounted(() => {
  fetchAuthList()
  route.query.auth && treeRef.value.setCheckedKeys(route.query.auth)
})
const authList = ref<IAuth[]>([])
const treeRef = useCompRef<typeof ElTree>()
const route = useRoute()
const fetchAuthList = async () => {
  const { data } = await getAuthList()
  authList.value = data
}
const handleChangeAuth = () => {
  const checkedNodes = treeRef.value.getCheckedNodes()
  console.log(checkedNodes)
}
</script>

<template>
  <div class="auth-container">
    <el-tree
      ref="treeRef"
      :data="authList"
      show-checkbox
      check-strictly
      node-key="roleId"
      :props="{ label: 'name', children: 'roleList' }"
    />
    <el-button type="primary" @click="handleChangeAuth">修改权限</el-button>
  </div>
</template>

<style scoped lang="less"></style>

<script setup lang="ts">
import { getRoles, addRole } from '@/api/role/role'
import { IRoleList } from '@/api/role/type'
import { ElMessage, ElMessageBox } from 'element-plus'
onMounted(() => {
  fetchRoleList()
})
const roleList = ref<IRoleList[]>([])
const fetchRoleList = async () => {
  const res = await getRoles()
  roleList.value = res.data
}
const router = useRouter()
const handleEdit = (row: IRoleList) => {
  router.push({
    name: 'Auth',
    query: {
      auth: row.authority,
    },
  })
}

const handleAdd = () => {
  ElMessageBox.prompt('请输入角色名称', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(async ({ value }: { value: string }) => {
      await addRole(value)
      ElMessage.success('添加成功')
      await fetchRoleList()
    })
    .catch(() => {
      ElMessage.info('点击了取消')
    })
}
</script>
<template>
  <div class="role-container">
    <el-button class="add-button" type="primary" @click="handleAdd">
      添加角色
    </el-button>
    <el-table border :data="roleList">
      <el-table-column prop="roleId" label="编号" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row)" size="small">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="less">
.add-button {
  margin-bottom: 20px;
}
</style>

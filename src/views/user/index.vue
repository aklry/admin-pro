<script setup lang="ts">
import { IUserList } from '@/api/user/type'
import { getUserList, editUser } from '@/api/user/user'
import { getRoles } from '@/api/role/role'
import { IRoleList } from '@/api/role/type'
import { ElMessage } from 'element-plus'
interface ISearchData {
  nickName: string
  role: number
}
interface IEditData {
  id: number
  nickName: string
  role: number[]
}
onMounted(() => {
  fetchUserList()
  fetchRoleList()
})
const userList = ref<IUserList[]>([])
const searchData = reactive<ISearchData>({
  nickName: '',
  role: 0,
})
const roleList = ref<IRoleList[]>([])
const fetchUserList = async () => {
  const res = await getUserList()
  userList.value = res.data
}
const fetchRoleList = async () => {
  const res = await getRoles()
  roleList.value = res.data
}
// 搜索
const handleSearch = () => {
  let res: IUserList[] = userList.value
  if (searchData.role || searchData.nickName) {
    if (searchData.nickName) {
      res = res.filter((item) => item.nickName.includes(searchData.nickName))
    }
    if (searchData.role) {
      res = searchData.nickName ? res : userList.value
      res = res.filter((item) => {
        return item.role.find((r) => r.role === searchData.role)
      })
    }
  } else {
    res = userList.value
  }
  userList.value = res
}
watch(
  [() => searchData.nickName, () => searchData.role],
  ([nickName, role]) => {
    if (!nickName || !role) {
      fetchUserList()
    }
  },
)

const editData = reactive<IEditData>({
  id: 0,
  nickName: '',
  role: [],
})
const dialogVisible = ref(false)

const handleEdit = (row: IUserList) => {
  dialogVisible.value = true
  Object.assign(editData, {
    ...row,
    role: row.role.map((r) => r.role),
  })
}
const handleConfirmEdit = async () => {
  dialogVisible.value = false
  const result = await editUser({
    id: editData.id,
    nickName: editData.nickName,
    role: editData.role,
  })
  result.data.forEach((item) => {
    const user = userList.value.find((u) => item.id === u.id)
    if (user) {
      user.nickName = item.nickName
      user.role = item.role
    }
  })
  await fetchUserList()
  await ElMessage.success(result.message)
}
</script>

<template>
  <div class="user-container">
    <el-form :model="searchData" inline>
      <el-form-item label="昵称">
        <el-input v-model="searchData.nickName" />
      </el-form-item>
      <el-form-item label="权限" class="auth-container">
        <el-select
          v-model="searchData.role"
          placeholder="请选择角色"
          size="large"
        >
          <el-option label="全部" :value="0" />
          <template v-for="role in roleList" :key="role.roleId">
            <el-option :value="role.roleId" :label="role.roleName" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="role" label="权限">
        <template #default="{ row }: { row: IUserList }">
          <el-tag
            v-for="r in row.role"
            :key="r.role"
            type="success"
            size="small"
            class="tag"
          >
            {{ r.roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" width="25%" title="编辑用户">
      <el-form :model="editData">
        <el-form-item label="昵称">
          <el-input v-model="editData.nickName" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editData.role" multiple>
            <template v-for="role in roleList" :key="role.roleId">
              <el-option :value="role.roleId" :label="role.roleName" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmEdit">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
.auth-container {
  width: 200px;
}
</style>

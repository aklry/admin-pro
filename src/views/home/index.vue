<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getProjectItem, getProjectList } from '@/api/project/project'
import { IProjectListItemType } from '@/api/project/type'

const pageInfo = reactive({
  currentPage: 1,
  pageSize: 5,
  total: 0,
})
const searchData = reactive({
  title: '',
  introduce: '',
})
const tableData = ref<IProjectListItemType[]>([])
const fetchTableData = async (pageNum: number = 1, pageSize: number = 5) => {
  const result = await getProjectList({
    pageNum,
    pageSize,
  })
  tableData.value = result.data.list
  pageInfo.total = result.data.total
}
onMounted(() => {
  fetchTableData(pageInfo.currentPage, pageInfo.pageSize)
})

const handleCurrentChange = (val: number) => {
  pageInfo.currentPage = val
  fetchTableData(val, pageInfo.pageSize)
}

const handleSearch = async () => {
  const res = await getProjectItem(searchData.title)
  tableData.value = res.data
}
</script>

<template>
  <div class="home-container">
    <el-form :model="searchData" :inline="true">
      <el-form-item label="名称">
        <el-input v-model="searchData.title" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="title" label="名称" width="180" />
      <el-table-column prop="introduce" label="介绍" />
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        layout="prev, pager, next, jumper"
        :total="pageInfo.total"
        :page-sizes="[5, 10, 15, 20]"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>

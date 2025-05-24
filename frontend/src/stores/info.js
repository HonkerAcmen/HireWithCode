import { CreateInfoAPI, GetAllInfoAPI, SetInfoByGithubIdAPI } from '@/api/info'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import 'element-plus/theme-chalk/el-message.css'
import { ref } from 'vue'
export const useInfoStroe = defineStore('infoStroe', () => {
  const infoDatas = ref([])
  const GetAllInfo = async () => {
    try {
      const res = await GetAllInfoAPI()
      infoDatas.value = res.data
    } catch (error) {
      console.log(error)
      ElMessage.error('获取失败')
    }
  }
  const CreateInfo = async (email, github_id) => {
    try {
      await CreateInfoAPI(email, github_id)
      ElMessage.success('创建成功')
      GetAllInfo()
    } catch (error) {
      console.log(error)
      ElMessage.error('获取失败')
    }
  }

  const SetInfoByGithubId = async (github_id, github_pj_add, project_online_add) => {
    try {
      await SetInfoByGithubIdAPI(github_id, github_pj_add, project_online_add)
      ElMessage.success('提交成功')
      GetAllInfo()
    } catch (error) {
      console.log(error)
      console.log(github_id, github_pj_add, project_online_add)

      ElMessage.error(error.response.data.message)
    }
  }
  return {
    infoDatas,
    GetAllInfo,
    CreateInfo,
    SetInfoByGithubId,
  }
})

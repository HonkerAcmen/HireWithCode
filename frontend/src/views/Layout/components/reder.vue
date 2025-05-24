<template>
  <div class="md-content" v-html="htmlContent"></div>
  <div class="btn">
    <el-button class="sub-btn" size="large" @click="dlAccept = true">接受挑战</el-button>
    <el-button class="sub-btn" size="large" @click="dlComplish = true">完成挑战</el-button>
    <el-button class="sub-btn" size="large" @click="drawer = true"> 查看挑战者 </el-button>
  </div>

  <!-- 挑战者信息填写 -->
  <el-dialog v-model="dlAccept" title="挑战者信息填写" width="600px" :close-on-click-modal="false">
    <el-form ref="formAcceptRef" :model="formAccept" :rules="rulesAccept">
      <el-form-item label="email" prop="email" label-width="80px">
        <el-input v-model="formAccept.email" />
      </el-form-item>
      <el-form-item label="GitHub ID" prop="gitId" label-width="80px">
        <el-input v-model="formAccept.gitId" />
      </el-form-item>
    </el-form>
    <!-- 底部操作区 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dlAccept = false">取 消</el-button>
        <el-button type="primary" @click="handleAcceptConfirm(formAcceptRef)">接受挑战</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 完成者信息填写 -->
  <el-dialog
    v-model="dlComplish"
    title="完成者信息填写"
    width="700px"
    :close-on-click-modal="false"
  >
    <el-form ref="formComplishRef" :model="formComplish" :rules="rulesComplish">
      <el-form-item label="GitHub ID" prop="gitId" label-width="120px">
        <el-input v-model="formComplish.gitId" />
      </el-form-item>
      <el-form-item label="项目GitHub地址" prop="gitUrl" label-width="120px">
        <el-input v-model="formComplish.gitUrl" />
      </el-form-item>
      <el-form-item label="项目在线地址" prop="projectAddress" label-width="120px">
        <el-input v-model="formComplish.projectAddress" />
      </el-form-item>
    </el-form>

    <!-- 底部操作区 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dlComplish = false">取 消</el-button>
        <el-button type="primary" @click="handleComplishConfirm(formComplishRef)"
          >提交作品</el-button
        >
      </div>
    </template>
  </el-dialog>

  <el-drawer v-model="drawer" title="挑战者信息如下" :with-header="true" size="50%">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="email" label="电子邮件" width="180" />
      <el-table-column prop="github_id" label="Github账号" />
      <el-table-column prop="github_pj_add" label="Github项目地址" />
      <el-table-column prop="project_online_add" label="项目在线地址" />
      <template #empty> 还没有人提交 </template>
    </el-table>
  </el-drawer>
</template>

<script setup>
import { marked } from 'marked'
import { ref, onMounted, computed } from 'vue'
const drawer = ref(false)
import { useInfoStroe } from '@/stores/info'
const infoStore = useInfoStroe()
const dlAccept = ref(false)
const dlComplish = ref(false)

const formAcceptRef = ref(null)
const formComplishRef = ref(null)
const formAccept = ref({
  email: '', // 用户的邮箱
  gitId: '', // 用户的github Id
})

const formComplish = ref({
  gitId: '',
  gitUrl: '', // 用户的项目的github地址
  projectAddress: '', // 用户的项目的在线地址
})

const tableData = computed(() => infoStore.infoDatas)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const emailValidator = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('内容不能为空'))
  } else if (!emailRegex.test(value)) {
    callback(new Error('email格式不正确'))
  } else {
    callback()
  }
}
const gitIdVakudator = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('内容不能为空'))
  } else {
    callback()
  }
}
const gitUrlValidator = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('内容不能为空'))
  } else {
    callback()
  }
}
const projectAddressValidator = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('内容不能为空'))
  } else {
    callback()
  }
}

const rulesAccept = ref({
  email: [{ validator: emailValidator, trigger: 'blur' }],
  gitId: [{ validator: gitIdVakudator, trigger: 'blur' }],
})

const rulesComplish = ref({
  gitId: [{ validator: gitIdVakudator, trigger: 'blur' }],
  gitUrl: [{ validator: gitUrlValidator, trigger: 'blur' }],
  projectAddress: [{ validator: projectAddressValidator, trigger: 'blur' }],
})

// 点击确认
const handleAcceptConfirm = (formEl) => {
  if (!formEl) return
  formEl.validate((val) => {
    if (val) {
      infoStore.CreateInfo(formAccept.value.email, formAccept.value.gitId)
      dlAccept.value = false
      formAccept.value.email = ''
      formAccept.value.gitId = ''
    } else {
      console.log('err')
    }
  })
}
const handleComplishConfirm = (formEl) => {
  if (!formEl) return
  formEl.validate((val) => {
    if (val) {
      infoStore.SetInfoByGithubId(
        formComplish.value.gitId,
        formComplish.value.gitUrl,
        formComplish.value.projectAddress,
      )
      dlComplish.value = false
      formComplish.value.gitId = ''
      formComplish.value.gitUrl = ''
      formComplish.value.projectAddress = ''
    } else {
      console.log('err')
    }
  })
}
// 解析md文件的的结果
const htmlContent = ref('')

onMounted(async () => {
  const res = await fetch('/docs/content.md')
  const text = await res.text()
  infoStore.GetAllInfo()

  // 解析
  htmlContent.value = marked(text)
})
</script>

<style lang="scss" scoped>
.md-content {
  padding: 20px;
  line-height: 1.7;
  color: #24292e;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
.md-content h1,
.md-content h2 {
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}

.btn {
  display: flex;
  justify-content: center;
  gap: 40px;
}
</style>

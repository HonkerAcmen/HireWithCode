<template>
  <div class="md-content" v-html="htmlContent"></div>
  <div class="btn">
    <el-button class="sub-btn" size="large" @click="dlAccept = true">接受挑战</el-button>
    <el-button class="sub-btn" size="large" @click="dlComplish = true">完成挑战</el-button>
  </div>

  <el-dialog v-model="dlAccept" title="挑战者信息填写" width="400px" :close-on-click-modal="false">
    <span>这是模态框的内容。</span>

    <!-- 底部操作区 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dlAccept = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dlComplish"
    title="完成者信息填写"
    width="400px"
    :close-on-click-modal="false"
  >
    <span>这是模态框的内容。</span>

    <!-- 底部操作区 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dlComplish = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { marked } from 'marked'
import { ref, onMounted } from 'vue'

const dlAccept = ref(false)
const dlComplish = ref(false)

const handleConfirm = () => {}

// 解析md文件的的结果
const htmlContent = ref('')

onMounted(async () => {
  const res = await fetch('/docs/content.md')
  const text = await res.text()

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
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  column-gap: 40px;
}
</style>

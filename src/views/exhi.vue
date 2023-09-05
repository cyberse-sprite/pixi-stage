<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { NDrawer, NSpace } from 'naive-ui'
import { RouterView } from 'vue-router'
import { ApiGetExhi } from '@/api/exhi';
import { NButton, NResult } from 'naive-ui';
import Exhi from '@/exhi/exhi'
import { useRouter, useRoute } from 'vue-router'
import { usePageStore } from '@/stores/page';
import type { PsExhi } from '@/exhi/define/exhi';

const router = useRouter()
const route = useRoute()
const page = usePageStore()
const exhiid = ref('')
const width = ref(0)

const computedWidth = () => {
  let w = (window.innerWidth - 10)
  if (w > 900) {
    w = 650
  } else if (w > 500) {
    w = 500
  }
  width.value = w
}

window.addEventListener('resize', computedWidth)

onMounted(() => {
  if (!route.query['exhi']) return
  exhiid.value = <string>route.query['exhi']
  ApiGetExhi(route.query['exhi']).then((res) => {
    window.exhi = new Exhi(res as unknown as PsExhi)
    computedWidth()
  })
})

window.callDrawer = (path: string) => {
  router.push(path + `?exhi=${route.query['exhi']}`)
  page.drawer = !page.drawer
}

const enter = () => {
  window.location.href = '/main?exhi=1'
}

const shot = () => {
  window.exhi?.takeScreenshot()
}

</script>

<template>
  <div class="container">
    <div class="top-info">
      <div class="top-title">PixiStage</div>
      <div style="flex: 1;"></div>
      <div style="margin-right: 23px;">
        <n-space>
          <n-button>Github</n-button>
          <n-button @click="shot">截图</n-button>
        </n-space>
      </div>
    </div>
    <div id="stage">
      <n-result status="error" title="参数错误" description="请从正确的链接入口进入" v-if="exhiid == ''">
        <template #footer>
          <n-button @click="enter">本地资源入口</n-button>
        </template>
      </n-result>
    </div>
  </div>
  <n-drawer v-model:show="page.drawer" v-model:width="width">
    <div class="drawer-container">
      <RouterView />
    </div>
  </n-drawer>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#stage {
  flex: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-info {
  display: flex;
  align-items: center;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1)
}

.top-title {
  padding: 10px 20px;
  font-size: large;
  font-weight: bold;
}

.drawer-container {
  min-width: 0;
  max-width: 750px;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}
</style>@/exhi/sokect/socket
<script setup lang="ts">
import { ApiGetUser } from "@/api/exhi";
import { getResUrl } from "@/exhi/design";
import { usePageStore } from "@/stores/page";
import { NAvatar, NButton } from "naive-ui";
import { ref } from 'vue'
import { useRoute } from "vue-router";

const page = usePageStore()
const route = useRoute()

interface User {
    avatar?: string
    nickname?: string
    links?: {
        plat: string
        link: string
    }[],
    intro?: string
}

const data = ref(<User>{})

ApiGetUser(route.params['id']).then((res) => {
    data.value = res as unknown as User
})
</script>

<template>
    <div style="display: flex;flex-direction: column;min-height: 0;height: 100%;">
        <div class="head-back">
            <div style="padding-top: 10px;display: flex; justify-content: end;">
                <n-button @click="page.drawer = false" color="#fff" ghost style="margin-right: 10px;">
                    关闭
                </n-button>
            </div>
            <div class="head-content">
                <div class="avatar-box">
                    <n-avatar :src="getResUrl(`${data.avatar}`)" :size="128" style="border:1px #eee solid" round></n-avatar>
                </div>
                <div class="head-text">
                    <div style="font-size: large;color: #fff;">
                        {{ data.nickname }}
                    </div>
                    <div style="color: rgba(255, 255, 255, 0.8);">
                        {{ data.intro }}
                    </div>
                </div>
            </div>
        </div>
        <div style="flex: 1;min-height: 0;overflow-y: auto;">
            <div v-for="item in data.links" class="link-item">
                <a :href="item.link" target="_blank">
                    <div style="font-size: large;color: #222;">{{ item.plat }}</div>
                    <div style="color: #888;">{{ item.link }}</div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.link-item {
    margin: 5px;
    padding: 10px 60px;
    border-bottom: 1px #eee solid;
}

.avatar-box {
    margin-left: 64px;
}

.link-item:hover {
    background-color: #eef5fe;
    border-radius: 5px;
    border-bottom: 1px #fff solid;
}

.link-item>a {
    color: #000;
    text-decoration: none;
}

.head-back {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(130deg,
            hsl(181deg 48% 72%) 0%,
            hsl(194deg 74% 67%) 7%,
            hsl(205deg 91% 68%) 16%,
            hsl(227deg 88% 75%) 26%,
            hsl(279deg 59% 68%) 42%,
            hsl(324deg 72% 61%) 66%,
            hsl(344deg 84% 56%) 100%);
    padding-bottom: 32px;
}

.head-content {
    width: 100%;
    display: flex;
}

.head-text {
    margin-left: 32px;
    margin-right: 64px;
    flex: 1;
}

@media (max-width:450px) {
    .link-item {
        padding: 10px 10px;
    }

    .avatar-box {
        margin: 0;
        margin-right: 24px;
        margin-bottom: 10px;
    }

    .head-content {
        flex-direction: column;
        align-items: center;
    }

    .head-text {
        margin: 0;
        padding-left: 32px;
        padding-right: 32px;
        width: 100%;
    }
}
</style>
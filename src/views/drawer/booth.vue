<script setup lang="ts">
import { ApiGetBooth } from "@/api/exhi";
import { usePageStore } from "@/stores/page";
import { NButton, NImage } from "naive-ui";
import { ref } from 'vue'

const page = usePageStore()

interface User {
    pos?: string
    avatar?: string
    title?: string
    items?: {
        title: string
        intro: string
        link: string
        img: string
    }[],
    intro?: string
}

const data = ref(<User>{})

ApiGetBooth(1).then((res) => {
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
                    <div class="pos">
                        {{ data.pos }}
                    </div>
                </div>
                <div class="head-text">
                    <div style="font-size: large;color: #fff;">
                        {{ data.title }}
                    </div>
                    <div style="color: rgba(255, 255, 255, 0.8);">
                        {{ data.intro }}
                    </div>
                </div>
            </div>
        </div>
        <div style="flex: 1;min-height: 0;overflow-y: auto;">
            <div v-for="item in data.items" class="link-item">
                <a :href="item.link" target="_blank">
                    <div class="item-box">
                        <div style="margin-right: 16px;" v-if="item.img">
                            <n-image :src="item.img" object-fit="contain" width="160" height="160"></n-image>
                        </div>
                        <div class="item-text">
                            <div style="font-size: large;color: #222;">{{ item.title }}</div>
                            <div style="color: #888;">{{ item.link }}</div>
                            <div style="color: #222;">{{ item.intro }}</div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.link-item {
    margin: 5px;
    padding: 10px 30px;
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

.pos {
    width: 128px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    color: #fff;
    font-size: x-large;
    border: 1px #fff solid;
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

.item-box {
    display: flex;
}

@media (max-width:450px) {
    .link-item {
        padding: 10px 10px;
    }

    .item-text {
        width: 100%;
    }

    .item-box {
        flex-direction: column;
        align-items: center;
        width: 100%;
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
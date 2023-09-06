import axios from 'axios'

import { computed, ref } from 'vue'
import {
    createDiscreteApi,
    type ConfigProviderProps,
    darkTheme,
    lightTheme
} from 'naive-ui'

const themeRef = ref<'light' | 'dark'>('light')
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    theme: themeRef.value === 'light' ? lightTheme : darkTheme
}))

const { message } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
        configProviderProps: configProviderPropsRef
    }
)

const instance = axios.create({
    baseURL: '/pixi-stage/api/',
    timeout: 5000
});

instance.interceptors.response.use(
    (res) => {
        if (res.data.success) {
            if (res.data.message != '') {
                message.success(res.data.message)
            }
            return res.data.data
        } else {
            if (res.data.message != '') {
                message.error(res.data.message)
            }
            return false
        }
    },
    (error) => {
        if (error)
            message.error(error.message)
        return Promise.reject(error);
    }
)

export default instance
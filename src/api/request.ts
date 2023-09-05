import axios from 'axios'
import { createDiscreteApi } from 'naive-ui'

const message = createDiscreteApi(['message'])

const instance = axios.create({
    baseURL: '/api/',
    timeout: 5000
});

instance.interceptors.response.use(
    (res) => {
        if (res.data.success) {
            if (res.data.message != '') {
                //@ts-ignore
                message.success(res.data.message)
            }
            return res.data.data
        } else {
            if (res.data.message != '') {
                //@ts-ignore
                message.error(res.data.message)
            }
            return false
        }
    },
    (error) => {
        //@ts-ignore
        message.error(error)
    }
)

export default instance
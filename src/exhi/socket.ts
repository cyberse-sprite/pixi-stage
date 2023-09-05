const writeToScreen = (massage: any) => {
    console.log(massage);
}

export default class Socket {
    wsObj: WebSocket | null = null
    wsUrl: string
    lockReconnect = false
    wsCreateHandler: any
    successCallback: any
    messageCallback: any
    errorCallback: any

    constructor(url: string, successCallback: (e: any) => void, messageCallback: (data: any) => void, errCallback: (e: any) => void) {
        this.wsUrl = url
        if (typeof (WebSocket) === 'undefined') {
            writeToScreen("您的浏览器不支持WebSocket，无法获取数据")
            return
        }
        this.successCallback = successCallback
        this.messageCallback = messageCallback
        this.errorCallback = errCallback
        this.createWebSocket()
    }

    createWebSocket() {
        try {
            this.wsObj = new WebSocket(this.wsUrl)

            this.wsObj.onopen = (event) => {
                this.onWsOpen(event)
            }

            this.wsObj.onmessage = (event) => {
                this.onWsMessage(event);
            }

            this.wsObj.onclose = (event) => {
                this.onWsClose(event);
            }

            this.wsObj.onerror = (event) => {
                this.onWsError(event);
                this.reconnect();
            }

        } catch (e) {
            writeToScreen("连接异常，开始重连")
            this.reconnect()
        }
    }

    onWsOpen = (event: any) => {
        if (!this.wsObj) return
        writeToScreen('CONNECT');
        if (this.wsObj.readyState === this.wsObj.OPEN) {
            this.successCallback(event)
        }
        if (this.wsObj.readyState === this.wsObj.CLOSED) {
            writeToScreen('连接异常，开始重连');
            this.reconnect();
        }
    }

    onWsMessage = (event: any) => {
        this.messageCallback(JSON.parse(event.data));
    }

    onWsClose = (event: any) => {
        writeToScreen('DISCONNECT');
        if (event && event.code !== 1000) {
            writeToScreen('非正常关闭');
            this.errorCallback(event);
            this.reconnect();
        }
    }
    onWsError = (event: any) => {
        this.errorCallback(event);
    }

    reconnect = () => {
        if (this.lockReconnect) {
            return;
        }
        writeToScreen('3秒后重连');
        this.lockReconnect = true;
        // 没连接上会一直重连，设置延迟避免请求过多
        this.wsCreateHandler && clearTimeout(this.wsCreateHandler);
        this.wsCreateHandler = setTimeout(() => {
            writeToScreen('重连...' + this.wsUrl);
            this.createWebSocket()
            this.lockReconnect = false;
            writeToScreen('重连完成');
        }, 3000);
    }

    closeWebsocket = (handle: any) => {
        if (this.wsObj) {
            handle && handle()
            writeToScreen('手动离线');
            this.wsObj.close()
            // wsObj.onclose()
            // 关闭重连
            this.lockReconnect = true;
            this.wsCreateHandler && clearTimeout(this.wsCreateHandler);
        }
    }

    isConnected() {
        if (this.wsObj)
            if (this.wsObj.readyState === this.wsObj.OPEN) return true
        return false
    }

    send(mess: any) {
        if (this.wsObj)
            this.wsObj.send(JSON.stringify(mess))
    }
}
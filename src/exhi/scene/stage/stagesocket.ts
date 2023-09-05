
import type SceneStage from "./SceneStage";
import Socket from "../../socket";

export default class StageSocket {
    stage: SceneStage
    socket: Socket | null = null
    constructor(stage: SceneStage) {
        this.stage = stage
    }
    clickConnect() {
        if (this.socket?.isConnected()) {
            this.socket.closeWebsocket(() => { this.sendClose() })
            this.stage.outline()
        } else {
            this.socket = new Socket(
                this.stage.map.data.api,
                () => { this.sendEnter() },
                (data: any) => { this.handleMessage(data) },
                () => { }
            )
        }
    }
    isConnected() {
        if (this.socket) {
            return this.socket.isConnected()
        }
        return false
    }
    sendEnter() {
        this.socket?.send({
            type: 4,
            id: this.stage.exhi.id,
            nickname: this.stage.map.player.tag,
            src: this.stage.map.player.src,
            x: Math.round(this.stage.map.player.x),
            y: Math.round(this.stage.map.player.y),
            direction: this.stage.map.player.direction
        })
    }
    sendClose() {
        this.socket?.send({
            type: 5,
            id: this.stage.exhi.id,
        })
    }
    sendPop() {
        this.socket?.send({
            type: 6,
            id: this.stage.exhi.id,
            content: this.stage.input.value
        })
    }
    sendMove(x: number, y: number) {
        this.socket?.send({
            type: 7,
            id: this.stage.exhi.id,
            x: x,
            y: y,
            direction: this.stage.map.player.direction
        })
    }
    handleInit(data: any) {
        this.stage.map.players.handleInit(data)
        this.stage.online()
    }
    handleEnter(data: any) {
        this.stage.map.players.handleEnter(data)
    }
    handleMove(data: any) {
        this.stage.map.players.handleMove(data)
    }
    handlePop(data: any) {
        this.stage.map.players.handlePop(data)
    }
    handleExit(data: any) {
        this.stage.map.players.handleExit(data)
    }
    handleMessage(data: any) {
        if (data.type)
            switch (data.type) {
                case 4:
                    this.handleEnter(data)
                    break
                case 5:
                    this.handleExit(data)
                    break
                case 6:
                    this.handlePop(data)
                    break
                case 7:
                    this.handleMove(data)
                    break
                case 14:
                    this.handleInit(data)
                    break
                case 16:
                    this.stage.map.player.speak(data.content)
                    break;
            }
    }
}
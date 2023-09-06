import Charactor from "@/exhi/charactor"
import type Exhi from "@/exhi/exhi"
import { Container } from "pixi.js"
import type SceneStage from "../SceneStage"

export default class MapPlayers {
    players: { [index: string]: Charactor } = {}
    tickers: { [index: string]: (d: number) => void } = {}
    timers: { [index: string]: string | number | NodeJS.Timeout | undefined } = {}

    layer: Container
    exhi: Exhi
    stage: SceneStage

    constructor(exhi: Exhi, stage: SceneStage, layer: Container) {
        this.layer = layer
        this.exhi = exhi
        this.stage = stage
    }

    handleEnter(data: any) {
        this.players[data.id] = new Charactor(data.nickname)
        this.players[data.id].x = data.x
        this.players[data.id].y = data.y
        this.players[data.id].updateZ()
        this.layer.addChild(this.players[data.id])
        if (this.exhi.sheets[data.src]) {
            this.players[data.id].load(this.exhi.sheets[data.src])
            this.players[data.id].setDirect(data.direction)
        } else {
            this.exhi.loadSheets([data.src]).then(() => {
                this.players[data.id].load(this.exhi.sheets[data.src])
                this.players[data.id].setDirect(data.direction)
            })
        }
    }
    handleExit(data: any) {
        this.layer.removeChild(this.players[data.id])
        delete this.players[data.id]
    }
    handlePop(data: any) {
        if (this.players[data.id]) {
            this.players[data.id].speak(data.content)
        }
    }
    handleMove(data: any) {
        const clear = () => {
            //如果这个角色已经有动画了先取消
            if (this.tickers[data.id]) {
                this.exhi.app.ticker.remove(this.tickers[data.id])
                delete this.tickers[data.id]
            }
            if (this.timers[data.id]) {
                clearTimeout(this.timers[data.id])
                delete this.timers[data.id]
            }
        }
        clear()
        const getDirection = (dn: number) => {
            if (dn > 0) {
                return 1
            } else if (dn < 0) {
                return -1
            }
            return 0
        }
        //直接得到方向
        this.players[data.id].setDirect(data.direction)
        //计算方向方案，可能不太实用
        // const dx = data.x - this.players[data.id].x
        // const dy = data.y - this.players[data.id].y
        // if (Math.abs(dx) > Math.abs(dy)) {
        //     if (dx > 0) {
        //         this.players[data.id].setDirect('right')
        //     } else {
        //         this.players[data.id].setDirect('left')
        //     }
        // } else {
        //     if (dy > 0) {
        //         this.players[data.id].setDirect('down')
        //     } else {
        //         this.players[data.id].setDirect('up')
        //     }
        // }
        const endMove = () => {
            clear()
            this.players[data.id].anime?.gotoAndStop(1)
            this.players[data.id].x = data.x
            this.players[data.id].y = data.y
            this.players[data.id].updateZ()
        }
        const move = (p: number) => {
            const dx = data.x - this.players[data.id].x
            const dy = data.y - this.players[data.id].y
            const ps = p * this.stage.map.speed
            if (dx * dx + dy * dy < 4) {
                endMove()
            }
            //console.log(dx, dy, this.players[data.id].x, this.players[data.id].y, data.x, data.y)
            const mx = ps * getDirection(dx)
            const my = ps * getDirection(dy)
            if (Math.abs(dx) > Math.abs(dy)) {
                if (mx != 0)
                    this.players[data.id].x += mx
            } else {
                if (my != 0) {
                    this.players[data.id].y += my
                    this.players[data.id].updateZ()
                }
            }
        }
        if (this.players[data.id]) {
            this.tickers[data.id] = move
            this.exhi.app.ticker.add(move)
            this.players[data.id].anime?.play()
            this.timers[data.id] = setTimeout(() => {
                endMove()
            }, 3000);
        }
    }
    clearPlayers() {
        for (var i in this.players) {
            this.layer.removeChild(this.players[i])
        }
        this.players = {}
    }
    handleInit(data: any) {
        this.players = {}
        if (data.players) {
            if (data.players.length > 0) {
                for (let item of data.players) {
                    this.handleEnter(item)
                }
            }
        }
    }
}
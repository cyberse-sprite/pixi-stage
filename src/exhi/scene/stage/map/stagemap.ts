import { Assets, Container, Sprite } from "pixi.js";
import type Exhi from "../../../exhi";
import type { PsMap } from "../../../define/map";
import type Player from "../../../player";
import MapAccess from "./mapaccess";
import MapEvent from "./mapevent";
import { abh, abw, getResUrl } from "../../../design";
import type SceneStage from "../SceneStage";
import MapPlayers from "./mapplayers";

export default class StageMap extends Container {
    exhi: Exhi
    stage: SceneStage
    data: PsMap
    player: Player
    players: MapPlayers

    layer = [
        new Container(),
        new Container(),
        new Container()
    ]

    speed = 6
    keyDownListener: any
    keyUpListener: any
    inputing = false

    access: MapAccess | null = null
    events: MapEvent

    constructor(exhi: Exhi, player: Player, data: PsMap, stage: SceneStage) {
        super()
        this.exhi = exhi
        this.stage = stage
        this.zIndex = 1
        this.player = player
        this.data = data
        this.players = new MapPlayers(exhi, stage, this.layer[1])

        this.addChild(this.layer[0])
        this.addChild(this.layer[1])
        this.addChild(this.layer[2])
        this.layer[1].sortableChildren = true
        this.events = new MapEvent(this, data.events)

        this.loadMaterials().then(() => {
            this.player.x = this.data.birth[0]
            this.player.y = this.data.birth[1]
            this.player.updateZ()
            this.layer[1].addChild(this.player)
            const nx = -this.player.x + abw / 2
            const ny = -this.player.y + abh / 2
            if (nx > 0) {
                this.x = 0
            } else if (nx < -this.layer[0].width + abw) {
                this.x = -this.layer[0].width + abw
            } else {
                this.x = nx
            }
            if (ny > 0) {
                this.y = 0
            } else if (ny < -this.layer[0].height + abh) {
                this.y = -this.layer[0].height + abh
            } else {
                this.y = ny
            }
            exhi.cancelLoading()
            this.access = new MapAccess(this.layer[0].width, this.layer[0].height)
            for (let item of this.data.materials) {
                if (item.access)
                    this.access.load(item.access, item.pos[0], item.pos[1])
            }
            this.setControllable()
            exhi.cancelLoading()
        })
    }
    async loadMaterials() {
        for (let item of this.data.materials) {
            const ma = await Assets.load(getResUrl(item.src))
            const target = Sprite.from(ma)
            target.x = item.pos[0]
            target.y = item.pos[1]
            this.layer[item.layer].addChild(target)
            if (item.layer == 1) {
                target.anchor.set(0.5, 1)
                target.zIndex = target.y
            }
        }
    }
    setControllable() {
        let direction = [0, 0]
        const move = (d: number) => {
            const x = this.x + (this.speed * d) * direction[0] * -1
            const y = this.y + (this.speed * d) * direction[1] * -1
            const px = this.player.x + (this.speed * d) * direction[0]
            const py = this.player.y + (this.speed * d) * direction[1]
            if (!this.access?.isAccess(px + this.player.box[0] / 2 * direction[0], py - (direction[1] == -1 ? this.player.box[1] : 0))) return
            if (x < 0 && x > -this.layer[0].width + abw && px < this.layer[0].width - abw / 2 && px > abw / 2) {
                this.x = x
            }
            if (y < 0 && y > -this.layer[0].height + abh && py < this.layer[0].height - abh / 2 && py > abh / 2) {
                this.y = y
            }
            if (px > 0 && px < this.layer[0].width) {
                this.player.x = px
            }
            if (py > 0 && py < this.layer[0].height) {
                this.player.y = py
                this.player.updateZ()
            }
            this.events.ifEvent(this.player.x, this.player.y)
        }
        const keyToMove = (range: Array<string>, key: string, d: string, group: [number, number]) => {
            if (range.includes(key)) {
                this.player.setDirect(d)
                direction = group
                this.player.anime?.play()
                this.exhi.app.ticker.add(move)
                return true
            }
            return false
        }
        this.keyDownListener = (ev: KeyboardEvent) => {
            if (this.inputing) return
            if (!this.player.moving) {
                this.player.moving = true
                if (!keyToMove(['a', 'A', 'ArrowLeft'], ev.key, 'left', [-1, 0]))
                    if (!keyToMove(['d', 'D', 'ArrowRight'], ev.key, 'right', [1, 0]))
                        if (!keyToMove(['w', 'W', 'ArrowUp'], ev.key, 'up', [0, -1]))
                            keyToMove(['s', 'S', 'ArrowDown'], ev.key, 'down', [0, 1])
            }
        }
        this.keyUpListener = (ev: KeyboardEvent) => {
            if (this.inputing) return
            this.exhi.app.ticker.remove(move)
            this.player.moving = false
            this.player.anime?.gotoAndStop(1)
            this.player.x = Math.round(this.player.x)
            this.player.y = Math.round(this.player.y)
            this.player.updateZ()
            this.x = Math.round(this.x)
            this.y = Math.round(this.y)
            if (this.stage.socket.isConnected()) {
                this.stage.socket.sendMove(this.player.x, this.player.y)
            }
        }
        window.addEventListener('keydown', this.keyDownListener)
        window.addEventListener('keyup', this.keyUpListener)
    }

}
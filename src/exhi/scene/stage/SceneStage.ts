import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import type Exhi from "../../exhi";
import type Player from "../../player";
import Scene from "../Scene";
import type { PsMap } from "../../define/map";
import { FancyButton, Input } from "@pixi/ui";
import Dialog from "../../dialog";
import StageMap from "./map/stagemap";
import { abh, abw, backBox, backButton, isTouchDevice, style } from "../../design";
import imgShot from '@/assets/screenshot-2-fill.png'
import StageSocket from "./stagesocket";
import { message } from "@/exhi/message";

export default class SceneStage extends Scene {
    map: StageMap
    ui = new Container()
    input = new Input({
        bg: backBox(384, 72),
        textStyle: style,
        padding: 10
    })
    pop = new FancyButton({
        defaultView: backBox(72, 72),
        text: new Text('气泡', style)
    })
    dialog: Dialog

    onlineButton = backButton({
        icon: new Graphics().beginFill(0xaaaaaa).drawCircle(-30, 8, 6),
        w: 128,
        h: 72,
        text: '本地'
    })

    shotButton = backButton({
        w: 72,
        h: 72
    })

    directCon = new Container()

    directButtons = [
        backButton({ w: 72, h: 72, text: '←', x: 0, y: 84 }),
        backButton({ w: 72, h: 72, text: '→', x: 168, y: 84 }),
        backButton({ w: 72, h: 72, text: '↑', x: 84, y: 0 }),
        backButton({ w: 72, h: 72, text: '↓', x: 84, y: 84 })
    ]

    socket = new StageSocket(this)
    constructor(exhi: Exhi, player: Player, data: PsMap) {
        super(exhi)
        this.map = new StageMap(exhi, player, data, this)
        this.addChild(this.map)
        this.input.x = 12
        this.input.y = abh - 72 - 12
        this.ui.addChild(this.input)
        this.pop.x = 400
        this.pop.y = abh - 72 - 12
        this.pop.onPress.connect(() => {
            this.pressPop()
        })
        this.ui.addChild(this.pop)
        this.addChild(this.ui)

        this.dialog = new Dialog(this.exhi, this)
        this.addChild(this.dialog)
        let _this = this
        this.input.onclick = () => {
            _this.map.inputing = true
        }
        this.input.onEnter.connect(() => {
            _this.map.inputing = false
        })

        this.onlineButton.x = 12
        this.onlineButton.y = 12
        if (data.api) {
            this.onlineButton.onPress.connect(() => {
                this.socket.clickConnect()
            })
            this.outline()
        } else {
            this.onlineButton.onPress.connect(() => {
                message(this.exhi,'本地图未指定服务接口，仅支持离线模式')
            })
        }

        this.shotButton.x = 12 + 128 + 12
        this.shotButton.y = 12
        this.shotButton.onPress.connect(() => {
            this.hidePanel()
            exhi.takeScreenshot().then(() => {
                this.showPanel()
            })
        })
        Assets.load(imgShot).then(() => {
            this.shotButton.iconView = Sprite.from(imgShot)
        })

        for (let item of this.directButtons) {
            this.directCon.addChild(item)
        }
        this.directCon.x = abw - 12 - this.directCon.width
        this.directCon.y = abh - 12 - this.directCon.height

        if (isTouchDevice()) {
            const keyevent = (key: string, down: boolean) => {
                const event = new Event(down ? 'keydown' : 'keyup')
                //@ts-ignore
                event.key = key
                window.dispatchEvent(event)
            }

            const keys = ['a', 'd', 'w', 's']

            for (let i = 0; i < 4; i++) {
                this.directButtons[i].onDown.connect(() => {
                    keyevent(keys[i], true)
                })
                this.directButtons[i].onUp.connect(() => {
                    keyevent(keys[i], false)
                })
            }

            this.ui.addChild(this.directCon)
        }

        this.ui.addChild(this.onlineButton, this.shotButton)
    }
    pressPop() {
        if (this.socket.isConnected()) {
            this.socket.sendPop()
        } else {
            this.map.player.speak(this.input.value)
        }
        this.input.value = ""
    }
    showPanel() {
        this.ui.visible = true
        this.map.events.layer.visible = true
    }
    hidePanel() {
        this.ui.visible = false
        this.map.events.layer.visible = false
    }
    online() {
        this.onlineButton.text = "在线"
        this.onlineButton.iconView = new Graphics().beginFill(0x00ff00).drawCircle(-30, 8, 6)
    }
    outline() {
        this.onlineButton.text = "离线"
        this.onlineButton.iconView = new Graphics().beginFill(0xaaaaaa).drawCircle(-30, 8, 6)
        this.map.players.clearPlayers()
    }
}
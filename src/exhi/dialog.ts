import { Container, Text } from "pixi.js"
import type Exhi from "./exhi"
import { ApiGetScript } from "@/api/exhi"
import type SceneStage from "./scene/stage/SceneStage"
import { abh, abw, backBox, dialogStyle, style } from "./design"

export default class Dialog extends Container {
    exhi: Exhi
    stage: SceneStage
    dialog = backBox(840, 160)
    nameFrame = backBox(240, 64)
    nameSprite = new Text('', style)
    content = new Text('', dialogStyle)
    tag = 0
    cur = 0
    timeSlot = 0
    listener: any
    script = <any[]>[]
    constructor(exhi: Exhi, stage: SceneStage) {
        super()
        this.exhi = exhi
        this.stage = stage
        this.visible = false
        this.dialog.x = (abw - 840) / 2
        this.dialog.y = abh - 160 - 20
        this.nameFrame.x = (abw - 840) / 2
        this.nameFrame.y = abh - 160 - 20 - 72
        this.nameSprite.x = this.nameFrame.width / 2
        this.nameSprite.y = this.nameFrame.height / 2
        this.nameSprite.anchor.set(0.5, 0.5)
        this.content.x = 60
        this.content.y = 24
        this.addChild(this.dialog, this.nameFrame)
        this.nameFrame.addChild(this.nameSprite)
        this.dialog.addChild(this.content)
    }
    load(src: any) {
        const _this = this
        ApiGetScript(src).then((res) => {
            _this.script = res as unknown as Array<any>
            _this.nameSprite.text = ''
            _this.content.text = ''
            _this.timeSlot = 0
            _this.tag = 0
            _this.cur = 0
            _this.visible = true
            _this.start()
        })
    }
    start() {
        this.stage.hidePanel()
        const _this = this
        _this.listener = () => {
            if (_this.cur < _this.t().length) {
                _this.content.text = _this.t()
                _this.cur = _this.t().length
                finishiText()
            } else {
                _this.cur = 0
                _this.timeSlot = 0
                _this.content.text = ''
                _this.tag += 1
                if (_this.tag < _this.script.length) {
                    _this.exhi.app.ticker.add(play)
                } else {
                    _this.visible = false
                    _this.stage.showPanel()
                    if (stage) {
                        stage.removeEventListener('click', _this.listener)
                        stage.removeEventListener('touchend', _this.listener)
                    }

                }
            }
        }
        const stage = document.getElementById('stage')
        if (stage) {
            stage.addEventListener('click', _this.listener)
            stage.addEventListener('touchend', _this.listener)
        }

        const finishiText = () => {
            _this.exhi.app.ticker.remove(play)
            _this.content.text = this.script[this.tag]['text']
        }
        const play = (d: number) => {
            if (_this.cur == 0) {
                if (_this.script[_this.tag]['name']) {
                    _this.nameSprite.text = this.script[this.tag]['name']
                    _this.nameFrame.visible = true
                } else {
                    _this.nameFrame.visible = false
                }
            }
            if (_this.cur < _this.t().length) {
                _this.timeSlot += 2 * d
                if (_this.timeSlot >= 5) {
                    _this.timeSlot = 0
                    _this.content.text += _this.t()[_this.cur]
                    _this.cur += 1
                }
            } else {
                finishiText()
            }
        }
        this.exhi.app.ticker.add(play)
    }
    t() {
        return this.script[this.tag]['text']
    }
}
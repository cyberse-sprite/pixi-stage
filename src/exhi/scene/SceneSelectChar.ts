import type Exhi from "../exhi";
import Scene from "./Scene";
import { Input } from "@pixi/ui";
import Charactor from "../charactor";
import Player from "../player";

import SceneSelectMap from "./SceneSelectMap";
import { abh, abw, backBox, backButton, isTouchDevice, style } from "../design";
import { message } from "../message";

export default class SceneSelectChar extends Scene {
    constructor(exhi: Exhi) {
        super(exhi)
        const input = new Input({
            bg: backBox(512, 72),
            placeholder: '请输入昵称',
            textStyle: style,
            padding: 10
        });
        input.x = (abw - input.width) / 2
        input.y = 100

        this.addChild(input)

        let x = (abw - 144 * 4 - 132) / 2
        let y = (abh - 144 * 2) / 2

        if (!isTouchDevice()) {
            const inputfun = () => {
                const value = prompt("请输入昵称", "")
                if (value)
                    input.value = value
            }
            input.addEventListener('click', inputfun)
        }

        exhi.loadSheets(exhi.data.charactors).then(() => {
            let index = 0
            for (let p in exhi.sheets) {
                const st = new Charactor()
                st.load(exhi.sheets[p])
                st.anime?.anchor.set(0, 0)
                const button = backButton({
                    icon: st,
                    w: 138,
                    h: 138
                })
                button.x = x + (index % 5) * 144
                button.y = y + Math.floor(index / 5) * 144
                button.onPress.connect(() => {
                    if (input.value.length < 1) {
                        message(this.exhi, '昵称过短，请重新输入')
                        return
                    } else if (input.value.length > 10) {
                        message(this.exhi, '昵称过长，请重新输入')
                        return
                    }
                    exhi.loading.visible = true
                    const player = new Player(input.value, exhi.sheets[p])
                    player.src = p
                    player.setName()
                    exhi.loadScene(new SceneSelectMap(exhi, player))
                })
                button.onHover.connect(() => {
                    st.anime?.play()
                })
                button.onOut.connect(() => {
                    st.anime?.gotoAndStop(1)
                })
                this.addChild(button)
                index++
            }
            exhi.loading.visible = false
        })
    }
}
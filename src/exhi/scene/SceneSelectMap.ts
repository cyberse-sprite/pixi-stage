import { Container, Text } from "pixi.js";
import type Exhi from "../exhi";
import Scene from "./Scene";
import { FancyButton } from "@pixi/ui";
import Player from '../player'
import { ApiGetMap } from "@/api/exhi";
import SceneStage from "./stage/SceneStage";
import type { PsMap } from "../define/map";
import { abh, abw, backBox, backButton, style } from "../design";

export default class SceneSelectMap extends Scene {
    constructor(exhi: Exhi, player: Player) {
        super(exhi)
        let x = 0
        let y = 0
        let index = 0
        const con = new Container()
        for (let item of exhi.data.maps) {
            const button = backButton({
                text:item.text, w:192, h:96
            })
            button.onPress.connect(() => {
                exhi.loading.visible = true
                ApiGetMap(item.src).then((res) => {
                    exhi.loadScene(new SceneStage(exhi, player, res as unknown as PsMap))
                })
            })
            con.addChild(button)
            button.x = x + (index % 3 * 240)
            button.y = y + (Math.floor(index / 3) * 240)
            index++
        }
        con.x = (abw - con.width) / 2
        con.y = (abh - con.height) / 2
        this.addChild(con)
        exhi.loading.visible = false
    }
}
import { Container, Text, TextStyle } from "pixi.js";
import type Exhi from "../exhi";
import Scene from "./Scene";
import { ScrollBox } from "@pixi/ui";
import SceneSelectChar from "./SceneSelectChar";
import { abh, abw, backButton } from "../design";

export default class SceneStart extends Scene {
    constructor(exhi: Exhi) {
        super(exhi)
        const title = new Text(exhi.data.title, new TextStyle({
            fontSize: 48
        }))
        title.x = 40
        title.y = 20
        this.addChild(title)
        const button = backButton({
            text: "确认并开始",
            w: abw / 2 - 60,
            h: 128
        })
        const con = new Container()
        const text = new Text(exhi.data.rule, new TextStyle({
            fontFamily: 'Cubic',
            fill: "#444",
            wordWrap: true,
            wordWrapWidth: abw / 2 - 60,
            breakWords: true,
            lineHeight: 42,
            letterSpacing: 1
        }))
        con.addChild(text)
        button.y = text.height
        con.addChild(button)
        const box = new ScrollBox({
            background: '#eee',
            radius: 5,
            width: abw / 2 - 20,
            height: abh - 40,
            padding: 20,
            items: [
                con
            ]
        })
        button.onPress.connect(() => {
            exhi.loading.visible = true
            exhi.loadScene(new SceneSelectChar(exhi))
        })
        this.addChild(box)
        box.x = abw / 2
        box.y = 20
        const intro = new Text(exhi.data.intro, new TextStyle({
            wordWrap: true,
            wordWrapWidth: abw / 2 - 60,
            breakWords: true,
            lineHeight: 42,
            letterSpacing: 1
        }))
        intro.x = 40
        intro.y = abh - 25
        intro.anchor.set(0, 1)
        this.addChild(intro)
        exhi.loading.visible = false
    }
}
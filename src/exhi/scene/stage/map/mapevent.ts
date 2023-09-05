import { Container, Text } from "pixi.js";
import type { PsEvent, PsEventItem } from "../../../define/map";
import type StageMap from "./stagemap";
import { abh, abw, backBox, backButton, isTouchDevice, style } from "../../../design";

export default class MapEvent {
    events: Array<PsEvent>
    map: StageMap
    layer = new Container()

    constructor(map: StageMap, events: Array<PsEvent>) {
        this.events = events
        this.map = map
        this.layer.visible = false
    }
    ifEvent(x: number, y: number) {
        for (let item of this.events) {
            if (x > item.trigger.area[0])
                if (y > item.trigger.area[1])
                    if (x < item.trigger.area[2])
                        if (y < item.trigger.area[3]) {
                            this.eventOn(item.content, item.title)
                            return true
                        }
        }
        this.eventOff()
        return false
    }
    eventOn(items: PsEventItem[], title: string) {
        if (!this.layer.parent) {
            this.map.parent.addChild(this.layer)
        }
        this.layer.removeChildren()
        const con = new Container()
        const titleback = backBox(192, 72)
        const titletext = new Text(title, style)
        titletext.anchor.set(0.5, 0.5)
        titletext.x = titleback.width / 2
        titletext.y = titleback.height / 2
        titleback.addChild(titletext)
        con.addChild(titleback)
        let y = 84
        for (let item of items) {
            const button = backButton({
                text: item.text, w: 192, h: 72
            })
            button.onPress.connect(() => {
                eval(item.onclick)
            })
            button.x = 0
            button.y = y
            con.addChild(button)
            y += 84
        }
        con.x = abw - 20 - 192
        con.y = (abh - con.height - (isTouchDevice() ? 168 : 0)) / 2
        this.layer.addChild(con)
        this.layer.visible = true
    }
    eventOff() {
        this.layer.removeChildren()
    }
}
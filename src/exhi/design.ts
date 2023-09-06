import { FancyButton, type ButtonOptions } from "@pixi/ui";
import { Graphics, Text } from "pixi.js"
import { TextStyle } from "pixi.js";

export const abw = 1024
export const abh = 768
export const unit = 64

export function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}

export const getResUrl = (str: string) => {
    if (import.meta.env.VITE_RES_URL) {
        if (str.length > 0 && str[0] == '/' && (str.length > 1 ? (str[1] != '/') : true)) {
            const path = `${import.meta.env.VITE_RES_URL}${str}`
            console.log(path)
            return path
        }
    }
    return str
}

export const backBox = (w?: number, h?: number) => {
    const g = new Graphics().lineStyle(2, 0xeeeeee, 1).beginFill(0x000000, 0.8)
    if (w && h)
        return g.drawRoundedRect(0, 0, w, h, 5)
    else
        return g
}

export const backColor = 0x1099bb

export const style = new TextStyle({
    fontFamily: 'Cubic',
    fill: 0xeeeeee,
    fontSize: 24,
})

export const popStyle = new TextStyle({
    fontFamily: 'Cubic',
    fill: 0xeeeeee,
    fontSize: 24,
    wordWrap: true,
    wordWrapWidth: 360,
    breakWords: true,
    stroke: 0x555555,
    strokeThickness: 3
})

export const dialogStyle = new TextStyle({
    fontFamily: 'Cubic',
    fill: 0xeeeeee,
    fontSize: 24,
    wordWrap: true,
    wordWrapWidth: 720,
    breakWords: true,
});

export const backButton = (data: {
    text?: string, w?: number, h?: number, icon?: any, x?: number, y?: number
}) => {
    const g = backBox(data.w, data.h)
    let config: ButtonOptions = {
        defaultView: g
    }
    if (data.icon) {
        config.icon = data.icon
    }
    if (data.text) {
        config.text = new Text(data.text, style)
    }
    const button = new FancyButton(config)
    button.onHover.connect(() => {
        button.alpha = 1
    })
    button.onOut.connect(() => {
        button.alpha = 0.8
    })
    if (data.x) {
        button.x = data.x
    }
    if (data.y) {
        button.y = data.y
    }
    button.alpha = 0.8
    return button
}

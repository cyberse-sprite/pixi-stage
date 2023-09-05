import { Text } from "pixi.js";
import { backBox, dialogStyle } from "./design";
import { FancyButton } from "@pixi/ui";
import type Exhi from "./exhi";

export const message = (exhi: Exhi, content: string, color: string = 'white') => {
    const text = new Text(content, dialogStyle)
    text.style.fill = color
    const button = new FancyButton({
        defaultView: backBox(text.width + 96, text.height + 24),
        text: text
    })
    button.anchor.set(0.5, 0)
    button.x = exhi.app.view.width / 2
    button.y = -button.height
    exhi.content.addChild(button)
    const fade = (d: number) => {
        button.alpha -= d / 10
        if (button.alpha < 0) {
            exhi.app.ticker.remove(fade)
            button.destroy({ children: true })
        }
    }
    const move = (d: number) => {
        button.y += d + 3
        if (button.y > 12) {
            button.y = 12
            exhi.app.ticker.remove(move)
            setTimeout(() => {
                exhi.app.ticker.add(fade)
            }, content.length * 100 + 3000);
        }
    }

    exhi.app.ticker.add(move)

}

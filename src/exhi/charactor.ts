import { AnimatedSprite, Container, Graphics, Spritesheet, Text } from 'pixi.js'
import { backBox, popStyle } from './design'

type directType = 'down' | 'up' | 'left' | 'right'

export default class Charactor extends Container {
    tag: string
    sheet: Spritesheet | null = null
    anime: AnimatedSprite | null = null
    direction: directType = 'down'

    box = [64, 32]

    nameSprite: Text | null = null
    pop = backBox()
    poptimer: any

    constructor(tag: string = '', sheet?: Spritesheet) {
        super()
        this.tag = tag
        if (sheet) {
            this.load(sheet)
        }
        this.pop.y = -140
        this.addChild(this.pop)
    }
    load(sheet: Spritesheet) {
        this.sheet = sheet
        this.anime = new AnimatedSprite(this.sheet.animations['down'])
        this.anime.gotoAndStop(1)
        this.anime.animationSpeed = 0.08
        this.addChild(this.anime)
    }
    setDirect(direct: string) {
        this.direction = <directType>direct
        if (this.anime && this.sheet)
            this.anime.textures = this.sheet.animations[direct]
    }
    setName(name?: string) {
        if (name) {
            this.tag = name
        }
        if (this.nameSprite) {
            this.nameSprite.text = this.tag
        } else {
            this.nameSprite = new Text(this.tag, popStyle)
            this.nameSprite.anchor.set(0.5, 0)
            this.nameSprite.y = 5
            this.addChild(this.nameSprite)
        }
    }
    drawPop(width: number, height: number) {
        this.pop.clear()
        this.pop.lineStyle(2, 0xeeeeee, 1).beginFill(0x000000, 0.8)
        this.pop.removeChildren()
        this.pop.moveTo(-width / 2 - 10, 0)
        this.pop.lineTo(-6, 0)
        this.pop.lineTo(0, 6)
        this.pop.lineTo(6, 0)
        this.pop.lineTo(width / 2 + 10, 0)
        this.pop.lineTo(width / 2 + 10, -height - 20)
        this.pop.lineTo(-width / 2 - 10, -height - 20)
        this.pop.lineTo(-width / 2 - 10, 0)
        this.pop.endFill()
    }
    speak(text: string) {
        const poptext = new Text(text, popStyle)
        this.drawPop(poptext.width, poptext.height)
        poptext.anchor.set(0.5, 1)
        poptext.y = -10
        this.pop.addChild(poptext)
        this.pop.alpha = 1
        var _this = this
        clearTimeout(this.poptimer)
        this.poptimer = setTimeout(() => {
            _this.pop.alpha = 0
        }, 4000 + poptext.text.length * 200)
    }
    updateZ() {
        this.zIndex = this.y
    }
}
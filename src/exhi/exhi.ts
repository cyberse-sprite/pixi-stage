import type { PsExhi } from './define/exhi';
import SceneStart from './scene/SceneStart';
import { abh, abw, backColor, getResUrl, style } from './design';
import { Container, Application, Spritesheet, Graphics, Assets, Text, TextStyle } from 'pixi.js';
import SceneSelectChar from './scene/SceneSelectChar';
import { message } from './message';

export default class Exhi {
    app: Application
    container = new Container()
    content = new Container()

    sheets: { [index: string]: Spritesheet } = {}
    data: PsExhi

    loading = new Graphics().beginFill(backColor).drawRect(0, 0, abw, abh)
    setLoading: any
    cancelLoading: any

    id = `${new Date().getTime()}`

    constructor(data: PsExhi) {
        this.data = data
        const stage = document.getElementById('stage')
        this.app = new Application({
            background: backColor,
            resolution: window.devicePixelRatio,
            autoDensity: true
        });
        if (!stage) return
        this.app.resizeTo = stage

        //@ts-ignore
        stage.appendChild(this.app.view);

        this.container.addChild(this.content)

        const c = <Container[]>[]
        const cc = new Container()
        const text = new Text('加载中', style)
        text.anchor.set(0, 0.5)

        for (let i = 0; i < 3; i++) {
            const d = new Graphics().lineStyle(2, '#eee', 0.8).drawCircle(0, 0, 4)
            d.x = 24 * (i + 1)
            c.push(d)
            cc.addChild(d)
        }

        c.push(text)
        cc.addChild(text)
        text.x = 24 * 4 - 4

        cc.x = (abw - cc.width) / 2
        cc.y = (abh - cc.height) / 2
        const loading = (d: number) => {
            for (let i = 0; i < 4; i++) {
                c[i].y = Math.sin(new Date().getTime() / 400 + i) * 10
            }
        }

        this.setLoading = () => {
            this.app.ticker.add(loading)
            this.loading.visible = true
        }
        this.cancelLoading = () => {
            this.app.ticker.remove(loading)
            this.loading.visible = false
        }

        this.loading.addChild(cc)

        this.container.addChild(this.loading)
        this.app.stage.addChild(this.container)
        this.resize()
        const _this = this
        window.addEventListener('resize', () => {
            _this.resize()
        })

        Text.defaultAutoResolution = false
        Text.defaultResolution = 1

        this.start()
    }
    resize() {
        let w = this.app.screen.width
        let h = this.app.screen.height
        let x = 0
        let y = 0

        if (w > abw && h > abh) {
            x = (w - abw) / 2
            y = (h - abh) / 2
            w = abw
            h = abh
        } else {
            let s = 0
            if ((w / h) > (abw / abh)) {
                y = 0
                s = h / abh
                w = h / 3 * 4
                x = (this.app.screen.width - w) / 2
            } else {
                x = 0
                s = w / abw
                h = w / 4 * 3
                y = (this.app.screen.height - h) / 2
            }
            this.container.scale.x = s
            this.container.scale.y = s
        }

        x = Math.floor(x)
        y = Math.floor(y)
        w = Math.floor(w)
        h = Math.floor(h)

        const mask = new Graphics()
        mask.beginFill(0)
        mask.drawRect(x, y, w, h)
        mask.endFill()
        this.container.mask = mask
        this.container.x = x
        this.container.y = y
    }
    loadScene(scene: any) {
        this.content.removeChildren()
        this.content.addChild(scene)
    }
    start() {
        //message(this.app, '消息')
        this.loadScene(new SceneSelectChar(this))
        //this.loadScene(new SceneStart(this))
    }
    async loadSheets(list: string[]) {
        for (var item of list) {
            if (!this.sheets[item]) {
                await this.onLoad(item)
            }
        }
    }

    async onLoad(src: string) {
        const ma = await Assets.load(getResUrl(src))
        const w = ma.width
        const h = ma.height
        const sheet = {
            meta: {
                image: src,
                format: "RGBA8888",
                size: { w, h },
                scale: "1"
            },
            frames: {} as { [index: string]: any },
            animations: {
                "down": [src + "-00", src + "-01", src + "-02", src + "-01"],
                "left": [src + "-10", src + "-11", src + "-12", src + "-11"],
                "right": [src + "-20", src + "-21", src + "-22", src + "-21"],
                "up": [src + "-30", src + "-31", src + "-32", src + "-31"]
            }
        }
        const bw = w / 3
        const bh = h / 4
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 3; i++) {
                sheet.frames[src + "-" + j + i] = {
                    "frame": { "x": i * bw, "y": j * bh, "w": bw, "h": bh },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": bw, "h": bh },
                    "sourceSize": { "w": bw, "h": bh },
                    "anchor": { "x": 0.5, "y": 1 }
                }
            }
        }
        this.sheets[src] = new Spritesheet(ma, sheet);

        await this.sheets[src].parse()
    }
    loadScript(src: any) {
        if (this.content.children.length > 0) {
            const scene = this.content.children[0]
            //@ts-ignore
            if (scene.dialog) {
                //@ts-ignore
                scene.dialog.load(src)
            }
        }
    }
    async takeScreenshot() {
        this.app.stop();
        const url = await this.app.renderer.extract.base64(this.app.stage);
        const a = document.createElement('a');

        document.body.append(a);
        a.download = 'screenshot';
        a.href = url;
        a.click();
        a.remove();
        this.app.start();
    }
}
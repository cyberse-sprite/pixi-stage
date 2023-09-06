import { getResUrl } from "@/exhi/design"

export default class MapAccess {
    w: number
    h: number
    data: Array<boolean> | null = null
    constructor(w: number, h: number) {
        this.data = new Array(w * h).fill(true)
        this.w = w
        this.h = h
    }
    load(src: string, x: number, y: number) {
        var _this = this
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = getResUrl(src);
        img.onload = () => {
            if (!ctx) return
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (var j = 0; j < img.height; j++) {
                for (var i = 0; i < img.width; i++) {
                    if (data[4 * (j * img.width + i)] > 0) {
                        //@ts-ignore
                        _this.data[(x - img.width / 2 + i) + (y - img.height + j) * _this.w] = false
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);
        };
    }
    isAccess(x: number, y: number) {
        if (this.data) {
            x = Math.round(x)
            y = Math.round(y)
            if (this.data[x + this.w * y]) {
                return this.data[x + this.w * y]
            }
        }
        return false
    }
}
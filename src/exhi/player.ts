import type { Spritesheet } from "pixi.js";
import Charactor from "./charactor";

export default class Player extends Charactor {
    moving: boolean = false
    src: string = ''
    constructor(tag: string = '', sheet?: Spritesheet) {
        super(tag, sheet)
    }
}
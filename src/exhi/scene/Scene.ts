import { Container } from "pixi.js";
import type Exhi from "../exhi";

export default class Scene extends Container {
    exhi: Exhi
    constructor(exhi: Exhi) {
        super()
        this.exhi = exhi
    }
}
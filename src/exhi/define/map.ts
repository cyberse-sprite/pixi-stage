export interface PsEventItem {
    text: string
    onclick: string
}

interface PsEventTrigger {
    area: [number, number, number, number]
}

export interface PsEvent {
    title: string
    trigger: PsEventTrigger
    content: PsEventItem[]
}

type PsPos = [number, number]

interface PsMaterial {
    layer: number
    pos: PsPos
    src: string
    access: string
}

export interface PsMap {
    api: string
    title: string
    materials: PsMaterial[]
    access: string
    events: PsEvent[]
    birth: PsPos
}
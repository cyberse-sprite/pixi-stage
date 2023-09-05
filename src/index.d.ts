import type Exhi from "./exhi/exhi";

export {};

declare global {
    interface Window {
        callDrawer: (string) => void
        exhi:Exhi
    }
}
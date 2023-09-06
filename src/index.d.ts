import type Exhi from "./exhi/exhi";

export { };

declare global {
    interface Window {
        callDrawer: (string, string) => void
        exhi: Exhi
    }
}
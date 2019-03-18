import BrowserTest from "./BrowserTest";

export interface ICloseHandle {
    (event: Event): boolean | void;
}

export default class DepthStack {
    static items: ICloseHandle[] = [];

    static push(closeHandle: ICloseHandle) {
        this.items.push(closeHandle);
    }

    static remove(closeHandle: ICloseHandle) {
        let index = this.items.indexOf(closeHandle);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    static close(event: Event) {
        let item = this.items[this.items.length - 1];
        if (item) {
            let result = item(event);
            if (result !== false) {
                this.items.pop();
            }
        }
    }

    static init() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.keyCode) {
                //case 13: // Enter
                //break;
                case 27: // Escape
                    this.close(event);
                    break;
                default:
                    break;
            }
        });
        // Use onclick for iOS Safari
        window.onclick = (event: MouseEvent) => {
            this.close(event);
        };
    }
}
export interface ICloseHandle {
    (event: Event): boolean | void;
}

export interface ICloseItem {
    close: ICloseHandle;
    confirm: ICloseHandle;
}

export default class DepthStack {
    static items: ICloseItem[] = [];

    static push(close: ICloseHandle, confirm?: ICloseHandle) {
        this.items.push({
            close: close,
            confirm: confirm
        });
    }

    static remove(close: ICloseHandle) {
        let index = this.items.findIndex(closeItem => {
            return (closeItem.close === close) || (closeItem.confirm === close);
        });
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    static close(event: Event) {
        let item = this.items[this.items.length - 1];
        if (item && item.close) {
            let result = item.close(event);
            if (result !== false) {
                // Use remove instead of pop in case already removed.
                DepthStack.remove(item.close);
            }
        }
    }

    static confirm(event: Event) {
        let item = this.items[this.items.length - 1];
        if (item && item.confirm) {
            let result = item.confirm(event);
            if (result !== false) {
                // Use remove instead of pop in case already removed.
                DepthStack.remove(item.confirm);
            }
        }
    }

    static init() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case 13: // Enter
                    this.confirm(event);
                    break;
                case 27: // Escape
                    this.close(event);
                    break;
                case 32: // Space
                    break;
                default:
                    break;
            }
        });
        window.addEventListener('blur', (event: Event) => {
            // This should close popovers, but not modals.
            this.close(event);
        });
        // window.addEventListener('visibilitychange', (event: Event) => {
        //     this.close(event);
        // });
        // Use onclick for iOS Safari
        window.onclick = (event: MouseEvent) => {
            this.close(event);
        };
    }

    static blur() {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }
}
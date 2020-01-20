export interface ICloseHandle {
    (event: Event, confirm: boolean): boolean | void;
}

export interface ICloseItem {
    handleConfirm: boolean;
    closeHandle: ICloseHandle;
}

export default class DepthStack {
    static items: ICloseItem[] = [];

    static push(closeHandle: ICloseHandle, handleConfirm: boolean = false) {
        this.items.push({
            closeHandle: closeHandle,
            handleConfirm: handleConfirm
        });
    }

    static remove(closeHandle: ICloseHandle) {
        let index = this.items.findIndex(closeItem => closeItem.closeHandle === closeHandle);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    static close(event: Event, confirm?: boolean) {
        let item = this.items[this.items.length - 1];
        if (item) {
            if (item.handleConfirm || !confirm) {
                let result = item.closeHandle(event, confirm);
                if (result !== false) {
                    // Use remove instead of pop in case already removed.
                    DepthStack.remove(item.closeHandle);
                }
            }
        }
    }

    static init() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case 13: // Enter
                    this.close(event, true);
                    break;
                case 27: // Escape
                    this.close(event, false);
                    break;
                default:
                    break;
            }
        });
        // Use onclick for iOS Safari
        window.onclick = (event: MouseEvent) => {
            this.close(event, false);
        };
    }

    static blur() {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }
}
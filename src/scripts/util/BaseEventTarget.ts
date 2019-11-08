export interface CustomEventListener extends EventListener {
    (evt: CustomEvent): void;
}

export default class BaseEventTarget implements EventTarget {
    listeners: {
        [index: string]: EventListener[];
    } = {};

    addEventListener(type: string, callback: CustomEventListener) {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }

    removeEventListener(type: string, callback: CustomEventListener) {
        if (!(type in this.listeners)) {
            return;
        }
        var stack = this.listeners[type];
        for (var i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return;
            }
        }
    }

    dispatchEvent(event: CustomEvent) {
        if (!(event.type in this.listeners)) {
            return true;
        }
        var stack = this.listeners[event.type];

        for (var i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event);
        }
        return !event.defaultPrevented;
    }

    sendEvent<T>(type: string, detail?: T) {
        this.dispatchEvent(new CustomEvent(type, detail ? { detail: detail } : undefined));
    }
}

export interface DOMEvent<T extends Node = Node> extends Event {
    target: T;
}
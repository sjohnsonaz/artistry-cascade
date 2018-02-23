import { observable, hash, IHash } from 'cascade';

export default class BodyScroll {
    static locks: IHash<boolean> = {};
    static isScrollbarVisible: boolean = false;
    static updateLock() {
        let keys = Object.keys(this.locks);
        let locked = (keys.length > 0) && this.isScrollbarVisible;
        this.lockRoot(locked);
        return locked;
    }
    private static listener: any;

    static lock(id: string) {
        this.locks[id] = true;
        this.updateLock();
    }

    static unlock(id: string) {
        delete this.locks[id];
        this.updateLock();
    }

    static isVisible() {
        return document.body.clientHeight > window.innerHeight;
    }

    static listen() {
        this.stop();
        this.listener = () => {
            this.isScrollbarVisible = this.isVisible();
            this.updateLock();
        };
        window.setTimeout(() => {
            this.isScrollbarVisible = this.isVisible();
            this.updateLock();
        });
        window.addEventListener('resize', this.listener);
    }

    static stop() {
        if (this.listener) {
            window.removeEventListener('resize', this.listener);
            this.listener = undefined;
        }
    }

    static lockRoot(lock: boolean) {
        let body = document.body;
        let root = document.querySelector('body > .root');
        if (root) {
            // We must query multiple objects for the scrollTop.
            if (lock) {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || body.scrollTop || root.scrollTop;
                body.classList.add('body-scroll-lock');
                root.scrollTop = scrollTop;
            } else {
                let scrollTop = root.scrollTop || window.pageYOffset || document.documentElement.scrollTop || body.scrollTop;
                body.classList.remove('body-scroll-lock');
                // We must set both of these for Chrome and Firefox.
                body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;
            }
        }
    }
}
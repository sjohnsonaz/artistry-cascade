export default class BodyScroll {
    static lockCount: number = 0;
    static rootSelector: string = 'body > .root';
    static bodyLockClass: string = 'body-scroll-lock';

    static lock() {
        this.lockCount++;

        let body = document.body;
        let root = document.querySelector(this.rootSelector);
        if (root) {
            // We must query multiple objects for the scrollTop.
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || body.scrollTop || root.scrollTop;
            body.classList.add(this.bodyLockClass);
            root.scrollTop = scrollTop;
        }
    }

    static unlock() {
        this.lockCount--;
        if (this.lockCount < 0) {
            this.lockCount = 0;
        }

        let body = document.body;
        let root = document.querySelector(this.rootSelector);
        if (root && this.lockCount === 0) {
            let scrollTop = root.scrollTop || window.pageYOffset || document.documentElement.scrollTop || body.scrollTop;
            body.classList.remove(this.bodyLockClass);
            // We must set both of these for Chrome and Firefox.
            body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
        }
    }

    static init() {
        window.addEventListener('beforeunload', () => {
            this.lockCount = 1;
            this.unlock();
        });
    }
}
export default class BodyScroll {
    static lockCount: number = 0;
    static rootSelector: string = 'body > .root';
    static bodyLockClass: string = 'body-scroll';
    static scrollbarWidth: string;

    static lock() {
        this.lockCount++;

        let body = document.body;
        let root = document.querySelector(this.rootSelector) as HTMLElement;
        if (root) {
            // We must query multiple objects for the scrollTop.
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || body.scrollTop || root.scrollTop;
            body.setAttribute('data-lock', 'true');
            root.style.marginRight = this.scrollbarWidth;
            root.scrollTop = scrollTop;
        }
    }

    static unlock() {
        this.lockCount--;
        if (this.lockCount < 0) {
            this.lockCount = 0;
        }

        let body = document.body;
        let root = document.querySelector(this.rootSelector) as HTMLElement;
        if (root && this.lockCount === 0) {
            let scrollTop = root.scrollTop || window.pageYOffset || document.documentElement.scrollTop || body.scrollTop;
            body.setAttribute('data-lock', 'false');
            root.style.marginRight = '';
            // We must set both of these for Chrome and Firefox.
            body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
        }
    }

    static init() {
        let body = document.body;
        body.classList.add(this.bodyLockClass);
        body.setAttribute('data-lock', 'init');
        this.scrollbarWidth = getComputedStyle(body).marginRight;
        body.setAttribute('data-lock', 'false');
        window.addEventListener('beforeunload', () => {
            this.lockCount = 1;
            this.unlock();
        });
    }
}
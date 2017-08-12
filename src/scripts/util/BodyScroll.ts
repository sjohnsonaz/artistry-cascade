export default class BodyScroll {
    static lock(lock: boolean) {
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
export default class BodyScroll {
    static lock(lock: boolean) {
        let body = document.body;
        let root = document.querySelector('body > .root');
        if (root) {
            if (lock) {
                let scrollTop = body.scrollTop;
                body.classList.add('body-scroll-lock');
                root.scrollTop = scrollTop;
            } else {
                let scrollTop = root.scrollTop;
                body.classList.remove('body-scroll-lock');
                body.scrollTop = scrollTop;
            }
        }
    }
}
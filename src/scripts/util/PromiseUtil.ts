export function wait(time: number) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, time);
    });
}

export function waitAnimation(time?: number) {
    return new Promise((resolve) => {
        if (time) {
            window.setTimeout(() => {
                window.requestAnimationFrame(resolve);
            }, time);
        } else {
            window.requestAnimationFrame(resolve);
        }
    });
}
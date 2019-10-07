import { observable } from 'cascade';

export default class WindowState {
    @observable width: number = window.innerWidth;
    @observable height: number = window.innerHeight;

    @observable get screenSize(): ScreenSize {
        let width = this.width;
        if (width <= ScreenSize.Small) {
            return ScreenSize.XSmall;
        } else if (width <= ScreenSize.Medium) {
            return ScreenSize.Small;
        } else if (width <= ScreenSize.Large) {
            return ScreenSize.Medium;
        } else if (width <= ScreenSize.XLarge) {
            return ScreenSize.Large;
        } else {
            return ScreenSize.XLarge;
        }
    }

    resizeHandler = () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    init(): void {
        window.addEventListener('resize', this.resizeHandler);
    }

    dispose(): void {
        window.removeEventListener('resize', this.resizeHandler);
    }

    static getSize(variableName: string) {
        return parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue(variableName));
    }
}

export enum ScreenSize {
    XSmall = 0,
    Small = WindowState.getSize('--size-sm'),//576,
    Medium = WindowState.getSize('--size-md'),//768,
    Large = WindowState.getSize('--size-lg'),//992,
    XLarge = WindowState.getSize('--size-xl'),//1200
}

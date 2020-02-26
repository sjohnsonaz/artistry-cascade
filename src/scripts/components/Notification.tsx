import Cascade, { Component, observable } from 'cascade';

import { wait } from '../util/PromiseUtil';
import { INotification } from '../util/NotificationUtil';
import ClassNames from '../util/ClassNames';
import { Animation } from '../abilities/Animatable';

export interface INotificationProps extends INotification {
    id?: string;
    className?: string;
    clickable?: boolean;
    animation?: Animation;
    allowDelay?: boolean;
    onClick?: () => any;
    onClose?: () => any;
}

export default class Notification extends Component<INotificationProps> {
    @observable hide = false;
    decayCounter: number = 0;

    constructor(props: INotificationProps, children?: any[]) {
        super(props, children);
        this.startDecay();
    }

    startDecay = async () => {
        if (this.props.decay) {
            this.decayCounter++;
            let decayCounter = this.decayCounter;
            await wait(this.props.decay);
            if (decayCounter === this.decayCounter) {
                this.hide = true;
            }
        }
    }

    endDecay = async (event: AnimationEvent) => {
        if (event.animationName.endsWith('out') && this.props.onClose) {
            this.props.onClose();
        }
    }

    stopDecay = () => {
        if (this.props.allowDelay) {
            this.decayCounter++;
        }
    }

    render() {
        let {
            id,
            className,
            type,
            title,
            clickable,
            allowDelay
        } = this.props;

        let classNames = new ClassNames(className);
        classNames.add('notification', 'animatable');

        let theme: string;
        switch (type) {
            case 'success':
                theme = 'success';
                break;
            case 'info':
                theme = 'info';
                break;
            case 'warning':
                theme = 'warning';
                break;
            case 'danger':
                theme = 'danger';
                break;
        }

        if (clickable || allowDelay) {
            classNames.add('clickable');
        }

        let direction = 'in';
        if (this.hide) {
            direction = 'out';
        }

        return (
            <aside
                className={classNames.toString()}
                data-animation={this.props.animation || "fade-right"}
                data-direction={direction}
                data-theme={theme}
                id={id}
                onclick={this.props.onClick}
                onmouseenter={this.stopDecay}
                onmouseleave={this.startDecay}
                onAnimationEnd={this.endDecay}
                role={clickable ? "button" : undefined}
            >
                {title ?
                    <header>{title}</header> :
                    undefined}
                <div className="notification-content">
                    {this.children}
                </div>
            </aside>
        );
    }
}
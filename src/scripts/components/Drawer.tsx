import Cascade, { Component } from 'cascade';

import Draggable from './Draggable';
import BodyScroll from '../util/BodyScroll';

export interface IDrawerProps {
    className?: string;
    id?: string;
    direction?: 'top' | 'right' | 'bottom' | 'left';
    open: boolean;
    full?: boolean;
    onClose: (event: Event) => void;
    lockScroll?: boolean;
    background?: boolean;
}

export default class Drawer extends Component<IDrawerProps> {
    preventClick(event: Event) {
        event.stopPropagation();
    }

    close = (event: Event) => {
        // TODO: Create a prop for preventing mask clicks.
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }

    render() {
        let {
            className,
            id,
            direction,
            open,
            full,
            onClose,
            lockScroll,
            background
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('drawer');

        direction = direction || 'bottom';
        classNames.push('drawer-' + direction);

        if (open) {
            classNames.push('drawer-open');
        }

        if (background) {
            classNames.push('drawer-background');
        }

        if (full) {
            classNames.push('drawer-full');
        }

        if (lockScroll) {
            BodyScroll.lock(open);
        }

        return (
            <div className={classNames.join(' ')} id={id} onclick={this.close}>
                <div className="drawer-content" onclick={this.preventClick}>
                    {this.children}
                </div>
            </div>
        );
    }
}

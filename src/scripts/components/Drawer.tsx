import Cascade, { Component } from 'cascade';

import Draggable from './Draggable';

export interface IDrawerProps {
    className?: string;
    id?: string;
    direction?: 'top' | 'right' | 'bottom' | 'left';
    open: boolean;
    full?: boolean;
    onClose: (event: Event) => void;
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
            onClose
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('drawer');

        direction = direction || 'bottom';
        classNames.push('drawer-' + direction);

        if (open) {
            classNames.push('drawer-open');
        }

        if (full) {
            classNames.push('drawer-full');
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

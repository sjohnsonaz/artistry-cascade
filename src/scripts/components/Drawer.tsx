import Cascade, { Component, observable, Portal } from 'cascade';

import { IGridExternalProps, gridConfig } from './Grid';
import { waitAnimation } from '../util/PromiseUtil';
import BodyScroll from '../util/BodyScroll';
import PortalManager from '../util/PortalManager';

export interface IDrawerProps extends IGridExternalProps {
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
    @observable open: boolean = false;
    container = document.createElement('div');

    preventClick(event: Event) {
        event.stopPropagation();
    }

    close = (event: Event) => {
        // TODO: Create a prop for preventing mask clicks.
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }

    async afterProps(mounted: boolean) {
        if (mounted && this.props.open != this.prevProps.open) {
            if (this.props.open) {
                BodyScroll.lock();
                await waitAnimation();
                this.open = this.props.open;
            } else {
                BodyScroll.unlock();
                this.open = this.props.open;
            }
        }
    }

    afterDispose(element: Node) {
        // If we were locked, unlock
        if (this.open) {
            BodyScroll.unlock();
        }
    }

    render() {
        let {
            className,
            id,
            direction,
            full,
            onClose,
            background
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('drawer');

        direction = direction || 'bottom';
        classNames.push('drawer-' + direction);

        if (this.open) {
            classNames.push('drawer-open');
        }

        if (background) {
            classNames.push('drawer-background');
        }

        if (full) {
            classNames.push('drawer-full');
        }

        let innerClassNames = ['drawer-content'];
        if (this.props.grid) {
            gridConfig(innerClassNames, this.props);
        }

        return (
            <Portal element={PortalManager.getElement('modal-root')}>
                <div className={classNames.join(' ')} id={id} onclick={this.close}>
                    <div className={innerClassNames.join(' ')} onclick={this.preventClick}>
                        {this.children}
                    </div>
                </div>
            </Portal>
        );
    }
}

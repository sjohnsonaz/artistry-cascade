import Cascade, { Component, observable, Portal, Ref } from 'cascade';

import { IGridExternalProps, gridConfig } from './Grid';
import { waitAnimation } from '../util/PromiseUtil';
import BodyScroll from '../util/BodyScroll';
import DepthStack from '../util/DepthStack';
import PortalManager from '../util/Portal';

export interface IDrawerProps extends IGridExternalProps {
    className?: string;
    id?: string;
    direction?: 'top' | 'right' | 'bottom' | 'left';
    open: boolean;
    full?: boolean;
    onClose: (event: Event) => void;
    background?: boolean;
    space?: boolean;
}

export default class Drawer extends Component<IDrawerProps> {
    @observable open: boolean = this.props.open;
    @observable remove: boolean = !this.props.open;
    container = document.createElement('div');
    rootRef: Ref<HTMLDivElement> = new Ref();

    constructor(props: IDrawerProps, ...children: any[]) {
        super(props, ...children);
        if (this.props.open) {
            BodyScroll.lock();
            DepthStack.push(this.close);
        }
    }

    preventClick(event: Event) {
        event.stopPropagation();
    }

    close = (event: Event) => {
        // TODO: Create a prop for preventing mask clicks.
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }

    transitionEnd = (event: TransitionEvent) => {
        if (event.propertyName === 'transform') {
            if (!this.props.open) {
                this.remove = true;
            }
        }
    }

    afterRender(node: HTMLDivElement, updating: boolean) {
        if (!updating) {
            this.rootRef.current.children[0].addEventListener('transitionend', this.transitionEnd);
        }
    }

    async afterProps(mounted: boolean) {
        if (mounted && this.props.open != this.prevProps.open) {
            if (this.props.open) {
                this.remove = false;
                BodyScroll.lock();
                await waitAnimation();
                this.open = this.props.open;
                DepthStack.push(this.close);
            } else {
                BodyScroll.unlock();
                this.open = this.props.open;
                DepthStack.remove(this.close);
            }
        }
    }

    afterDispose(element: Node) {
        // If we were locked, unlock
        if (this.open) {
            BodyScroll.unlock();
            DepthStack.remove(this.close);
        }
    }

    render() {
        let {
            className,
            id,
            direction,
            full,
            background,
            space
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('drawer');

        direction = direction || 'bottom';
        classNames.push('drawer-' + direction);

        if (this.open) {
            classNames.push('drawer-open');
        }

        if (full) {
            classNames.push('drawer-full');
        }

        if (background) {
            classNames.push('drawer-background');
        }

        if (space) {
            classNames.push('drawer-space');
        }

        let innerClassNames = ['drawer-content'];
        if (this.props.grid) {
            gridConfig(innerClassNames, this.props);
        }

        return (
            <Portal element={PortalManager.getElement('modal-root')} remove={this.remove}>
                <div className={classNames.join(' ')} id={id} ref={this.rootRef}>
                    <div class="drawer-background">
                        <div class="drawer-scroller">
                            <div className={innerClassNames.join(' ')} onclick={this.preventClick}>
                                {this.children}
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>
        );
    }
}

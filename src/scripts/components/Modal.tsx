import Cascade, { Component, observable, Portal, Ref } from 'cascade';

import Button from './Button';
import { IGridExternalProps, gridConfig } from './Grid';
import { IScrollableExternalProps } from './Scrollable';
import { waitAnimation } from '../util/PromiseUtil';
import BodyScroll from '../util/BodyScroll';
import DepthStack from '../util/DepthStack';
import PortalManager from '../util/Portal';

export type ModalSize = 'none' | 'all' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface IModalProps extends IGridExternalProps, IScrollableExternalProps {
    className?: string;
    id?: string;
    open: boolean;
    onClose?: (event: Event) => void;
    onConfirm?: (event: Event) => void;
    closeable?: boolean;
    closeButton?: any;
    title?: any;
    header?: any;
    footer?: any;
    animation?: 'center' | 'top' | 'right' | 'bottom' | 'left';
    lockable?: boolean;
    locked?: boolean;
    space?: boolean;
    background?: boolean;
    screenSize?: ModalSize | ModalSize[];
}

export default class Modal extends Component<IModalProps> {
    @observable open: boolean = this.props.open;
    @observable remove: boolean = !this.props.open;
    container = document.createElement('div');
    rootRef: Ref<HTMLDivElement> = new Ref();

    constructor(props: IModalProps, ...children: any[]) {
        super(props, ...children);
        if (this.props.open) {
            BodyScroll.lock();
            DepthStack.push(this.close);
        }
    }

    preventClick(event: Event) {
        event.stopPropagation();
    }

    close = (event: Event, confirm: boolean) => {
        if (confirm) {
            if (this.props.onConfirm) {
                this.props.onConfirm(event);
            }
        } else {
            // TODO: Create a prop for preventing mask clicks.
            if (this.props.onClose) {
                this.props.onClose(event);
            }
        }
    }

    transitionEnd = (event: TransitionEvent) => {
        if (event.propertyName === 'transform') {
            if (!this.props.open) {
                this.remove = true;
            }
        }
    }

    onScroll = (event: MouseEvent) => {
        if (this.props.onscroll) {
            this.props.onscroll(event);
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
                DepthStack.blur();
                this.remove = false;
                BodyScroll.lock();
                await waitAnimation();
                this.open = this.props.open;
                DepthStack.push(this.close, true);
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
            animation,
            background,
            screenSize,
            closeable,
            closeButton,
            title,
            header,
            footer
        } = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('modal');
        if (this.open) {
            classNames.push('modal-open');
        }

        if (background) {
            classNames.push('modal-background');
        }

        if (animation) {
            classNames.push('modal-animate-' + animation.trim());
        }

        if (screenSize) {
            let sizes = (screenSize instanceof Array) ? screenSize : [screenSize];

            sizes.forEach(size => {
                switch (size) {
                    case 'all':
                        classNames.push('modal-all');
                        break;
                    case 'x-small':
                        classNames.push('modal-xs');
                        break;
                    case 'small':
                        classNames.push('modal-sm');
                        break;
                    case 'medium':
                        classNames.push('modal-md');
                        break;
                    case 'large':
                        classNames.push('modal-lg');
                        break;
                    case 'x-large':
                        classNames.push('modal-xl');
                        break;
                }
            });
        }

        let modalContentClassNames = [];
        if (this.props.lockable) {
            modalContentClassNames.push('lock-contents');
            if (this.props.locked) {
                modalContentClassNames.push('locked');
            }
        }
        if (this.props.space) {
            if (title || footer) {
                modalContentClassNames.push('modal-space');
            } else {
                modalContentClassNames.push('modal-space');
            }
        }
        if (this.props.grid) {
            gridConfig(modalContentClassNames, this.props);
        }

        let headerSection;
        if (title || header || closeable) {
            headerSection = (
                <div className="modal-header">
                    <div className="modal-title">{title}</div>
                    {closeable ?
                        <div className="action-bar">
                            <Button
                                onclick={this.props.onClose}
                                displaySize="small"
                            >
                                {closeButton || 'Close'}
                            </Button>
                        </div> :
                        null}
                    <div>
                        {header}
                    </div>
                </div>
            );
        }

        return (
            <Portal element={PortalManager.getElement('modal-root')} remove={this.remove}>
                <div
                    className={classNames.join(' ')}
                    id={this.props.id}
                    ref={this.rootRef}
                    onscroll={this.onScroll}
                >
                    <div className="modal-background">
                        {headerSection || footer ?
                            <div className="modal-content" onclick={this.preventClick}>
                                {headerSection}
                                <div
                                    className={'modal-body ' + modalContentClassNames.join(' ')}
                                    onscroll={this.onScroll}
                                >
                                    {this.children}
                                </div>
                                {footer ?
                                    <div className="modal-footer">
                                        {footer}
                                    </div>
                                    : undefined}
                            </div> :
                            <div className={'modal-content ' + modalContentClassNames.join(' ')} onclick={this.preventClick}>
                                {this.children}
                            </div>
                        }
                    </div>
                </div>
            </Portal>
        );
    }
}
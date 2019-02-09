import Cascade, { Component, observable, Portal, Ref } from 'cascade';

import { ITemplate } from './ITemplate';
import Button from './Button';
import { IGridExternalProps, gridConfig } from './Grid';
import { waitAnimation } from '../util/PromiseUtil';
import BodyScroll from '../util/BodyScroll';
import DepthStack from '../util/DepthStack';
import PortalManager from '../util/Portal';

export type ModalSize = 'none' | 'all' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface IModalProps extends IGridExternalProps {
    className?: string;
    id?: string;
    open: boolean;
    onclose: (event: Event) => void;
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
    size?: ModalSize | ModalSize[];
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

    close = (event) => {
        // TODO: Create a prop for preventing mask clicks.
        if (this.props.onclose) {
            this.props.onclose(event);
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
            animation,
            background,
            size,
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

        if (size) {
            let sizes = (size instanceof Array) ? size : [size];

            sizes.forEach(size => {
                switch (size) {
                    case 'all':
                        classNames.push('modal-all');
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

        let modalContentClassName = modalContentClassNames.join(' ');

        let headerSection;
        if (title || header || closeable) {
            headerSection = (
                <div className="modal-header">
                    <div className="modal-title">{title}</div>
                    {closeable ?
                        <div className="modal-action">
                            <Button
                                onClick={this.props.onclose}
                                size="small"
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
                <div className={classNames.join(' ')} id={this.props.id} ref={this.rootRef}>
                    <div className="modal-background">
                        {headerSection || footer ?
                            <div className="modal-content" onclick={this.preventClick}>
                                {headerSection}
                                <div className={'modal-body ' + modalContentClassName}>
                                    {this.children}
                                </div>
                                {footer ?
                                    <div className="modal-footer">
                                        {footer}
                                    </div>
                                    : undefined}
                            </div> :
                            <div className={'modal-content ' + modalContentClassName} onclick={this.preventClick}>
                                {this.children}
                            </div>
                        }
                    </div>
                </div>
            </Portal>
        );
    }
}
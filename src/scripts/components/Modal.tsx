import Cascade, { Component, observable, Portal, Ref } from 'cascade';

import { ITemplate } from './ITemplate';
import Button from './Button';
import { IGridExternalProps, gridConfig } from './Grid';
import { waitAnimation } from '../util/PromiseUtil';
import BodyScroll from '../util/BodyScroll';
import DepthStack from '../util/DepthStack';
import PortalManager from '../util/Portal';

export type ModalSize = 'default' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface IModalProps extends IGridExternalProps {
    className?: string;
    id?: string;
    open: boolean;
    onclose: (event: Event) => void;
    title?: ITemplate;
    footer?: ITemplate;
    animation?: 'center' | 'top' | 'right' | 'bottom' | 'left';
    lockable?: boolean;
    locked?: boolean;
    space?: boolean;
    background?: boolean;
    size?: ModalSize;
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
            size
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

        switch (size) {
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

        if (this.props.title) {
            var title;
            if (typeof this.props.title === 'function') {
                title = this.props.title();
            } else {
                title = this.props.title;
            }
        }

        if (this.props.footer) {
            var footer;
            if (typeof this.props.footer === 'function') {
                footer = this.props.footer();
            } else {
                footer = this.props.footer;
            }
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
                modalContentClassNames.push('modal-body-space');
            } else {
                modalContentClassNames.push('modal-content-space');
            }
        }
        if (this.props.grid) {
            gridConfig(modalContentClassNames, this.props);
        }

        let modalContentClassName = modalContentClassNames.join(' ');

        return (
            <Portal element={PortalManager.getElement('modal-root')} remove={this.remove}>
                <div className={classNames.join(' ')} id={this.props.id} ref={this.rootRef}>
                    {title || footer ?
                        <div className="modal-content" onclick={this.preventClick}>
                            {title ?
                                <div className="modal-header">
                                    <h1 className="modal-title">{title}</h1>
                                    <div className="modal-controls">
                                        <Button onclick={this.props.onclose}>Close</Button>
                                    </div>
                                </div>
                                : undefined}
                            <div className={'modal-body ' + modalContentClassName}>{this.children}</div>
                            {footer ?
                                <div className="modal-footer">{footer}</div>
                                : undefined}
                        </div> :
                        <div className={'modal-content ' + modalContentClassName} onclick={this.preventClick}>
                            {this.children}
                        </div>
                    }
                </div>
            </Portal>
        );
    }
}

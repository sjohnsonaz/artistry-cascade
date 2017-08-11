import Cascade, { Component } from 'cascade';

import { ITemplate } from './ITemplate';
import Button from './Button';

export interface IModalProps {
    className?: string;
    id?: string;
    open: boolean;
    onclose: (event: Event) => void;
    title?: ITemplate;
    footer?: ITemplate;
    animation?: 'center' | 'top' | 'right' | 'bottom' | 'left';
    lockable?: boolean;
    locked?: boolean;
}

export default class Modal extends Component<IModalProps> {

    preventClick(event: Event) {
        event.stopPropagation();
    }

    close = (event) => {
        // TODO: Create a prop for preventing mask clicks.
        if (this.props.onclose) {
            this.props.onclose(event);
        }
    }

    render() {
        let { open, animation } = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('modal');
        if (open) {
            classNames.push(' modal-open');
        }
        if (animation) {
            classNames.push('modal-animate-' + animation.trim());
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
        let modalContentClassName = modalContentClassNames.join(' ');
        return (
            <div className={classNames.join(' ')} id={this.props.id} onclick={this.close}>
                {title || footer ?
                    <div className="modal-content" onclick={this.preventClick}>
                        {title ?
                            <div className="modal-header">
                                <h1 className="modal-title">{title}</h1>
                                <div className="modal-controls">
                                    <Button onclick={this.props.onclose}>Close</Button>
                                </div>
                            </div>
                            : null}
                        <div className={'modal-body ' + modalContentClassName}>{this.children}</div>
                        {footer ?
                            <div className="modal-footer">{footer}</div>
                            : null}
                    </div> :
                    <div className={'modal-content ' + modalContentClassName} onclick={this.preventClick}>
                        {this.children}
                    </div>
                }
            </div>
        );
    }
}

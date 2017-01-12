import Cascade, { Component } from 'cascade';

import { ITemplate } from './ITemplate';
import Button from './Button';

export interface IModalProps {
    className?: string;
    open: boolean;
    onclose: (event: Event) => void;
    title?: ITemplate;
    animation?: 'center' | 'top' | 'right' | 'bottom' | 'left';
}

export default class Modal extends Component<IModalProps> {

    preventClick(event: Event) {
        event.stopPropagation();
    }

    close = (event) => {
        this.props.onclose(event);
    }

    render() {
        let {open, animation} = this.props;

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

        let className = classNames.join(' ');
        return (
            <div className={className} onclick={this.close}>
                {title ?
                    <div className="modal-content" onclick={this.preventClick}>
                        <div className="modal-header">
                            <h1 className="modal-title">{title}</h1>
                            <div className="modal-controls">
                                <Button onclick={this.props.onclose}>Close</Button>
                            </div>
                        </div>
                        <p>{this.children}</p>
                    </div> :
                    <div className="modal-content" onclick={this.preventClick}>
                        {this.children}
                    </div>
                }
            </div>
        );
    }
}

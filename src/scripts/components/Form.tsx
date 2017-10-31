import Cascade, { Component, Elements } from 'cascade';

export interface IFormProps extends Elements.JSXFormElement {
    onEnter?: (event: KeyboardEvent) => boolean | void;
    onEscape?: (event: KeyboardEvent) => boolean | void;
}

export default class Form extends Component<IFormProps> {
    onkeydown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 13:
                this.props.onEnter(event);
                break;
            case 27:
                this.props.onEscape(event);
                break;
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form');
        let onkeydown = (this.props.onEnter || this.props.onEscape) ? this.onkeydown.bind(this) : undefined;
        return (
            <form className={classNames.join(' ')} onkeydown={onkeydown} {...this.props}>{this.children}</form>
        );
    }
}

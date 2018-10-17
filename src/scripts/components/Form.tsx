import Cascade, { Component, Elements } from 'cascade';

export type FormSize = 'none' | 'small' | 'medium' | 'large' | 'x-large';

export interface IFormProps extends Elements.JSXFormElement {
    size?: FormSize;
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

        switch (this.props.size) {
            case 'small':
                classNames.push('form-sm');
                break;
            case 'medium':
                classNames.push('form-md');
                break;
            case 'large':
                classNames.push('form-lg');
                break;
            case 'x-large':
                classNames.push('form-xl');
                break;
        }

        let onkeydown = (this.props.onEnter || this.props.onEscape) ? this.onkeydown.bind(this) : undefined;
        return (
            <form className={classNames.join(' ')} onkeydown={onkeydown} {...this.props}>{this.children}</form>
        );
    }
}

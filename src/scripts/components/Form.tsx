import Cascade, { Component, Elements } from 'cascade';

export type FormSize = 'none' | 'small' | 'medium' | 'large' | 'x-large';

export interface IFormProps extends Elements.JSXFormElement {
    size?: FormSize;
    lockable?: boolean;
    locked?: boolean;
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
        let {
            id,
            className,
            lockable,
            locked,
            onEnter,
            onEscape,
            ...props
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('form');
        if (locked) {
            classNames.push('form-lock');
        }

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
            <form className={classNames.join(' ')} onkeydown={onkeydown} {...props}>
                {lockable ?
                    <div className="form-lock-screen"></div> :
                    null}
                {this.children}
            </form>
        );
    }
}

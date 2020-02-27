import Cascade, { Component, Elements } from 'cascade';

export type FormSize = 'none' | 'small' | 'medium' | 'large' | 'x-large' | 'stacked';

export interface IFormProps extends Elements.JSXFormElement {
    size?: FormSize;
    lockable?: boolean;
    locked?: boolean;
    nonForm?: boolean;
    onEnter?: (event: KeyboardEvent) => any;
    onEscape?: (event: KeyboardEvent) => any;
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
            size,
            lockable,
            locked,
            nonForm,
            onEnter,
            onEscape,
            ...props
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('form');
        if (locked) {
            classNames.push('form-lock');
        }

        switch (size) {
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
            case 'stacked':
                classNames.push('form-stacked');
                break;
        }

        let onkeydown = (this.props.onEnter || this.props.onEscape) ? this.onkeydown.bind(this) : undefined;
        if (nonForm) {
            return (
                <div id={id} className={classNames.join(' ')} onkeydown={onkeydown} {...props as any}>
                    {lockable ?
                        <div className="form-lock-screen"></div> :
                        null}
                    {this.children}
                </div>
            );
        } else {
            return (
                <form id={id} className={classNames.join(' ')} onkeydown={onkeydown} {...props}>
                    {lockable ?
                        <div className="form-lock-screen"></div> :
                        null}
                    {this.children}
                </form>
            );
        }
    }
}

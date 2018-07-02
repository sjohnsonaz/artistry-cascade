import Cascade, { Component, Elements } from 'cascade';

export interface IFormInputProps<T> extends Elements.JSXInputElement {
    fill?: boolean;
    model?: T;
    modelProp?: keyof T;
}

export default class FormInput<T> extends Component<IFormInputProps<T>> {
    oninput = (event?: Event) => {
        let { model, modelProp } = this.props;
        if (model && modelProp) {
            model[modelProp] = (event.target as HTMLInputElement).value as any;
        }
    }

    render() {
        let {
            id,
            className,
            value,
            fill,
            model,
            modelProp,
            onInput,
            ...props
        } = this.props;
        let renderedValue: string;
        if (model && modelProp) {
            renderedValue = model[modelProp] as any;
        } else {
            renderedValue = value as string;
        }

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('input');

        if (fill) {
            classNames.push('fill-width');
        }

        return (
            <input
                id={id}
                className={classNames.join(' ')}
                value={renderedValue}
                oninput={onInput || this.oninput}
                {...props}
            />
        );
    }
}

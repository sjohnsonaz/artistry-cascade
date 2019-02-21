import Cascade, { Component, Elements } from 'cascade';
import MaskedInput from './MaskedInput';

export interface IFormInputProps<T> extends Elements.JSXInputElement {
    number?: boolean;
    fill?: boolean;
    mask?: string;
    model?: T;
    modelProp?: keyof T;
}

export default class FormInput<T> extends Component<IFormInputProps<T>> {
    oninput = (event?: Event) => {
        let { number, model, modelProp } = this.props;
        if (model && modelProp) {
            let value = (event.target as HTMLInputElement).value;
            if (number) {
                value = parseFloat(value) as any;
            }
            model[modelProp] = value as any;
        }
        if (this.props.oninput) {
            this.props.oninput(event);
        }
    }

    render() {
        let {
            id,
            className,
            value,
            number,
            fill,
            mask,
            model,
            modelProp,
            oninput,
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

        if (mask) {
            return (
                <MaskedInput
                    id={id}
                    className={classNames.join(' ')}
                    value={renderedValue}
                    oninput={oninput || this.oninput}
                    mask={mask}
                    {...props as any}
                />
            );
        } else {
            return (
                <input
                    id={id}
                    className={classNames.join(' ')}
                    value={renderedValue}
                    oninput={oninput || this.oninput}
                    {...props}
                />
            );
        }
    }
}

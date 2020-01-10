import Cascade, { Component } from 'cascade';
import { DOMEvent } from '../util/BaseEventTarget';

export interface ISelectProps<T, U> {
    id?: string;
    className?: string;
    data: T[];
    template?: (value: T, index: number, data: T[]) => any;
    value?: string | number | string[];
    valueProp?: keyof T;
    displayProp?: keyof T;
    onChange?: (option: T, event?: DOMEvent<HTMLSelectElement>) => any;
    model: U;
    modelProp: keyof U;
    allowEmpty?: boolean;
    emptyValue?: T | string | number | string[];
}

export default class Select<T, U> extends Component<ISelectProps<T, U>> {
    onChange = (event: DOMEvent<HTMLSelectElement>) => {
        let {
            data,
            onChange,
            model,
            modelProp,
            valueProp
        } = this.props;

        if (model && modelProp) {
            let value = event.target.value;
            model[modelProp] = value as any;
        }

        if (onChange) {
            let value = event.target.value;
            if (valueProp) {
                let option = data.find(option => option[valueProp] as any == value);
                onChange(option, event);
            } else {
                let option = data.find(option => option as any == value);
                onChange(option, event);
            }
        }
    }

    render() {
        let {
            id,
            className,
            data,
            template,
            value,
            valueProp,
            model,
            modelProp,
            allowEmpty,
            emptyValue
        } = this.props;

        let classNames = className ? [className] : [];

        classNames.push('input');


        if (model && modelProp) {
            value = model[modelProp] as any;
        }

        let emptyOption = undefined;
        if (allowEmpty) {
            let emptyString: string = undefined;
            switch (typeof emptyValue) {
                case 'object':
                    if (emptyValue) {
                        let prop = (emptyValue as T)[valueProp];
                        if (prop) {
                            emptyString = prop.toString();
                        }
                    }
                    break;
                case 'string':
                    emptyString = emptyValue;
                    break;
                case 'number':
                    emptyString = emptyValue.toString();
                    break;
            }
            emptyOption = (
                <option key="_empty_option" value={emptyString}></option>
            )
        }

        return (
            <select
                id={id}
                className={classNames.join(' ')}
                value={value ? value.toString() : undefined}
                onChange={this.onChange}
            >
                {emptyOption}
                {template ?
                    data.map(template) :
                    data.map(option => {
                        if (valueProp) {
                            let optionValue = option[valueProp];
                            return (
                                <option key={optionValue as any} value={optionValue as any}>{optionValue}</option>
                            );
                        } else {
                            return (
                                <option key={option as any} value={option as any}>{option}</option>
                            );
                        }
                    })}
            </select>
        );
    }
}
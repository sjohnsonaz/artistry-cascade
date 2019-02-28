import Cascade, { Component } from 'cascade';

import MaskedInput from './MaskedInput';

export interface ITimeInputProps<T = any> extends Partial<HTMLInputElement> {
    seconds?: boolean;
    value?: string;
    fill?: boolean;
    model?: T;
    modelProp?: keyof T;
}

export default class TimeInput extends Component<ITimeInputProps> {
    render() {
        let {
            seconds,
            model,
            modelProp,
            value,
            ...props
        } = this.props;

        let renderedValue: string;
        if (model && modelProp) {
            renderedValue = model[modelProp] as any;
        } else {
            renderedValue = value as string;
        }
        let date = new Date(renderedValue);

        let timeString = date.toTimeString();

        let mask: string;
        if (seconds) {
            timeString = timeString.substr(0, 8);
            mask = '[[0-23]]:[[0-59]]:[[0-59]]';
        } else {
            timeString = timeString.substr(0, 5);
            mask = '[[0-23]]:[[0-59]]';
        }

        return (
            <MaskedInput
                {...props as any}
                mask={mask}
                value={timeString}
            />
        );
    }
}
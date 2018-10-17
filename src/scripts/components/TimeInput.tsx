import Cascade, { Component, observable } from 'cascade';

import MaskedInput from './MaskedInput';

export interface ITimeInputProps<T = any> extends Partial<HTMLInputElement> {
    onchange?: (event: Event, date?: Date) => (void | boolean);
    seconds?: boolean;
    value?: string;
    fill?: boolean;
    model?: T;
    modelProp?: keyof T;
}

export default class TimeInput extends Component<ITimeInputProps> {
    @observable value?: Date;
    @observable timeString?: string;

    constructor(props: ITimeInputProps, children: []) {
        super(props, children);

        let {
            value,
            model,
            modelProp
        } = this.props;

        let renderedValue: string;
        if (model && modelProp) {
            renderedValue = model[modelProp] as any;
        } else {
            renderedValue = value as string;
        }
        let date = new Date(renderedValue);

        this.value = date;
        this.timeString = date.toTimeString();
    }

    beforeRender(mounted?: boolean) {
        if (mounted) {
            let {
                value,
                model,
                modelProp
            } = this.props;
            let renderedValue: string;
            if (model && modelProp) {
                renderedValue = model[modelProp] as any;
            } else {
                renderedValue = value as string;
            }
            let date = new Date(renderedValue);

            this.value = date;
            this.timeString = date.toTimeString();
        }
    }

    onChange = (event: Event) => {
        let value = (event.target as any).value;
        let date = new Date(this.props.value);
        let parts = value.split(':').map(part => parseInt(part));
        if (parts) {
            if (this.props.seconds) {
                date.setHours(parts[0], parts[1], parts[2]);
            } else {
                date.setHours(parts[0], parts[1], 0);
            }
        }
        let { model, modelProp } = this.props;
        if (model && modelProp) {
            model[modelProp] = (event.target as HTMLInputElement).value as any;
        }
        if (this.props.onchange) {
            this.props.onchange(event, date);
        }
    }

    render() {
        let {
            seconds,
            fill,
            model,
            modelProp,
            onchange,
            value,
            ...props
        } = this.props;

        let mask: string;
        if (seconds) {
            mask = '[[0-23]]:[[0-59]]:[[0-59]]';
        } else {
            mask = '[[0-23]]:[[0-59]]';
        }

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('input');

        if (fill) {
            classNames.push('fill-width');
        }

        return (
            <MaskedInput
                {...props as any}
                className={classNames.join(' ')}
                mask={mask}
                value={this.timeString}
                onChange={this.onChange}
            />
        );
    }
}
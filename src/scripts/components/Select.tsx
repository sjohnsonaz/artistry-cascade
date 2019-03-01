import Cascade, { Component } from 'cascade';

export interface ISelectProps {
    id?: string;
    className?: string;
    options?: {
        text: string;
        value: string;
    }[];
    value?: string;
    onChange?: (event?: Event) => any;
}

export default class Select extends Component<ISelectProps> {
    onChange = (event: Event) => {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    render() {
        let {
            id,
            className,
            options,
            value
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('select');

        return (
            <select
                className={classNames.join(' ')}
                id={id}
                value={value}
                onchange={this.onChange}
            >
                {options ?
                    options.map(option => (
                        <option
                            value={option.value}
                            key={option.value}
                        >
                            {option.text}
                        </option>
                    )) :
                    undefined}
            </select>
        );
    }
}
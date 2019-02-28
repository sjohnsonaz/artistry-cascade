import Cascade, { Component } from 'cascade';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Input from './FormInput';

import Calendar, { ICalendarProps } from './Calendar';
import MaskedInput from './MaskedInput';
export { Calendar, ICalendarProps };

export interface IDatePickerProps {
    mask?: string;
    date: Date | string;
    fill?: boolean;
    onSelect: (date: Date) => void;
}

export default class DatePicker extends Component<IDatePickerProps>{
    onSelect = (date: Date) => {
        this.props.onSelect(date);
    }

    onChange = (event: Event) => {
        let value = (event.target as any).value;
        let output = new Date(value);
        if (!isNaN(output.getTime())) {
            this.props.onSelect(output);
        }
    }

    render() {
        var date: Date;
        if (!(this.props.date instanceof Date)) {
            date = new Date(this.props.date as string);
        } else {
            date = this.props.date as Date;
        }

        return (
            <ButtonGroup
                fill={this.props.fill}
                className="popover-trigger"
            >
                <MaskedInput
                    mask={'[[0-12]]/[[0-31]]/[[0-9999]]'}
                    value={getDateFormatted(date)}
                    fill={this.props.fill}
                    oninput={this.onChange}
                />
                <Button
                    link
                    noTrigger
                    popoverDirection="bottom"
                    popoverAlign="right"
                    popoverFill
                    popover={<Calendar
                        date={date}
                        onSelect={this.onSelect}
                    />}
                >Calendar</Button>
            </ButtonGroup>
        );
    }
}

function getDateFormatted(date: Date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    var day = dd < 10 ? '0' + dd : '' + dd;
    var month = mm < 10 ? '0' + mm : '' + mm;
    return month + '/' + day + '/' + yyyy;
}
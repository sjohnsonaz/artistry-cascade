import Cascade, { Component } from 'cascade';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Input from './FormInput';

import Calendar, { ICalendarProps } from './Calendar';
export { Calendar, ICalendarProps };

export interface IDatePickerProps {
    mask?: string;
    date: Date | string;
    onSelect: (date: Date) => void;
}

export default class DatePicker extends Component<IDatePickerProps>{
    onSelect = (date: Date) => {
        this.props.onSelect(date);
    }

    render() {
        var date: Date;
        if (!(this.props.date instanceof Date)) {
            date = new Date(this.props.date as string);
        } else {
            date = this.props.date as Date;
        }
        return (
            <ButtonGroup fill className="popover-trigger">
                <Input
                    value={getDateFormatted(date)}
                    fill
                    onChange={() => { }}
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
import Cascade, { Component, observable } from 'cascade';

export interface ITimePickerProps {
    minuteInterval?: number;
    value: Date;
    onChange: (event: Event, date: Date) => any;
    utc?: boolean;
}

function getState(value: Date, utc: boolean) {
    let currentHour = utc ? value.getUTCHours() : value.getHours();
    let currentMinute = utc ? value.getUTCMinutes() : value.getMinutes();
    let currentMeridiem = currentHour > 11 ? true : false;
    currentHour = ((currentHour + 12 - 1) % 12) + 1;

    return {
        hours: currentHour,
        minutes: currentMinute,
        meridiem: currentMeridiem
    };
}

export default class TimePicker extends Component<ITimePickerProps> {

    onChangeHour = (event: Event) => {
        let {
            value,
            utc
        } = this.props;
        let date: Date = new Date(value ? value.toUTCString() : undefined);

        let state = getState(date, utc);

        let hours = parseInt((event.target as any).value);
        hours %= 12;
        hours = state.meridiem ? hours + 12 : hours;
        date.setHours(hours);

        if (this.props.onChange) {
            this.props.onChange(event, date);
        }
    }

    onChangeMinute = (event: Event) => {
        let {
            value
        } = this.props;
        let date: Date = new Date(value ? value.toUTCString() : undefined);
        let minutes = parseInt((event.target as any).value);
        date.setMinutes(minutes);
        if (this.props.onChange) {
            this.props.onChange(event, date);
        }
    }

    onChangeMeridiem = (event: Event) => {
        let {
            value,
            utc
        } = this.props;
        let date: Date = new Date(value ? value.toUTCString() : undefined);

        let state = getState(value, utc);

        let meridiemValue = (event.target as any).value;
        let meridiem: boolean;
        switch (meridiemValue) {
            case 'AM':
                meridiem = false;
                break;
            case 'PM':
                meridiem = true;
                break;
        }
        let hours = state.hours % 12;
        hours = meridiem ? hours + 12 : hours;
        date.setHours(hours);
        if (this.props.onChange) {
            this.props.onChange(event, date);
        }
    }

    render() {
        let {
            value,
            utc,
            minuteInterval
        } = this.props;

        let state = getState(value, utc);
        minuteInterval = minuteInterval || 1;

        let hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let minutes = [];
        for (let index = 0; index < 60; index += minuteInterval) {
            minutes.push(index);
        }

        return (
            <span>
                <select
                    className="select"
                    value={'' + state.hours}
                    onchange={this.onChangeHour}
                >
                    {hours.map((hour) => <option value={'' + hour} key={hour}>{prependZero(hour)}</option>)}
                </select>
                <select
                    className="select"
                    value={'' + state.minutes}
                    onchange={this.onChangeMinute}
                >
                    {minutes.map((minute) => <option value={minute} key={minute}>{prependZero(minute)}</option>)}
                </select>
                <select
                    className="select"
                    value={state.meridiem ? 'PM' : 'AM'}
                    onchange={this.onChangeMeridiem}
                >
                    <option value="AM" key="AM">AM</option>
                    <option value="PM" key="PM">PM</option>
                </select>
            </span>
        );
    }
}

function prependZero(value: number) {
    let output = '' + value;
    if (output.length < 2) {
        return '0' + output;
    } else {
        return output;
    }
}
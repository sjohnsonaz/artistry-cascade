import Cascade, { Component, observable } from 'cascade';

export interface ITimePickerProps {
    minuteInterval?: number;
    value: Date;
    onChange: (event: Event, date: Date) => any;
    utc?: boolean;
}

export default class TimePicker extends Component<ITimePickerProps> {
    @observable hours: number;
    @observable minutes?: number;
    @observable meridiem?: boolean;

    constructor(props?: ITimePickerProps, children?: any[]) {
        super(props, children);
        let {
            value,
            utc
        } = props;

        let currentHour = utc ? value.getUTCHours() : value.getHours();
        let currentMinute = utc ? value.getUTCMinutes() : value.getMinutes();
        let currentMeridiem = currentHour > 11 ? true : false;
        currentHour = ((currentHour - 1) % 12) + 1;

        this.hours = currentHour;
        this.minutes = currentMinute;
        this.meridiem = currentMeridiem;
    }

    onChangeHour = (event: Event) => {
        let {
            value
        } = this.props;
        let date: Date = new Date(value ? value.toUTCString() : undefined);

        let hours = parseInt((event.target as any).value);
        hours %= 12;
        hours = this.meridiem ? hours + 12 : hours;
        date.setHours(hours);
        this.hours = hours;

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
        this.minutes = minutes;
        if (this.props.onChange) {
            this.props.onChange(event, date);
        }
    }

    onChangeMeridiem = (event: Event) => {
        let {
            value
        } = this.props;
        let date: Date = new Date(value ? value.toUTCString() : undefined);

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
        let hours = this.hours % 12;
        hours = meridiem ? hours + 12 : hours;
        date.setHours(hours);
        this.meridiem = meridiem;
        if (this.props.onChange) {
            this.props.onChange(event, date);
        }
    }

    afterProps(updating: boolean) {
        if (updating) {
            let {
                value,
                utc
            } = this.props;

            let currentHour = utc ? value.getUTCHours() : value.getHours();
            let currentMinute = utc ? value.getUTCMinutes() : value.getMinutes();
            let currentMeridiem = currentHour > 11 ? true : false;
            currentHour = ((currentHour + 12 - 1) % 12) + 1;

            this.hours = currentHour;
            this.minutes = currentMinute;
            this.meridiem = currentMeridiem;
        }
    }

    render() {
        let {
            minuteInterval
        } = this.props;
        minuteInterval = minuteInterval || 1;

        let hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let minutes = [];
        for (let index = 0; index < 60; index += minuteInterval) {
            minutes.push(index);
        }

        return (
            <span>
                <select
                    className="input"
                    value={'' + this.hours}
                    onChange={this.onChangeHour}
                >
                    {hours.map((hour) => <option value={'' + hour} key={hour}>{prependZero(hour)}</option>)}
                </select>
                <select
                    className="input"
                    value={'' + this.minutes}
                    onChange={this.onChangeMinute}
                >
                    {minutes.map((minute) => <option value={minute} key={minute}>{prependZero(minute)}</option>)}
                </select>
                <select
                    className="input"
                    value={this.meridiem ? 'PM' : 'AM'}
                    onChange={this.onChangeMeridiem}
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
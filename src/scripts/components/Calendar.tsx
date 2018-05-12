import Cascade, { Component, observable } from 'cascade';

import Button from './Button';

type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

var monthNames: Month[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export interface ICalendarProps {
    date?: Date;
    onSelect?: (date: Date) => any;
}

export default class Calendar extends Component<ICalendarProps> {
    @observable month: number;
    @observable year: number;
    @observable date: Date;

    constructor(props?: ICalendarProps) {
        super(props);
        var date = this.props.date || new Date(Date.now());
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.date = date;
    }

    increaseMonth = () => {
        this.month = (this.month + 1) % 12;
    }

    decreaseMonth = () => {
        this.month = (this.month + 11) % 12;
    }

    increaseYear = () => {
        this.year = this.year + 1;
    }

    decreaseYear = () => {
        this.year = this.year - 1;
    }

    selectDay = (day) => {
        if (this.props.onSelect) {
            this.props.onSelect(day);
        }
    }

    getDays(year: number, month: number) {
        var firstDay = new Date(year, month, 1);
        var lastDay = new Date(year, month + 1, 0);

        var days = [firstDay];
        for (var index = 2, length = lastDay.getDate(); index < length; index++) {
            days.push(new Date(year, month, index));
        }
        days.push(lastDay);

        return days;
    }

    getWeeks(year: number, month: number) {
        var days = this.getDays(year, month);

        var weeks: Date[][] = [];
        var week: Date[];

        if (days[0].getDay() !== 0) {
            week = [];
            weeks.push(week);
        }
        days.forEach(function (day) {
            if (day.getDay() === 0) {
                week = [];
                weeks.push(week);
            }
            week.push(day);
        });

        return weeks;
    }

    render() {
        var weeks = this.getWeeks(this.year, this.month);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let todayTime = today.getTime();
        return (
            <div className="calendar">
                <div className="calendar-title">
                    <div className="calendar-year-title">
                        <Button className="calendar-year-down" onclick={this.decreaseYear}>-</Button>
                        <strong className="calendar-year-name">{this.year}</strong>
                        <Button className="calendar-year-up" onclick={this.increaseYear}>+</Button>
                    </div>
                    <div className="calendar-month-title">
                        <Button className="calendar-month-down" onclick={this.decreaseMonth}>-</Button>
                        <strong className="calendar-month-name">{monthNames[this.month]}</strong>
                        <Button className="calendar-month-up" onclick={this.increaseMonth}>+</Button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>S</th>
                            <th>M</th>
                            <th>T</th>
                            <th>W</th>
                            <th>T</th>
                            <th>F</th>
                            <th>S</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeks.map((week, index, array) => {
                            return (
                                <tr key={this.year + ' ' + this.month + ' ' + index}>
                                    {index === 0 && week.length < 7 ?
                                        <td colSpan={7 - week.length}></td>
                                        : undefined}
                                    {week.map((day, index, array) => {
                                        let time = day.getTime();
                                        var selected = this.props.date && this.props.date.getTime() === time;
                                        var current = todayTime === time;
                                        let dayClassName = undefined;
                                        if (selected) {
                                            dayClassName = 'calendar-day-selected';
                                        } else if (current) {
                                            dayClassName = 'calendar-day-current';
                                        }
                                        return (
                                            <td key={this.year + ' ' + this.month + ' ' + index}>
                                                <a className={dayClassName} onClick={this.selectDay.bind(this, day)}>{day.getDate()}</a>
                                            </td>
                                        );
                                    })}
                                    {index > 0 && week.length < 7 ?
                                        <td colSpan={7 - week.length}></td>
                                        : undefined}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

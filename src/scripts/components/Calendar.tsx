import Cascade, { Component, observable } from 'cascade';

import Button from './Button';
import ButtonGroup from './ButtonGroup';

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

    constructor() {
        super();
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
        let years = [];
        let year = this.year;
        for (let index = -100, length = 200; index <= length; index++) {
            years.push(year + index);
        }
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let todayTime = today.getTime();
        return (
            <div className="calendar">
                <div className="calendar-title">
                    <ButtonGroup>
                        <Button onclick={this.decreaseYear}>-</Button>
                        <select
                            className="select"
                            style="flex-grow: 1;"
                            value={this.year.toString()}
                            onchange={(event) => {
                                this.year = parseInt((event.target as any).value);
                            }}>
                            {years.map(year => <option value={year} key={year}>{year}</option>)}
                        </select>
                        <Button onclick={this.increaseYear}>+</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onclick={this.decreaseMonth}>-</Button>
                        <select className="select" style="flex-grow: 1;"
                            value={this.month as any}
                            onchange={(event) => {
                                this.month = parseInt((event.target as any).value);
                            }}>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        <Button onclick={this.increaseMonth}>+</Button>
                    </ButtonGroup>
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
                                                <a className={dayClassName} onclick={this.selectDay.bind(this, day)}>{day.getDate()}</a>
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

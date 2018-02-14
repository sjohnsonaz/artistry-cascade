import Cascade, { Component } from 'cascade';

import { DatePicker, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ICalendarViewProps {

}

export default class CalendarView extends Component<ICalendarViewProps> {
    render() {
        return (
            <Section title="Calendar">
                <DatePicker date={new Date(Date.now())} onSelect={() => { }} />
            </Section>
        );
    }
}

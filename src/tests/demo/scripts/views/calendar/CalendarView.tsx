import Cascade, { Component, observable } from 'cascade';

import { DatePicker, FormGroup, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface ICalendarViewProps {

}

export default class CalendarView extends Component<ICalendarViewProps> {
    @observable date: Date = undefined;

    render() {
        return (
            <Section header="Calendar" headerSpace>
                <FormGroup
                    label="Calendar">
                    <DatePicker date={this.date} onSelect={(date) => {
                        this.date = date;
                    }} />
                </FormGroup>
            </Section>
        );
    }
}

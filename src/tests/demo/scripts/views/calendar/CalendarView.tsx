import Cascade, { Component, observable } from 'cascade';

import { DatePicker, FormContainer, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface ICalendarViewProps {

}

export default class CalendarView extends Component<ICalendarViewProps> {
    @observable date: Date = undefined;

    render() {
        return (
            <Section header="Calendar">
                <FormContainer
                    label="Calendar">
                    <DatePicker date={this.date} onSelect={(date) => {
                        this.date = date;
                    }} />
                </FormContainer>
            </Section>
        );
    }
}

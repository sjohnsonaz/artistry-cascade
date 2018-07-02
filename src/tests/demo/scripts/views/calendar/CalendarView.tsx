import Cascade, { Component } from 'cascade';

import { DatePicker, FormContainer, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ICalendarViewProps {

}

export default class CalendarView extends Component<ICalendarViewProps> {
    render() {
        return (
            <Section header="Calendar">
                <FormContainer
                    label="Calendar">
                    <DatePicker date={new Date(Date.now())} onSelect={() => { }} fill />
                </FormContainer>
            </Section>
        );
    }
}

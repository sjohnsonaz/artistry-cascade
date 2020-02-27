import Cascade, { Component } from 'cascade';

import { Scrollable, Section, CardContainer, Card } from '../../../../../scripts/modules/ArtistryCascade';

export interface IScrollableViewProps {

}

export default class ScrollableView extends Component<IScrollableViewProps> {
    bottom = async () => {
        console.log('bottom!');
    }

    render() {
        let values = [];
        for (let index = 0; index < 100; index++) {
            values.push(index);
        }
        return (
            <Section header="Scrollable" headerSpace>
                <Scrollable type="y" height="200px" bumper={10} onBottomEnter={this.bottom}>
                    <CardContainer space>
                        {values.map((value, index) => <Card key={index}
                            header="Card"
                            space
                        >
                            {value}
                        </Card>)}
                    </CardContainer>
                </Scrollable>
            </Section>
        );
    }
}
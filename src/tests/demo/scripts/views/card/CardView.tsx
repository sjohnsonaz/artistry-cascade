import Cascade, { Component, observable } from 'cascade';

import { Button, Card, CardContainer, Cell, Closeable, Fillable, Grid, Row, Section } from '../../../../../scripts/modules/ArtistryCascade';

import VerticalCard from './VerticalCard';

export interface ICardViewProps {

}

export default class CardView extends Component<ICardViewProps> {
    @observable closed: boolean = false;
    @observable filled: boolean = false;

    toggleClosed = () => {
        this.closed = !this.closed;
    }

    toggleFilled = () => {
        this.filled = !this.filled;
    }

    render() {
        return (
            <Section header="Card" space>
                <h3>Card</h3>
                <CardContainer>
                    <VerticalCard />
                    <Fillable card filled={this.filled}>
                        <Card grid space fill>
                            <Row>
                                <Cell>
                                    Card Content
                            </Cell>
                                <Cell>
                                    <Button onClick={this.toggleClosed}>Expand</Button>
                                    <Button onClick={this.toggleFilled}>Fill</Button>
                                </Cell>
                            </Row>
                            <Closeable closed={this.closed}>
                                <Grid>
                                    <Row>
                                        <Cell>
                                            Card Content
                                </Cell>
                                    </Row>
                                </Grid>
                            </Closeable>
                        </Card>
                    </Fillable>
                </CardContainer>
            </Section>
        );
    }
}
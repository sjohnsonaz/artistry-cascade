import Cascade, { Component, observable } from 'cascade';

import { Button, Card, Cell, Closeable, Fillable, Grid, Row, Section } from '../../../../../scripts/modules/CascadeComponents';

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
                <Fillable filled={this.filled}>
                    <Card grid space fill>
                        <Row>
                            <Cell>
                                Card Content
                        </Cell>
                            <Cell>
                                <Button onclick={this.toggleClosed}>Expand</Button>
                                <Button onclick={this.toggleFilled}>Fill</Button>
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
            </Section>
        );
    }
}
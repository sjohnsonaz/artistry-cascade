import Cascade, { Component, observable } from 'cascade';

import { Button, Card, Cell, Closeable, Grid, Row, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ICardViewProps {

}

export default class CardView extends Component<ICardViewProps> {
    @observable closed: boolean = false;

    toggle = () => {
        this.closed = !this.closed;
    }

    render() {
        return (
            <Section header="Card" space>
                <h3>Card</h3>
                <Card grid space>
                    <Row>
                        <Cell>
                            Card Content
                        </Cell>
                        <Cell>
                            <Button onclick={this.toggle}>Expand</Button>
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
            </Section>
        );
    }
}
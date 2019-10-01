import Cascade, { Component, observable } from 'cascade';

import { Button, Card, CardCarousel, CardContainer, CardControl, CardSection, Cell, Closeable, Fillable, Grid, Row, Section } from '../../../../../scripts/modules/ArtistryCascade';

import VerticalCard from './VerticalCard';

export interface ICardViewProps {

}

export default class CardView extends Component<ICardViewProps> {
    @observable closed: boolean = false;
    @observable filled: boolean = false;
    @observable index: number = 0;

    toggleClosed = () => {
        this.closed = !this.closed;
    }

    toggleFilled = () => {
        this.filled = !this.filled;
    }

    clickNext = () => {
        this.index++;
    }

    clickPrevious = () => {
        this.index--;
    }

    render() {
        return (
            <Section header="Card" space headerSpace>
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
                <Card type="success" handle="left" square>
                    <CardSection multiColumn>
                        <CardControl title="Title 1">Data 1</CardControl>
                        <CardControl title="Title 2">Data 2</CardControl>
                        <CardControl title="Title 3">Data 3</CardControl>
                        <CardControl title="Title 4">Data 4</CardControl>
                    </CardSection>
                </Card>
                <div>
                    <Button onclick={this.clickPrevious}>&lt;</Button>
                    <CardCarousel activeIndex={this.index}>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                    </CardCarousel>
                    <Button onclick={this.clickNext}>&gt;</Button>
                </div>
            </Section>
        );
    }
}
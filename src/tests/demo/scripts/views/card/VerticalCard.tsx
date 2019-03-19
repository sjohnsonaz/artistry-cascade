import Cascade, { Component, observable } from 'cascade';

import { Button, Card, Cell, Closeable, Grid, Row } from '../../../../../scripts/modules/ArtistryCascade';

import ImageGenerator from '../../util/ImageGenerator';

export interface IVerticalCardProps {

}

export default class VerticalCard extends Component<IVerticalCardProps> {
    image: string = ImageGenerator.createPlaceholder(350, 150);
    @observable closed = true;

    toggleClosed = () => {
        this.closed = !this.closed;
    }

    render() {
        return (
            <Card
                header={<span>Card Content</span>}
                nav={<Button onclick={this.toggleClosed}>Expand</Button>}
                grid
            >
                <Row>
                    <Cell>
                        <img src={this.image} />
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        Card Content
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
        );
    }
}
import Cascade, { Component, observable } from 'cascade';

import { Cell, Grid, List, Row, Search, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface ITableViewProps {

}

interface IListData {
    ingredient: string;
    quantity: string | number;
    unit: string;
}

let data: IListData[] = [{
    ingredient: 'Potato',
    quantity: '8 - 10',
    unit: 'potato'
}, {
    ingredient: 'Salt',
    quantity: 1,
    unit: 'teaspoon'
}, {
    ingredient: 'Butter',
    quantity: '2',
    unit: 'tablespoon'
}, {
    ingredient: 'Pepper',
    quantity: 1,
    unit: 'dash'
}, {
    ingredient: 'Hot Milk',
    quantity: '1/4',
    unit: 'cup'
}];

export default class TableView extends Component<ITableViewProps> {
    render() {
        return (
            <Section header="List">
                <Grid space>
                    <Row>
                        <Cell>
                            <Search
                                options={[
                                    'Option 1',
                                    'Option 2',
                                    'Option 3'
                                ]}
                                showOptions
                                fill
                            ></Search>
                        </Cell>
                    </Row>
                </Grid>
                <List
                    data={data}
                    template={item => item.ingredient}
                />
            </Section>
        );
    }
}

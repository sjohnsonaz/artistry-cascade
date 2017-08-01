import Cascade, { Component, observable } from 'cascade';

import { Table, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ITableViewProps {

}

let data = [
    {
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
    }
]

export default class TableView extends Component<ITableViewProps> {
    render() {
        return (
            <Section title="Table">
                <Table
                    data={data}
                    titles={['Ingredient', 'Quantity', 'Unit']}
                />
            </Section>
        );
    }
}

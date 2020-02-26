import Cascade, { Component, observable } from 'cascade';

import { Table, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface ITableViewProps {

}

interface ITableData {
    ingredient: string;
    quantity: string | number;
    unit: string;
}

let data: ITableData[] = [{
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
            <Section header="Table" headerSpace>
                <Table
                    id="table-component"
                    data={data}
                    columns={[{
                        header: 'Ingredient',
                        property: 'ingredient'
                    }, {
                        header: 'Quantity',
                        property: 'quantity',
                        template: item => <td><strong>{item.quantity}</strong></td>
                    }, {
                        header: 'Unit',
                        property: 'unit'
                    }]}
                />
            </Section>
        );
    }
}

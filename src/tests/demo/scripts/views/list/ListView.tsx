import Cascade, { Component, observable } from 'cascade';

import { List, Section } from '../../../../../scripts/modules/CascadeComponents';

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
            <Section title="List">
                <List
                    data={data}
                    template={item => item.ingredient}
                />
            </Section>
        );
    }
}

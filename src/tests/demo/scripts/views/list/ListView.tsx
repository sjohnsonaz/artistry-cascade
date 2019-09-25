import Cascade, { Component, observable } from 'cascade';

import { Cell, Grid, Icon, List, Row, Search, Section } from '../../../../../scripts/modules/ArtistryCascade';
import { wait } from '../../../../../scripts/util/PromiseUtil';

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
}, {
    ingredient: 'Scallions',
    quantity: '1/8',
    unit: 'cup'
}, {
    ingredient: 'Cheese',
    quantity: '1/8',
    unit: 'cup'
}];

export default class TableView extends Component<ITableViewProps> {
    @observable searchValue: string = '';
    @observable showOptions?: boolean = false;
    @observable options?: IListData[] = [];

    onChange = async (event: Event) => {
        this.searchValue = (event.target as any).value;
        await wait(1000);
        this.showOptions = true;
        this.options = data;
    }

    onSelectOption = (event: KeyboardEvent | MouseEvent, value?: string) => {
        this.searchValue = value;
        this.showOptions = false;
    }

    onSearch = (event: KeyboardEvent | MouseEvent, value?: string) => {
        this.searchValue = value;
        this.showOptions = false;
    };

    onClose = (event: Event) => {
        this.showOptions = false;
    }

    altAction?: (option: string) => any;

    render() {
        return (
            <Section header="List">
                <Grid space>
                    <Row>
                        <Cell>
                            <Search
                                value={this.searchValue}
                                options={[
                                    'Option 1',
                                    'Option 2',
                                    'Option 3'
                                ]}
                                showOptions={this.showOptions}
                                onChange={this.onChange}
                                onSelectOption={this.onSelectOption}
                                onSearch={this.onSearch}
                                onClose={this.onClose}
                                altAction={this.altAction}
                                fill
                                buttonText={<span className="nowrap"><Icon name="search" /> Search</span>}
                                screenSize="small"
                            ></Search>
                        </Cell>
                    </Row>
                </Grid>
                <List
                    data={this.options}
                    template={item => item.ingredient}
                    active={3}
                    selected={[1, 3, 5]}
                    space
                />
            </Section>
        );
    }
}

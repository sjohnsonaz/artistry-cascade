import Cascade, { Component } from 'cascade';

import Draggable from './Draggable';

export interface ISortableProps {
    items: any[];
}

export default class Sortable extends Component<ISortableProps> {
    render() {
        return (
            <div>
                {this.props.items.map((item) => {
                    <Draggable item={item} />
                })}
            </div>
        );
    }
}

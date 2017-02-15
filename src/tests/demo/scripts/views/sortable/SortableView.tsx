import Cascade, { Component } from 'cascade';

import Draggable from '../../../../../scripts/components/Draggable';
import Sortable from '../../../../../scripts/components/Sortable';

export interface ISortableViewProps {

}

export default class SortableView extends Component<ISortableViewProps>{
    render() {
        return (
            <Sortable items={[1]} />
        );
    }
}

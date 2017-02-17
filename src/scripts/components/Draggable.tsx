import Cascade, { Component, observable } from 'cascade';

export interface IDraggableProps {
    item: any;
}

export default class Draggable extends Component<IDraggableProps> {
    @observable dragging: boolean = false;

    onDrag = () => {
        this.dragging = true;
    }

    onDragEnd = () => {
        this.dragging = false;
    }

    render() {
        return (
            <div
                draggable
                ondrag={this.onDrag}
                ondragend={this.onDragEnd}>
                {this.props.item}
            </div>
        );
    }
}

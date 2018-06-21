import Cascade, { Component } from 'cascade';

export type GridSize = 'default' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface IGridProps {
    className?: string;
    id?: string;
    columns?: number;
    size?: GridSize;
    space?: boolean;
}

export default class Grid extends Component<IGridProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        grid(classNames, this.props.columns, this.props.size, this.props.space);
        let className = classNames.join(' ');
        return <div className={className} id={this.props.id}>{this.children}</div>
    }
}

function grid(classNames: string[], columns: number, size?: GridSize, space?: boolean) {
    columns = columns || 12;
    switch (size) {
        case 'x-small':
            classNames.push('grid-xs-' + columns);
            break;
        case 'small':
            classNames.push('grid-sm-' + columns);
            break;
        case 'medium':
            classNames.push('grid-md-' + columns);
            break;
        case 'large':
            classNames.push('grid-lg-' + columns);
            break;
        case 'x-large':
            classNames.push('grid-xl-' + columns);
            break;
        default:
            classNames.push('grid-' + columns);
            break;
    }

    if (space) {
        classNames.push('grid-space');
    }
}

export interface IGridExternalProps {
    grid?: boolean;
    gridColumns?: number;
    gridSize?: GridSize;
    gridSpace?: boolean;
}

export function gridConfig(classNames: string[], props: IGridExternalProps) {
    grid(classNames, props.gridColumns, props.gridSize, props.gridSpace);
}
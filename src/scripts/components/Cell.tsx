import Cascade, { Component } from 'cascade';

import { alignClass, AlignType } from '../util/Align';

export interface ICellProps {
    className?: string;
    id?: string;
    columns?: number;
    offset?: number;
    align?: AlignType;
}

export default class Cell extends Component<ICellProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        if (this.props.columns) {
            classNames.push('col-' + this.props.columns);
        } else {
            classNames.push('col');
        }
        if (this.props.offset) {
            classNames.push('offset-' + this.props.offset);
        }
        if (this.props.align) {
            alignClass(this.props.align, classNames);
        }
        let className = classNames.join(' ');
        return <div className={className} id={this.props.id}>{this.children}</div>
    }
}
import Cascade, { Component } from 'cascade';

export type AlignType = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';

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
            switch (this.props.align) {
                case 'start':
                    classNames.push('align-start');
                    break;
                case 'end':
                    classNames.push('align-end');
                    break;
                case 'left':
                    classNames.push('align-left');
                    break;
                case 'right':
                    classNames.push('align-right');
                    break;
                case 'center':
                    classNames.push('align-center');
                    break;
                case 'justify':
                    classNames.push('align-justify');
                    break;
                case 'initial':
                    classNames.push('align-initial');
                    break;
                case 'inherit':
                    classNames.push('align-inherit');
                    break;
            }
        }
        let className = classNames.join(' ');
        return <div className={className} id={this.props.id}>{this.children}</div>
    }
}
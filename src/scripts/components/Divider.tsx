import Cascade, { Component } from 'cascade';

export interface IDividerProps {
    className?: string;
    id?: string;
}

export default class Divider extends Component<IDividerProps>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('divider');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.children}</div>
    }
}
import Cascade, { Component } from 'cascade';

export interface ISpacerProps {
    className?: string;
    id?: string;
}

export default class Spacer extends Component<ISpacerProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('menu-spacer');
        return (
            <li className={classNames.join(' ')} id={this.props.id}></li>
        );
    }
}

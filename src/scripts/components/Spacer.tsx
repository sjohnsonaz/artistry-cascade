import Cascade, { Component } from 'cascade';
import ClassNames from '../util/ClassNames';

export interface ISpacerProps {
    className?: string;
    id?: string;
    list?: boolean;
}

export default class Spacer extends Component<ISpacerProps> {
    render() {
        let {
            className,
            id,
            list
        } = this.props;
        let classNames = new ClassNames(className, 'spacer');
        if (list) {
            return (
                <li className={classNames.toString()} id={id}></li>
            );
        } else {
            return (
                <div className={classNames.toString()} id={id}></div>
            );
        }
    }
}

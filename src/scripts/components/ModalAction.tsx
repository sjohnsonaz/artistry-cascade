import Cascade, { Component } from 'cascade';

export interface IModalActionProps {
    id?: string;
    className: string;
}

export default class ModalAction extends Component<IModalActionProps> {
    render() {
        let {
            id,
            className
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('modal');

        return (
            <div className={classNames.join(' ')} id={id}>
                {this.children}
            </div>
        )
    }
}
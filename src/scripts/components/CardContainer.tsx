import Cascade, { Component } from 'cascade';

export interface ICardContainerProps {
    id?: string;
    className?: string;
    space?: boolean;
}

export default class CardContainer extends Component<ICardContainerProps> {
    render() {
        let {
            id,
            className,
            space
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-container');

        if (space) {
            classNames.push('space');
        }

        return (
            <div className={classNames.join(' ')} id={id}>
                {this.children}
            </div>
        )
    }
}
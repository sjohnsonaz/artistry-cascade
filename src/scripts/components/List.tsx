import Cascade, { Component } from 'cascade';

export interface IListProps<T> {
    id?: string;
    className?: string;
    data: T[];
    space?: boolean;
    template?: (item: T) => any;
}

export default class List<T> extends Component<IListProps<T>> {
    render() {
        let {
            className,
            id,
            data,
            space,
            template
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('list');

        if (space) {
            classNames.push('list-space');
        }

        return (
            <ul className={classNames.join(' ')} id={id}>
                {data ? data.map(item => <li>
                    {template ? template(item) : item}
                </li>) : undefined}
            </ul>
        )
    }
}
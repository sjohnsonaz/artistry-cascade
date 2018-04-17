import Cascade, { Component } from 'cascade';

export interface IColumn<T> {
    property?: string;
    title?: string | (() => any);
    template?: (item: T) => any;
    hidden?: false;
}

export interface ITableProps<T> {
    className?: string;
    id?: string;
    data: T[];
    titles?: any[];
    columns?: IColumn<T>[];
    template?: (item: T) => any;
}

export default class Table<T> extends Component<ITableProps<T>> {
    render() {
        let {
            className,
            id,
            data,
            titles,
            columns,
            template
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('table');

        let renderedTitles = titles || columns.map(column => {
            if (typeof column.title === 'function') {
                return column.title();
            } else {
                return column.title
            }
        });

        let renderedBody;
        if (template) {
            renderedBody = data.map(item => template(item));
        } else if (columns) {
            renderedBody = data.map(item => (
                <tr>
                    {columns.map(column => {
                        if (column.template) {
                            return column.template(item);
                        } else if (column.property) {
                            return <td>{item[column.property]}</td>
                        } else {
                            return <td></td>
                        }
                    })}
                </tr>
            ));
        } else {
            renderedBody = data.map(item => (
                <tr>
                    {Object.values(item).map(value => <td>{value}</td>)}
                </tr>
            ));
        }

        return (
            <table className={classNames.join(' ')} id={id}>
                {renderedTitles ?
                    <thead>
                        <tr>
                            {renderedTitles.map(title => <th>{title}</th>)}
                        </tr>
                    </thead>
                    : undefined}
                <tbody>
                    {renderedBody}
                </tbody>
                <tfoot>
                    <tr>
                    </tr>
                </tfoot>
            </table>
        );
    }
}

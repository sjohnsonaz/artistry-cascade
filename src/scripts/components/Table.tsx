import Cascade, { Component } from 'cascade';

export interface IColumn<T> {
    property?: string;
    header?: string | (() => any);
    footer?: string | (() => any);
    template?: (item: T) => any;
    hidden?: boolean;
}

export interface ITableProps<T> {
    className?: string;
    id?: string;
    data: T[];
    headers?: any[];
    footers?: any[];
    columns?: IColumn<T>[];
    template?: (item: T) => any;
    list?: boolean;
}

export default class Table<T> extends Component<ITableProps<T>> {
    render() {
        let {
            className,
            id,
            data,
            headers,
            columns,
            template
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('table');

        let renderedTitles = headers || columns.map(column => {
            if (typeof column.header === 'function') {
                return column.header();
            } else {
                return column.header
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
                <tbody className={this.props.list ? 'list' : ''}>
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

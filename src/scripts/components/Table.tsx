import Cascade, { Component, Elements } from 'cascade';

export interface ITableProps {
    className?: string;
    id?: string;
    data: any[];
    titles?: any[];
}

export default class Table extends Component<ITableProps> {
    render() {
        let {
            className,
            id,
            data,
            titles
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('table');

        return (
            <table className={classNames.join(' ')} id={id}>
                {titles ?
                    <thead>
                        <tr>
                            {titles.map(title => <th>{title}</th>)}
                        </tr>
                    </thead>
                    : undefined}
                <tbody>
                    {data.map((item) => {
                        let cells = [];
                        for (var name in item) {
                            if (item.hasOwnProperty(name)) {
                                cells.push(<td>{item[name]}</td>);
                            }
                        }
                        return (
                            <tr>
                                {cells}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                    </tr>
                </tfoot>
            </table>
        );
    }
}

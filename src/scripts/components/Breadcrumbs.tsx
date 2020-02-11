import Cascade, { Component } from 'cascade';

export interface IBreadcrumbs {
    id?: string;
    className?: string;
}

export default class Breadcrumbs extends Component<IBreadcrumbs> {
    render() {
        let {
            id,
            className
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('breadcrumbs');

        return (
            <div
                className={classNames.join(' ')}
                id={id}
            >
                {this.children}
            </div>
        );
    }
}
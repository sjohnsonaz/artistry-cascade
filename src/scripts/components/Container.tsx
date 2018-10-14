import Cascade, { Component } from 'cascade';

export type ContainerSize = 'default' | 'all' | 'small' | 'medium' | 'large' | 'x-large';

export interface IContainerProps {
    className?: string;
    id?: string;
    menuBarTop?: boolean;
    size?: ContainerSize;
}

export default class Container extends Component<IContainerProps>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('container');

        if (this.props.menuBarTop) {
            classNames.push('container-menu-bar-top');
        }

        switch (this.props.size) {
            case 'all':
                classNames.push('container-all');
                break;
            case 'small':
                classNames.push('container-sm');
                break;
            case 'medium':
                classNames.push('container-md');
                break;
            case 'large':
                classNames.push('container-lg');
                break;
            case 'x-large':
                classNames.push('container-xl');
                break;
        }

        return <div className={classNames.join(' ')} id={this.props.id}>{this.children}</div>
    }
}

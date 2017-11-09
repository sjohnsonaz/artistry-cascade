import Cascade, { Component, observable } from 'cascade';

import Carousel from './Carousel';

export interface ITabTitleProps {
    className?: string;
    id?: string;
    title: any;
    active?: boolean;
    onSelectPanel?: (event: MouseEvent) => boolean | void;
}

export default class TabTitle extends Component<ITabTitleProps> {
    selectPanel = (event: MouseEvent) => {
        if (this.props.onSelectPanel) {
            return this.props.onSelectPanel(event);
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('tab-title');

        if (this.props.active) {
            classNames.push('tab-active');
        }

        return (
            <li className={classNames.join(' ')} id={this.props.id}>
                <a onclick={this.selectPanel}>{this.props.title}</a>
            </li>
        );
    }
}

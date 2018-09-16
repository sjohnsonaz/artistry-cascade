import Cascade, { Component, observable } from 'cascade';

import Carousel from './Carousel';
import { ScrollableType } from './Scrollable';

export interface ITabProps {
    className?: string;
    id?: string;
    titles: any[];
    activeIndex?: number;
    onSelectPanel?: (index) => void;
    animated?: boolean;
    fade?: boolean;
    safe?: boolean;
    space?: boolean;
    staticHeight?: boolean;
    fillHeight?: boolean;
    scroll?: ScrollableType;
}

export default class Tab extends Component<ITabProps> {
    @observable activeIndex: number = this.props.activeIndex || 0;

    selectPanel(index: number) {
        if (this.props.onSelectPanel) {
            this.props.onSelectPanel(index);
        } else {
            this.activeIndex = index;
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('tab-container');

        let activeIndex = typeof this.props.activeIndex !== 'undefined' ?
            this.props.activeIndex :
            (this.activeIndex || 0);

        if (this.props.space) {
            classNames.push('tab-space');
        }

        if (this.props.fillHeight) {
            classNames.push('fill-height');
        }

        return (
            <div className={classNames.join(' ')} id={this.props.id}>
                <ul className="tab-header">
                    {this.props.titles ? this.props.titles.map((title, index) => {
                        let className = activeIndex === index ? 'tab-title tab-active' : 'tab-title';
                        return <li className={className}>
                            <a onclick={this.selectPanel.bind(this, index)}>{title}</a>
                        </li>
                    }) : undefined}
                </ul>
                {this.props.animated ?
                    <Carousel
                        className="tab-carousel"
                        activeIndex={activeIndex}
                        safe={this.props.safe}
                        staticHeight={this.props.staticHeight}
                        scroll={this.props.scroll}
                    >
                        {this.children}
                    </Carousel>
                    : <div className="tab-body">
                        {this.children ? this.children.map((child, index) => {
                            let className = activeIndex === index ? 'tab-panel tab-active' : 'tab-panel';
                            return <div className={className}>{child}</div>
                        }) : undefined}
                    </div>
                }
            </div>
        );
    }
}

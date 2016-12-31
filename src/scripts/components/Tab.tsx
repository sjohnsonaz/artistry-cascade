import Cascade, { Component, observable } from 'cascade';

export interface ITabProps {
    titles: any[];
    activeIndex?: number;
    className?: string;
    onSelectPanel?: (index) => void;
}

export default class Tab extends Component<ITabProps> {
    @observable activeIndex: number;

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

        let className = classNames.join(' ');
        return (
            <div className={className}>
                <ul className="tab-header">
                    {this.props.titles ? this.props.titles.map((title, index) => {
                        let className = activeIndex === index ? 'tab-title tab-active' : 'tab-title';
                        return <li className={className}>
                            <a onclick={this.selectPanel.bind(this, index)}>{title}</a>
                        </li>
                    }) : undefined}
                </ul>
                <div className="tab-body">
                    {this.children ? this.children.map((child, index) => {
                        let className = activeIndex === index ? 'tab-panel tab-active' : 'tab-panel';
                        return <div className={className}>{child}</div>
                    }) : undefined}
                </div>
            </div>
        );
    }
}

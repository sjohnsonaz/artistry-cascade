import Cascade, { Component, Elements } from 'cascade';

export interface IProgressBarProps extends Elements.JSXDivElement {
    value: number;
    title?: any;
}

export default class ProgressBar extends Component<IProgressBarProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('progress-bar');

        let value = this.props.value;
        if (value < 0) {
            value = 0;
        }
        if (value > 100) {
            value = 100;
        }
        let style = 'width: ' + value + '%';

        let title = this.props.title || value + '%'

        let className = classNames.join(' ');
        return (
            <div className={className} {...this.props}>
                <div style={style}>
                    {title}
                </div>
            </div>
        );
    }
}

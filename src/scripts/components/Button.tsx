import Cascade, { Component, Elements } from 'cascade';

export interface IButtonProps extends Elements.JSXButtonElement {
    theme?: 'default' | 'primary' | 'danger';
    tooltip?: string;
    tooltipDirection?: 'top' | 'right' | 'bottom' | 'left';
    tooltipOpen?: boolean;
}

export default class Button extends Component<IButtonProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        let injectedProps = {};

        classNames.push('button');
        switch (this.props.theme) {
            case 'primary':
                classNames.push('button-primary');
                break;
            case 'danger':
                classNames.push('button-danger');
                break;
        }

        if (this.props.tooltip) {
            injectedProps['aria-label'] = this.props.tooltip;
            classNames.push('tooltip');
            switch (this.props.tooltipDirection) {
                case 'top':
                    classNames.push('tooltip-top');
                    break;
                case 'right':
                    classNames.push('tooltip-right');
                    break;
                case 'bottom':
                    classNames.push('tooltip-bottom');
                    break;
                case 'left':
                    classNames.push('tooltip-left');
                    break;
                default:
                    classNames.push('tooltip-top');
                    break;
            }
            if (this.props.tooltipOpen) {
                classNames.push('tooltip-open');
            }
        }

        let className = classNames.join(' ');
        return <button {...this.props} className={className} {...injectedProps}>{this.children}</button>
    }
}

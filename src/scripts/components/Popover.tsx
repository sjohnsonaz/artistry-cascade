import Cascade, { Component } from 'cascade';

export interface IPopoverProps {
    direction?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    open?: boolean;
    className?: string;
}

export default class Popover extends Component<IPopoverProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('popover');
        switch (this.props.direction) {
            case 'top':
                classNames.push('popover-top');
                break;
            case 'right':
                classNames.push('popover-right');
                break;
            case 'bottom':
                classNames.push('popover-bottom');
                break;
            case 'left':
                classNames.push('popover-left');
                break;
            default:
                classNames.push('popover-top');
                break;
        }
        switch (this.props.align) {
            case 'top':
                classNames.push('popover-align-top');
                break;
            case 'right':
                classNames.push('popover-align-right');
                break;
            case 'bottom':
                classNames.push('popover-align-bottom');
                break;
            case 'left':
                classNames.push('popover-align-left');
                break;
            default:
                classNames.push('popover-align-center');
                break;
        }
        if (this.props.open) {
            classNames.push('popover-open');
        }
        let className = classNames.join(' ');
        return (
            <div className={className}>
                <div className="popover-content">{this.children}</div>
            </div>
        );
    }
}

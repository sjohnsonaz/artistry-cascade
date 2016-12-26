import Cascade, { Component, Elements } from 'cascade';

import { ITemplate } from './ITemplate';
import Popover from './Popover';

export interface IButtonProps extends Elements.JSXButtonElement {
    theme?: 'default' | 'primary' | 'danger';
    tooltip?: string;
    tooltipDirection?: 'top' | 'right' | 'bottom' | 'left';
    tooltipOpen?: boolean;
    popover?: ITemplate;
    popoverDirection?: 'top' | 'right' | 'bottom' | 'left';
    popoverAlign?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    popoverOpen?: boolean;
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

        if (typeof this.props.tooltip !== 'undefined') {
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

        let popOver;
        if (typeof this.props.popover !== 'undefined') {
            classNames.push('popover-trigger');
            popOver = (
                <Popover
                    align={this.props.popoverAlign}
                    direction={this.props.popoverDirection}
                    open={this.props.popoverOpen}
                    >
                    {typeof this.props.popover === 'function' ?
                        this.props.popover() :
                        this.props.popover
                    }
                </Popover>
            );
        }

        let className = classNames.join(' ');
        return <button {...this.props} className={className} {...injectedProps}>
            {popOver}
            {this.children}
        </button>
    }
}

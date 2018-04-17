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
    popoverMenu?: boolean;
    onPopoverClose?: (event: Event) => boolean | void;
    lockContent?: any;
    locked?: boolean;
    down?: boolean;
}

export default class Button extends Component<IButtonProps> {
    onPopoverClose(event: Event) {
        event.stopPropagation();
        if (this.props.onPopoverClose) {
            this.props.onPopoverClose(event);
        }
    }
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
        let popOverMask;
        if (typeof this.props.popover !== 'undefined') {
            classNames.push('popover-trigger');
            if (this.props.popoverMenu) {
                if (this.props.popoverOpen) {
                    classNames.push('popover-open');
                    if (!this.props.down) {
                        classNames.push('button-down');
                    }
                } else {
                    classNames.push('popover-closed');
                }
                popOverMask = (
                    <div className="popover-mask" onclick={this.onPopoverClose.bind(this)}></div>
                );
            }
            popOver = (
                <Popover
                    align={this.props.popoverAlign}
                    direction={this.props.popoverDirection}
                    open={!this.props.popoverMenu ? this.props.popoverOpen : undefined}
                >
                    {typeof this.props.popover === 'function' ?
                        this.props.popover() :
                        this.props.popover
                    }
                </Popover>
            );
        }

        if (this.props.down) {
            classNames.push('button-down');
        }

        if (this.props.lockContent) {
            classNames.push('button-lockable');
        }

        if (this.props.locked) {
            classNames.push('button-locked');
            injectedProps['disabled'] = true;
        }

        let className = classNames.join(' ');
        return !this.props.popoverMenu ?
            (
                <button {...this.props} className={className} {...injectedProps}>
                    {popOverMask}
                    {popOver}
                    {this.props.lockContent ? [
                        <div className="button-text">{this.children}</div>,
                        <div className="button-spinner">{this.props.lockContent}</div>
                    ] : this.children}
                </button>
            ) : (
                <a {...this.props} className={className} {...injectedProps}>
                    {popOverMask}
                    {popOver}
                    {this.props.lockContent ? [
                        <div className="button-text">{this.children}</div>,
                        <div className="button-spinner">{this.props.lockContent}</div>
                    ] : this.children}
                </a>
            );
    }
}

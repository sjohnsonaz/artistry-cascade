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
        const {
            className,
            id,
            theme,
            down,
            lockContent,
            locked,
            tooltip,
            tooltipDirection,
            tooltipOpen,
            popover,
            popoverAlign,
            popoverDirection,
            popoverMenu,
            popoverOpen,
            onPopoverClose,
            ...props
        } = this.props;

        let classNames = className ? [className] : [];
        let injectedProps = {};

        classNames.push('button');
        switch (theme) {
            case 'primary':
                classNames.push('button-primary');
                break;
            case 'danger':
                classNames.push('button-danger');
                break;
        }

        if (typeof tooltip !== 'undefined') {
            injectedProps['aria-label'] = tooltip;
            classNames.push('tooltip');
            switch (tooltipDirection) {
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
            if (tooltipOpen) {
                classNames.push('tooltip-open');
            }
        }

        let popOver;
        let popOverMask;
        if (typeof popover !== 'undefined') {
            classNames.push('popover-trigger');
            if (popoverMenu) {
                if (popoverOpen) {
                    classNames.push('popover-open');
                    if (!down) {
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
                    align={popoverAlign}
                    direction={popoverDirection}
                    open={!popoverMenu ? popoverOpen : undefined}
                >
                    {typeof popover === 'function' ?
                        popover() :
                        popover
                    }
                </Popover>
            );
        }

        if (down) {
            classNames.push('button-down');
        }

        if (lockContent) {
            classNames.push('button-lockable');
        }

        if (locked) {
            classNames.push('button-locked');
            injectedProps['disabled'] = true;
        }

        return !popoverMenu ?
            (
                <button {...props} className={classNames.join(' ')} id={id} {...injectedProps}>
                    {popOverMask}
                    {popOver}
                    {lockContent ? [
                        <div className="button-text">{this.children}</div>,
                        <div className="button-spinner">{lockContent}</div>
                    ] : this.children}
                </button>
            ) : (
                <a {...props} className={classNames.join(' ')} id={id} {...injectedProps}>
                    {popOverMask}
                    {popOver}
                    {lockContent ? [
                        <div className="button-text">{this.children}</div>,
                        <div className="button-spinner">{lockContent}</div>
                    ] : this.children}
                </a>
            );
    }
}

import Cascade, { Component, Elements } from 'cascade';

import { ITemplate } from './ITemplate';
import Popover from './Popover';
import DepthStack from '../util/DepthStack';

export interface IButtonProps extends Elements.JSXButtonElement {
    id?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    theme?: 'default' | 'primary' | 'danger';
    fill?: boolean;
    tooltip?: string;
    tooltipDirection?: 'top' | 'right' | 'bottom' | 'left';
    tooltipOpen?: boolean;
    popover?: ITemplate;
    popoverDirection?: 'top' | 'right' | 'bottom' | 'left';
    popoverAlign?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    popoverMenu?: boolean;
    popoverOpen?: boolean;
    popoverFill?: boolean;
    onPopoverClose?: (event: Event) => boolean | void;
    lockContent?: any;
    locked?: boolean;
    down?: boolean;
    link?: boolean;
    noTrigger?: boolean;
    noWrap?: boolean;
}

export default class Button extends Component<IButtonProps> {
    private closeHandle: (event: Event) => void;

    close(event: Event) {
        if (this.props.onPopoverClose) {
            this.props.onPopoverClose(event);
        }
    }

    // TODO: Fix leak when popover status changes
    async afterProps(mounted: boolean) {
        if (this.props.popover) {
            if (!this.closeHandle) {
                this.closeHandle = this.close.bind(this);
            }
            if (!mounted) {
                if (this.props.popoverOpen) {
                    DepthStack.push(this.closeHandle);
                }
            } else {
                if (this.props.popoverOpen) {
                    DepthStack.push(this.closeHandle);
                } else {
                    DepthStack.remove(this.closeHandle);
                }
            }
        }
    }

    afterDispose() {
        if (this.props.popoverOpen) {
            DepthStack.remove(this.closeHandle);
        }
    }

    render() {
        const {
            id,
            className,
            type,
            theme,
            fill,
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
            popoverFill,
            onPopoverClose,
            link,
            noTrigger,
            noWrap,
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

        if (fill) {
            classNames.push('fill-width');
        }

        if (noWrap) {
            classNames.push('button-nowrap');
        }

        // Always set button type
        let buttonType = type || 'button';

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
        if (typeof popover !== 'undefined') {
            if (!noTrigger) {
                classNames.push('popover-trigger');
            }
            if (popoverMenu) {
                if (popoverOpen) {
                    classNames.push('popover-open');
                    if (!down) {
                        classNames.push('button-down');
                    }
                } else {
                    classNames.push('popover-closed');
                }
            }
            popOver = (
                <Popover
                    align={popoverAlign}
                    direction={popoverDirection}
                    open={!popoverMenu ? popoverOpen : undefined}
                    fill={popoverFill}
                    preventClick
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

        return !(popoverMenu || link) ?
            (
                <button {...props as any} className={classNames.join(' ')} id={id} type={buttonType} {...injectedProps}>
                    {popOver}
                    {lockContent ?
                        [
                            <div className="button-text">{this.children}</div>,
                            <div className="button-spinner">{lockContent}</div>
                        ] :
                        this.children}
                </button>
            ) : (
                <a {...props as any} className={classNames.join(' ')} id={id} {...injectedProps}>
                    {popOver}
                    {lockContent ?
                        [
                            <div className="button-text">{this.children}</div>,
                            <div className="button-spinner">{lockContent}</div>
                        ] :
                        this.children}
                </a>
            );
    }
}
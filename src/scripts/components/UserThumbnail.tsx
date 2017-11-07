import Cascade, { Component } from 'cascade';

import { ITemplate } from './ITemplate';
import Popover from './Popover';

export interface IUserThumbnailProps {
    className?: string;
    id?: string;
    src?: string;
    size?: 'default' | 'small' | 'medium' | 'large';
    placeholder?: string;
    popover?: ITemplate;
    popoverDirection?: 'top' | 'right' | 'bottom' | 'left';
    popoverAlign?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    popoverOpen?: boolean;
    popoverMenu?: boolean;
    menuBarTop?: boolean;
    onPopoverClose?: (event: Event) => boolean | void;
    onclick?: (event: MouseEvent) => boolean | void;
}

export default class UserThumbnail extends Component<IUserThumbnailProps> {
    onPopoverClose(event: Event) {
        event.stopPropagation();
        if (this.props.onPopoverClose) {
            this.props.onPopoverClose(event);
        }
    }
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('thumbnail');

        switch (this.props.size) {
            case 'small':
                classNames.push('thumbnail-user-small');
                break;
            case 'large':
                classNames.push('thumbnail-user-large');
                break;
            default:
                //case 'medium':
                classNames.push('thumbnail-user-medium');
                break;
        }

        let thumbnail = this.props.src ?
            (
                <img className={classNames.join(' ')} src={this.props.src} />
            ) : (
                <span className={classNames.join(' ')}>{this.props.placeholder}</span>
            );

        if (this.props.popover) {
            let popover = (
                <Popover
                    align={this.props.popoverAlign}
                    direction={this.props.popoverDirection}
                    open={!this.props.popoverMenu ? this.props.popoverOpen : undefined}
                    menuBarTop={this.props.menuBarTop}
                >
                    {typeof this.props.popover === 'function' ?
                        this.props.popover() :
                        this.props.popover
                    }
                </Popover>
            );
            if (this.props.popoverMenu) {
                let triggerClassNames = ['popover-trigger']
                if (this.props.popoverOpen) {
                    triggerClassNames.push('popover-open');
                } else {
                    triggerClassNames.push('popover-closed');
                }
                if (this.props.menuBarTop) {
                    triggerClassNames.push('popover-menu-bar-top');
                }
                let popOverMask = (
                    <div className="popover-mask" onclick={this.onPopoverClose.bind(this)}></div>
                );
                return (
                    <a href="#" className={triggerClassNames.join(' ')} id={this.props.id}
                        onclick={this.props.onclick}
                    >
                        {thumbnail}
                        {popOverMask}
                        {popover}
                    </a>
                )
            } else {
                return (
                    <span className="popover-trigger" id={this.props.id}
                        onclick={this.props.onclick} >
                        {thumbnail}
                        {popover}
                    </span>
                )
            }
        } else {
            thumbnail.props.id = this.props.id;
            return thumbnail;
        }
    }
}
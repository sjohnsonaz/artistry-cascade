import Cascade, { Component } from 'cascade';

import { ITemplate } from './ITemplate';
import Popover from './Popover';

export interface IUserThumbnailProps {
    className?: string;
    src?: string;
    size?: 'default' | 'small' | 'medium' | 'large';
    popover?: ITemplate;
    popoverDirection?: 'top' | 'right' | 'bottom' | 'left';
    popoverAlign?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    popoverOpen?: boolean;
    popoverMenu?: boolean;
    onPopoverClose?: (event: Event) => boolean | void;
}

export default class UserThumbnail extends Component<IUserThumbnailProps> {
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

        let thumbnail = (
            <img className={classNames.join(' ')} src={this.props.src} />
        );

        if (this.props.popover) {
            let popover = (
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

            if (this.props.popoverMenu) {
                return (
                    <a href="#" className="popover-trigger" onclick={this.props.onPopoverClose}>
                        {thumbnail}
                        {popover}
                    </a>
                )
            } else {
                return (
                    <span className="popover-trigger">
                        {thumbnail}
                        {popover}
                    </span>
                )
            }
        } else {
            return thumbnail;
        }
    }
}
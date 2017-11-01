import Cascade, { Component } from 'cascade';

export interface IUserThumbnailProps {
    className?: string;
    src?: string;
    size?: 'default' | 'small' | 'medium' | 'large';
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

        return (
            <img className={classNames.join(' ')} src={this.props.src} />
        )
    }
}
import Cascade, { Component } from 'cascade';

export interface IThumbnailProps {
    className?: string;
    src?: string;
}

export default class Thumbnail extends Component<IThumbnailProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('thumbnail');

        return (
            <img className={classNames.join(' ')} src={this.props.src} />
        )
    }
}
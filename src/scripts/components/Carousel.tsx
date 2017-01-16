import Cascade, { Component, observable } from 'cascade';

export interface ICarouselProps {
    className?: string;
    activeIndex: number;
}

export default class Carousel extends Component<ICarouselProps> {
    render() {
        let {activeIndex} = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('carousel');

        activeIndex = activeIndex || 0;

        let className = classNames.join(' ');
        return (
            <div className={className} style="background-color: black">
                {this.children ? this.children.map((child, index) => {
                    let className = activeIndex === index ? 'carousel-selected' : '';
                    return <div className={className}>{child}</div>
                }) : undefined}
            </div>
        );
    }
}

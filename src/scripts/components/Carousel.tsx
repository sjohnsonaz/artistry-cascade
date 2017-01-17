import Cascade, { Component, observable } from 'cascade';

export interface ICarouselProps {
    className?: string;
    activeIndex: number;
}

export default class Carousel extends Component<ICarouselProps> {
    container: HTMLElement;
    child: HTMLElement;

    containerRef = (container: HTMLElement) => {
        this.container = container;
    }

    childRef = (child: HTMLElement) => {
        this.child = child;
    }

    render() {
        let {activeIndex} = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('carousel');
        classNames.push('carousel-run');

        activeIndex = activeIndex || 0;

        let className = classNames.join(' ');

        window.setTimeout(() => {
            this.container.classList.remove('carousel-run');
        }, 500);

        return (
            <div className={className} style="background-color: black" ref={this.containerRef}>
                {this.children ? this.children.map((child, index) => {
                    let className = activeIndex === index ? 'carousel-selected' : '';
                    return <div className={className}>{child}</div>
                }) : undefined}
            </div>
        );
    }
}

import Cascade, { Component, observable } from 'cascade';

export interface ICarouselProps {
    className?: string;
    activeIndex: number;
}

export default class Carousel extends Component<ICarouselProps> {
    container: HTMLElement;
    child: HTMLElement;

    afterRender(node: HTMLElement, updating: boolean) {
        let {activeIndex} = this.props;
        activeIndex = activeIndex || 0;
        if (updating) {
            let height = node.clientHeight + 'px'

            node.style.height = height;
            node.classList.add('carousel-run');

            let children = node.children;
            for (var index = 0, length = children.length; index < length; index++) {
                var child = children[index];
                if (index === activeIndex) {
                    child.className = 'carousel-selected';
                    height = child.clientHeight + 'px';
                } else {
                    child.className = undefined;
                }
            }

            node.style.height = height;

            window.setTimeout(() => {
                node.classList.remove('carousel-run');
                node.style.height = 'auto';
            }, 500);
        } else {
            let children = node.children;
            for (var index = 0, length = children.length; index < length; index++) {
                var child = children[index];
                if (index === activeIndex) {
                    child.className = 'carousel-selected';
                } else {
                    child.className = '';
                }
            }
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('carousel');

        let className = classNames.join(' ');

        return (
            <div className={className} style="height: auto; background-color: black">
                {this.children ? this.children.map((child, index) => {
                    return <div className={className}>{child}</div>
                }) : undefined}
            </div>
        );
    }
}

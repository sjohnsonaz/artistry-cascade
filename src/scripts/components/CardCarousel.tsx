import Cascade, { Component, observable, Ref } from 'cascade';

import Carousel, { ICarouselProps } from './Carousel';
import CardContainer from './CardContainer';

export interface ICardCarouselProps extends ICarouselProps {
    minWidth?: number;
    maxWidth?: number;
    cardSpacing?: number;
    carouselSpacing?: number;
    onChangeSize?: (index: number, slideSize?: number, oldSlideSize?: number) => any;
}

export default class CardCarousel extends Component<ICardCarouselProps> {
    rootRef: Ref<HTMLDivElement> = new Ref();
    @observable initialized: boolean = false;
    @observable slideSize: number = 1;

    afterRender(element: Node, updating: boolean) {
        if (!updating) {
            this.resizeHandler();
            window.addEventListener('resize', this.resizeHandler);
        } else {
            this.resizeHandler();
        }
    }

    afterDispose() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    onChangeSize = (slideSize: number, oldSlideSize: number) => {
        if (this.props.onChangeSize) {
            let oldIndex = this.props.activeIndex;
            if (oldIndex < 0) {
                let length = this.children.length;
                oldIndex = (oldIndex % length) + length;
            }
            let newIndex = Math.floor(oldIndex * oldSlideSize / slideSize);
            this.props.onChangeSize(newIndex, slideSize, oldSlideSize);
        }
    }

    resizeHandler = () => {
        let {
            minWidth,
            cardSpacing,
            carouselSpacing
        } = this.props;

        let slideSize = 1;
        let element = this.rootRef.current;
        if (element) {
            minWidth = minWidth || 300;
            cardSpacing = cardSpacing || 10;
            carouselSpacing = carouselSpacing || 10;
            minWidth += cardSpacing;
            let width = element.clientWidth;
            if (width > minWidth + cardSpacing) {
                let remainder = (width - cardSpacing) % minWidth;
                slideSize = (width - cardSpacing - remainder) / minWidth;
            }
        }

        if (!this.initialized) {
            let oldSlideSize = this.slideSize;
            this.initialized = true;
            this.slideSize = slideSize;
            this.onChangeSize(slideSize, oldSlideSize);
        } else if (slideSize !== this.slideSize) {
            let oldSlideSize = this.slideSize;
            this.slideSize = slideSize;
            this.onChangeSize(slideSize, oldSlideSize);
        }
    };

    render() {
        let {
            id,
            className,
            minWidth,
            maxWidth,
            ...props
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-carousel');

        let wrappedChildren: any[][] = [];

        let innerWrapper: any[];
        let slideSize = this.slideSize;
        this.children.forEach((child, index) => {
            if (index % slideSize === 0) {
                innerWrapper = [];
                wrappedChildren.push(innerWrapper);
            }
            innerWrapper.push(child);
        });

        return (
            <div
                ref={this.rootRef}
                id={id}
                className={classNames.join(' ')}
            >
                {this.initialized ?
                    <Carousel
                        {...props}
                    >
                        {wrappedChildren.map((children, index) => {
                            return (
                                <CardContainer
                                    className="space"
                                    minWidth={minWidth}
                                    maxWidth={maxWidth}
                                    key={index}>
                                    {children}
                                </CardContainer>
                            );
                        })}
                    </Carousel> :
                    undefined}
            </div>
        );
    }
}
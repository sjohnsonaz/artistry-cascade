import Cascade, { Component, observable, Ref } from 'cascade';

import Carousel, { ICarouselProps } from './Carousel';
//import Card from './Card';
import CardContainer from './CardContainer';

export interface ICardCarouselProps extends ICarouselProps {
    slideSize: number;
    cardWidth?: number;
}

export default class CardCarousel extends Component<ICardCarouselProps> {
    rootRef: Ref<HTMLDivElement> = new Ref();
    @observable rendered: boolean = false;
    @observable slideSize: number = 1;

    afterRender(element: Node, updating: boolean) {
        if (!updating) {
            let {
                cardWidth
            } = this.props;

            let slideSize = 1;
            let element = this.rootRef.current;
            if (element) {
                cardWidth = cardWidth || 300;
                let width = element.clientWidth;
                if (width > cardWidth) {
                    let remainder = width % cardWidth;
                    slideSize = (width - remainder) / cardWidth;
                }
            }

            this.rendered = true;
            this.slideSize = slideSize;
        } else {
            let {
                cardWidth
            } = this.props;

            let slideSize = 1;
            let element = this.rootRef.current;
            if (element) {
                cardWidth = cardWidth || 300;
                let width = element.clientWidth;
                if (width > cardWidth) {
                    let remainder = width % cardWidth;
                    slideSize = (width - remainder) / cardWidth;
                }
            }

            if (slideSize !== this.slideSize) {
                this.slideSize = slideSize;
            }
        }
    }

    render() {
        let {
            id,
            className,
            ...props
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-carousel');

        let wrappedChildren: any[][] = [];

        let innerWrapper: any[];
        this.children.forEach((child, index) => {
            if (index % this.slideSize === 0) {
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
                {this.rendered ?
                    <Carousel
                        {...props}
                    >
                        {wrappedChildren.map((children, index) => {
                            return (
                                <CardContainer
                                    className="space"
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
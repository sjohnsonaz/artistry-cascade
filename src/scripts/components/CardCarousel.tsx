import Cascade, {Component, observable, Ref} from 'cascade';

import Carousel, { ICarouselProps } from './Carousel';
//import Card from './Card';
import CardContainer from './CardContainer';

export interface ICardCarouselProps extends ICarouselProps {


}

export default class CardCarousel extends Component<ICardCarouselProps> {
    rootRef: Ref<HTMLDivElement> = new Ref();
    @observable rendered: boolean = false;

    afterRender(element: Node, updating: boolean) {
        if (!updating) {
            this.rendered = true;
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
            if (index % 3 === 0) {
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
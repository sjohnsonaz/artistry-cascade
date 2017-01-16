import Cascade, { Component, observable } from 'cascade';

import { Button, Carousel, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ICarouselViewProps {

}

export default class CarouselView extends Component<ICarouselViewProps> {
    @observable activeIndex: number = 0;

    nextCarouselSlide = () => {
        this.activeIndex++;
    }

    backCarouselSlide = () => {
        this.activeIndex--;
    }

    render() {
        return (
            <Section title="Carousel">
                <Button onclick={this.backCarouselSlide}>Back</Button>
                <Button onclick={this.nextCarouselSlide}>Next</Button>
                <Carousel activeIndex={this.activeIndex}>
                    <div style="background-color: red; padding: 10px;">
                        Content 0
                    </div>
                    <div style="background-color: blue; padding: 10px;">
                        Content 1
                        <br /> Line 2
                    </div>
                    <div style="background-color: yellow; padding: 10px;">
                        Content 2
                        <br /> Line 2
                        <br /> Line 3
                    </div>
                </Carousel>
            </Section>
        );
    }
}

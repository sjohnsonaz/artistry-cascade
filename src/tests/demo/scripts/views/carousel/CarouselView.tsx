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
            <Section header="Carousel" space>
                <Button onclick={this.backCarouselSlide}>Back</Button>
                <Button onclick={this.nextCarouselSlide}>Next</Button>
                <hr />
                <Carousel activeIndex={this.activeIndex} animation="slide">
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
                <hr />
                <Carousel activeIndex={this.activeIndex} animation="flip">
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

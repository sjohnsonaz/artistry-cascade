import Cascade, { Component, observable } from 'cascade';

import { Pager, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface IPagerViewProps {

}

export default class PagerView extends Component<IPagerViewProps> {
    @observable index: number = 1;
    count = 20;
    onClickIndex = (index: number, event: Event) => {
        this.index = index;
    }
    onClickBack = (event: Event) => {
        this.index--;
    }

    onClickForward = (event: Event) => {
        this.index++;
    }

    onClickStart = (event: Event) => {
        this.index = 0;
    }

    onClickEnd = (event: Event) => {
        this.index = 19;
    }
    render() {
        return (
            <Section header="Pager" space>
                <Pager
                    count={20}
                    index={this.index}
                    showCount={7}
                    showArrows
                    showEnds
                    onClickIndex={this.onClickIndex}
                    onClickEnd={this.onClickEnd}
                />
            </Section>
        );
    }
}

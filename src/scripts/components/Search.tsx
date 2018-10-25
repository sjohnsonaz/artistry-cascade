import Cascade, { Component, observable } from 'cascade';

export interface ISearchProps {
    buttonText?: any;
    options?: string[];
    altAction?: (option: string) => any;
    altActionText?: string;
    value?: string;
    onInput?: (event: Event) => any;
}

export default class Search extends Component<ISearchProps> {
    @observable activeOption: number = -1;
    @observable value: string;
    @observable baseValue: string;

    onKeyDown = (event: KeyboardEvent) => {
        let options = this.props.options || [];
        let activeOption: number;
        switch (event.keyCode) {
            case 38: // Up
                activeOption = this.activeOption;
                activeOption--;
                if (activeOption < -1) {
                    activeOption = -1;
                }
                this.activeOption = activeOption;
                this.value = options[activeOption];
                break;
            case 40: // Down
                activeOption = this.activeOption;
                activeOption++;
                if (activeOption >= options.length) {
                    activeOption = options.length - 1;
                }
                this.activeOption = activeOption;
                this.value = options[activeOption];
                break;
        }
    }

    onInput = (event: Event) => {
        this.value = (event.target as HTMLInputElement).value;
        if (this.props.onInput) {
            this.props.onInput(event);
        }
    }

    afterProps() {
        this.value = this.props.value;
        if (this.props.options) {
            if (this.props.options.length > this.activeOption) {
                this.activeOption = this.props.options.length - 1;
            }
        } else {
            this.activeOption = -1;
        }
    }

    render() {
        let {
            buttonText,
            options,
            altAction,
            altActionText
        } = this.props;
        return (
            <div className="search">
                <div className="button-group search-button-group">
                    <input
                        className="input search-input fill-width"
                        onkeydown={this.onKeyDown}
                        oninput={this.onInput}
                        value={this.value}
                    />
                    <button className="button search-button">{buttonText || 'Search'}</button>
                </div>
                <div className="search-option-box">
                    <ul role="listbox" className="search-option-list">
                        {!options ? undefined : options.map((option, index) => {
                            let optionClassName = ['search-option'];
                            if (index === this.activeOption) {
                                optionClassName.push('search-option-active');
                            }
                            return (
                                <li className={optionClassName.join(' ')} role="presentation" tabindex="0">
                                    <div className="search-option-action" role="option">
                                        <div className="search-option-action-text">
                                            <span><b>{option}</b></span>
                                        </div>
                                    </div>
                                    {altAction && altActionText ?
                                        <div className="search-option-alt-action" onclick={altAction.bind(this, option)}>
                                            <div className="search-option-alt-action-text">{altActionText}</div>
                                        </div> :
                                        undefined}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
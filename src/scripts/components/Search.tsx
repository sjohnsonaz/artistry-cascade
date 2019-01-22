import Cascade, { Component, observable } from 'cascade';

export interface ISearchProps {
    id?: string;
    className?: string;
    value?: string;
    buttonText?: any;
    options?: string[];
    altActionText?: string;
    showOptions?: boolean;
    fill?: boolean;
    disabled?: boolean;
    disabledButton?: boolean;
    disabledInput?: boolean;
    onBlur?: (event: FocusEvent) => any;
    onChange?: (event: Event) => any;
    onSelectOption?: (event: KeyboardEvent | MouseEvent, value?: string) => any;
    onSearch?: (event: KeyboardEvent | MouseEvent, value?: string) => any;
    onClose?: (event: KeyboardEvent) => any;
    altAction?: (option: string) => any;
}

export default class Search extends Component<ISearchProps> {
    @observable activeOption: number = -1;
    @observable value: string;
    @observable options: string[];

    constructor(props?: ISearchProps, children?: any[]) {
        super(props, children);
        let {
            value,
            options
        } = this.props;

        this.options = this.cleanOptions(options, value);
    }

    cleanOptions(options: string[], value: string) {
        if (value && value.trim) {
            // Push value to top of array
            options = options ? options.slice(0) : [];
            options.unshift(value);
        } else {
            options = options || [];
        }
        return options;
    }

    onKeyDown = (event: KeyboardEvent) => {
        let {
            value,
            options
        } = this;
        let activeOption: number;
        switch (event.keyCode) {
            case 13: // Enter
                this.onSearch(event);
                break;
            case 27: // Esc
                this.onClose(event);
                break;
            case 38: // Up
                event.preventDefault();
                if (!value || !value.trim()) {
                    activeOption = -1;
                } else {
                    activeOption = this.activeOption;
                    activeOption--;
                    if (activeOption < -1) {
                        activeOption = -1;
                    }
                }
                if (activeOption !== -1) {
                    this.activeOption = activeOption;
                    this.value = options[activeOption];
                } else {
                    this.activeOption = activeOption;
                }
                break;
            case 40: // Down
                event.preventDefault();
                if (!value || !value.trim()) {
                    activeOption = -1;
                } else {
                    activeOption = this.activeOption;
                    activeOption++;
                    if (activeOption >= options.length) {
                        activeOption = options.length - 1;
                    }
                }
                if (activeOption !== -1) {
                    this.activeOption = activeOption;
                    this.value = options[activeOption];
                } else {
                    this.activeOption = activeOption;
                }
                break;
        }
    }

    onBlur = (event: FocusEvent) => {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    onChange = (event: Event) => {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    onSearch = (event: KeyboardEvent | MouseEvent) => {
        if (this.props.onSearch) {
            this.props.onSearch(event);
        }
    }

    onSelectOption(option: string, index: number, event: KeyboardEvent | MouseEvent) {
        this.activeOption = index;
        this.value = option;
        if (this.props.onSelectOption) {
            this.props.onSelectOption(event, option);
        }
    }

    onClose = (event: KeyboardEvent) => {
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }

    afterProps() {
        let {
            value,
            options
        } = this.props;
        options = this.cleanOptions(options, value);
        this.value = value;
        this.options = options;
        if (value !== this.props.value) {
            this.activeOption = -1;
        }
    }

    render() {
        let {
            id,
            className,
            buttonText,
            altAction,
            altActionText,
            showOptions,
            fill,
            disabled,
            disabledButton,
            disabledInput
        } = this.props;

        let {
            value,
            options,
            activeOption
        } = this;

        let classNames = className ? [className] : [];
        classNames.push('search');

        if (options.length && !disabled && !disabledInput) {
            classNames.push('search-open');
        }

        let inputClassNames = ['input', 'search-input'];
        if (fill) {
            inputClassNames.push('fill-width');
        }

        return (
            <div id={id} className={classNames.join(' ')}>
                <div className="button-group search-button-group">
                    <input
                        className={inputClassNames.join(' ')}
                        onkeydown={this.onKeyDown}
                        onchange={this.onChange}
                        onblur={this.onBlur}
                        value={value}
                        disabled={disabled || disabledInput}
                    />
                    <button
                        className="button search-button"
                        onclick={this.onSearch}
                        disabled={disabled || disabledButton}
                    >
                        {buttonText || 'Search'}
                    </button>
                </div>
                {showOptions ?
                    <div className="search-option-box">
                        <ul role="listbox" className="search-option-list">
                            {!options ? undefined : options.map((option, index) => {
                                let optionClassName = ['search-option'];
                                if (index === activeOption) {
                                    optionClassName.push('search-option-active');
                                }
                                return (
                                    <li className={optionClassName.join(' ')} role="presentation" key={option + '_' + index}>
                                        <div className="search-option-action" role="option" onclick={this.onSelectOption.bind(this, option, index)}>
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
                    </div> :
                    null}
            </div>
        );
    }
}
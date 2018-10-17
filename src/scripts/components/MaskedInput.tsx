import Cascade, { Component, observable, Ref } from 'cascade';

import Mask, { ISelection, KeyboardMovement, IMaskUpdate } from '../util/Mask';

export interface IMaskedInputProps<T> extends Partial<HTMLInputElement> {
    id?: string;
    className?: string;
    mask: string;
    onchange?: (event: Event) => (void | boolean);
    value?: any;
}

export default class MaskedInput<T> extends Component<IMaskedInputProps<T>> {
    inputRef: Ref<HTMLInputElement> = new Ref();
    command: boolean = false;
    mask: Mask;

    value?: string;
    selectionStart?: number = 0;
    selectionEnd?: number = 0;

    constructor(props: IMaskedInputProps<T>, children: any[]) {
        super(props, children);
        this.mask = new Mask(this.props.mask);
    }

    updateElement(maskUpdate: IMaskUpdate) {
        let input = this.inputRef.current;
        if (typeof maskUpdate.value !== 'undefined') {
            input.value = maskUpdate.value;
            this.value = maskUpdate.value;
        }
        if (typeof maskUpdate.selectionEnd !== 'undefined' && typeof maskUpdate.selectionEnd !== 'undefined') {
            input.setSelectionRange(maskUpdate.selectionStart, maskUpdate.selectionEnd, 'none');
            this.selectionStart = maskUpdate.selectionStart;
            this.selectionEnd = maskUpdate.selectionEnd;
        }
    }

    beforeRender(mounted?: boolean) {
        if (mounted) {
            let {
                value
            } = this.props;
            if (this.prevProps.value !== value) {
                try {
                    this.updateElement(this.mask.updateValue(
                        value,
                        this.value
                    ));
                }
                catch (e) {
                    this.rollback();
                }
            }
        }
    }

    afterRender(node: Node, mounted: boolean) {
        if (!mounted) {
            this.updateElement({
                value: this.mask.formatValue(this.props.value, true)
            });
        }
    }

    onFocus = (event?: FocusEvent) => {
        event.preventDefault();
        this.updateElement(this.mask.updateSelection(
            (event.target as HTMLInputElement).value,
            this.getSelection()
        ));
    }

    onBlur = () => {
        this.command = false;
    }

    onClick = (event?: MouseEvent) => {
        event.preventDefault();
        this.updateElement(this.mask.updateSelection(
            (event.target as HTMLInputElement).value,
            this.getSelection()
        ));
    }

    onSelect = (event?: MouseEvent) => {
        event.preventDefault();
        this.updateElement(this.mask.updateSelection(
            (event.target as HTMLInputElement).value,
            this.getSelection()
        ));
    }

    onChange = (event?: Event) => {
        event.preventDefault();
        try {
            this.updateElement(this.mask.updateValue(
                (event.target as HTMLInputElement).value,
                this.value
            ));
            if (this.props.onchange) {
                this.props.onchange(event);
            }
        }
        catch (e) {
            this.rollback();
        }
    }

    onKeyDown = (event: KeyboardEvent) => {
        switch (event.keyCode) {
            case 8: // Backspace
                event.preventDefault();
                try {
                    this.updateElement(this.mask.deleteCharacter(
                        (event.target as HTMLInputElement).value,
                        this.getSelection(),
                        false
                    ));
                }
                catch (e) {
                    this.rollback();
                }
                break;
            case 35: // End
                event.preventDefault();
                this.updateElement(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    KeyboardMovement.end
                ));
                break;
            case 36: // Home
                event.preventDefault();
                this.updateElement(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    KeyboardMovement.home
                ));
                break;
            case 37: // Left
                event.preventDefault();
                this.updateElement(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    this.command ? KeyboardMovement.home : KeyboardMovement.left
                ));
                break;
            case 39: // Right
                event.preventDefault();
                this.updateElement(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    this.command ? KeyboardMovement.end : KeyboardMovement.right
                ));
                break;
            case 46: // Delete
                event.preventDefault();
                try {
                    this.updateElement(this.mask.deleteCharacter(
                        (event.target as HTMLInputElement).value,
                        this.getSelection(),
                        true
                    ));
                }
                catch (e) {
                    this.rollback();
                }
                break;
            case 91: // Command Left
            case 93: // Command Right
            case 224: // Command - Firefox
                this.command = true;
                break;
        }
    }

    onKeyUp = (event: KeyboardEvent) => {
        switch (event.keyCode) {
            case 91: // Command Left
            case 93: // Command Right
            case 224: // Command - Firefox
                this.command = false;
                break;
        }
    }

    getSelection(): ISelection {
        let input = this.inputRef.current;
        return {
            start: input.selectionStart,
            end: input.selectionEnd,
            direction: input.selectionDirection as any
        };
    }

    rollback() {
        this.updateElement({
            value: this.value,
            selectionStart: this.selectionStart,
            selectionEnd: this.selectionEnd
        });
    }

    render() {
        let {
            id,
            className,
            value,
            onchange,
            ...props
        } = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('input');

        return (
            <input
                {...props as any}
                ref={this.inputRef}
                id={id}
                className={classNames.join(' ')}
                onfocus={this.onFocus}
                onclick={this.onClick}
                onselect={this.onSelect}
                onchange={this.onChange}
                onkeydown={this.onKeyDown}
                onkeyup={this.onKeyUp}
            />
        );
    }
}
import Cascade, { Component } from 'cascade';

export interface IActionBarProps {
    className?: string;
    id?: string;
    displaySize?: 'default' | 'small' | 'large';
    align?: 'start' | 'end';
    direction?: 'forward' | 'reverse';
}

export default class ActionBar extends Component<IActionBarProps>{
    render() {
        let {
            id,
            className,
            displaySize,
            align,
            direction
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('action-bar');

        switch (displaySize) {
            case 'small':
                classNames.push('action-bar-small');
                break;
            case 'large':
                classNames.push('action-bar-large');
                break;
        }

        if (align === 'start') {
            classNames.push('action-bar-start');
        }

        if (direction === 'reverse') {
            classNames.push('action-bar-reverse');
        }

        return (
            <div className={classNames.join(' ')} id={id}>
                {this.children}
            </div>
        );
    }
}
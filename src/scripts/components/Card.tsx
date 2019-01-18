import Cascade, { Component } from 'cascade';

import { IGridExternalProps, gridConfig } from './Grid';

export interface ICardProps extends IGridExternalProps {
    /** id of the root element */
    id?: string;

    /** classes to add to the root element */
    className?: string;

    /** JSX to display in the header */
    header?: any;

    /** JSX to display in the footer */
    footer?: any;

    /** determines whether the card should have padding*/
    space?: boolean;

    /** determines whether the card should fill horizontally */
    fill?: boolean;

    /** JSX to display in the nav section */
    nav?: any;

    /** determines the direction the nav section should be aligned */
    navAlign?: 'start' | 'end';

    /** determines whether the card is clickable */
    clickable?: boolean;

    /** the click event handler */
    onClick?: (event: MouseEvent) => any;
}

/** Displays a Card */
export default class Card extends Component<ICardProps> {
    onClick = (event: MouseEvent) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        let {
            id,
            className,
            header,
            footer,
            space,
            fill,
            nav,
            navAlign,
            grid,
            clickable
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('card');

        let innerClassNames = ['card-content'];
        if (space) {
            innerClassNames.push('card-content-space');
        }
        if (fill) {
            classNames.push('fill');
        }
        if (grid) {
            gridConfig(innerClassNames, this.props);
        }
        if (clickable) {
            classNames.push('clickable');
        }

        return (
            <div className={classNames.join(' ')} id={id} onClick={this.onClick}>
                {header ? <header>{header}</header> : null}
                <div className={innerClassNames.join(' ')}>
                    {this.children}
                </div>
                {nav ? <nav className={navAlign === 'end' ? 'card-nav-align-end' : ''}>{nav}</nav> : null}
                {footer ? <footer>{footer}</footer> : null}
            </div>
        );
    }
}
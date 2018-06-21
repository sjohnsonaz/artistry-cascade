﻿import Cascade, { Component } from 'cascade';

import { IGridExternalProps, gridConfig } from './Grid';

export interface ICardProps extends IGridExternalProps {
    id?: string;
    className?: string;
    closed?: boolean;
    header?: any;
    footer?: any;
    space?: boolean;
    nav?: any;
    navAlign?: 'start' | 'end';
}

export default class Card extends Component<ICardProps> {
    render() {
        let {
            id,
            className,
            closed,
            header,
            footer,
            space,
            nav,
            navAlign,
            grid
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('card');

        let innerClassNames = ['card-content'];
        if (space) {
            innerClassNames.push('card-content-space');
        }
        if (grid) {
            gridConfig(innerClassNames, this.props);
        }

        return (
            <div className={classNames.join(' ')} id={id} data-closed={closed}>
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
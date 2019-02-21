import Cascade, { Component } from 'cascade';

import { alignClass, AlignType } from '../util/Align';

export interface ICellProps {
    className?: string;
    id?: string;
    columns?: number;
    offset?: number;
    align?: AlignType;
    width?: number | string;
    leftMargin?: number | string;
}

export default class Cell extends Component<ICellProps> {
    render() {
        let {
            id,
            className,
            columns,
            offset,
            align,
            width,
            leftMargin
        } = this.props;

        let classNames = className ? [className] : [];
        if (columns) {
            classNames.push('col-' + columns);
        } else {
            classNames.push('col');
        }
        if (offset) {
            classNames.push('offset-' + offset);
        }
        if (align) {
            alignClass(align, classNames);
        }

        let fixed = false;
        let style = {};
        if (width) {
            if (typeof width === 'number') {
                width += 'px' as any;
            }
            style['--col-width'] = width;
            fixed = true;
        }
        if (leftMargin) {
            if (typeof leftMargin === 'number') {
                leftMargin += 'px' as any;
            }
            style['--col-offset'] = width;
            fixed = true;
        }
        if (fixed) {
            classNames.push('col-fixed');
        }

        return <div
            className={classNames.join(' ')}
            id={id}
            style={style as any}
        >
            {this.children}
        </div>
    }
}
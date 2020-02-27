import Cascade, { Component } from 'cascade';

import ClassNames from '../util/ClassNames';
import { AlignType } from '../util/Align';

import FormText, { FormTextTheme } from './FormText';

export interface IFormGroupProps {
    className?: string;
    id?: string;
    label?: any;
    text?: any;
    textAlign?: AlignType;
    theme?: FormTextTheme;
    nonLabel?: boolean;
    inline?: boolean;
    stacked?: boolean;
}

export default class FormGroup extends Component<IFormGroupProps> {
    render() {
        let classNames = new ClassNames(this.props.className, 'form-group');

        classNames.addTest('form-group-inline', this.props.inline);

        let input = (
            <div className="form-input">
                {this.children}
            </div>
        );

        let label;
        if (this.props.label) {
            if (this.props.nonLabel) {
                label = (
                    <div className="form-title">
                        {this.props.label}
                    </div>
                );
            } else {
                label = (
                    <label className="form-title">
                        {this.props.label}
                    </label>
                );
            }
        }

        return (
            <div className={classNames.toString()} id={this.props.id}>
                {label}
                {input}
                {this.props.text ?
                    <FormText
                        theme={this.props.theme}
                        align={this.props.textAlign}
                    >
                        {this.props.text}
                    </FormText> :
                    null}
            </div>
        );
    }
}

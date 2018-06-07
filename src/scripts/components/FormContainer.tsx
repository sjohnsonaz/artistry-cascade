import Cascade, { Component } from 'cascade';

export interface IFormContainerProps {
    className?: string;
    id?: string;
    label?: any;
    text?: any;
    nonLabel?: boolean;
    inline?: boolean;
}

export default class FormContainer extends Component<IFormContainerProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-container');

        if (this.props.inline) {
            classNames.push('form-container-inline');
        }

        let input = (
            <div className="form-input">
                {this.children}
            </div>
        );

        let control;
        if (this.props.label) {
            if (this.props.nonLabel) {
                control = (
                    <div className="form-label">
                        <div className="form-title">
                            {this.props.label}
                        </div>
                        {input}
                    </div>
                );
            } else {
                control = (
                    <label className="form-label">
                        <div className="form-title">
                            {this.props.label}
                        </div>
                        {input}
                    </label>
                );
            }
        } else {
            control = input;
        }

        return (
            <div className={classNames.join(' ')} id={this.props.id}>
                {this.props.text ?
                    <div className="form-text">{this.props.text}</div> :
                    null}
                {control}
            </div>
        );
    }
}

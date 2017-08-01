import Cascade, { Component } from 'cascade';

export interface IFormContainerProps {
    className?: string;
    id?: string;
    title: any;
}

export default class Formcontainer extends Component<IFormContainerProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-container');
        return (
            <div className={classNames.join(' ')} id={this.props.id}>
                <label className="form-label">
                    <div className="form-title">
                        {this.props.title}
                    </div>
                    <div className="form-input">
                        {this.children}
                    </div>
                </label>
            </div>
        );
    }
}

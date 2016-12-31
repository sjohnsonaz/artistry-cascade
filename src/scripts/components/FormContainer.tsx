import Cascade, { Component } from 'cascade';

export interface IFormContainerProps {
    title: any;
    className?: string;
}

export default class Formcontainer extends Component<IFormContainerProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-container');
        let className = classNames.join(' ');
        return (
            <div className={className}>
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

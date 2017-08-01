import Cascade, { Component, Elements } from 'cascade';

export interface IToggleProps extends Elements.JSXInputElement {
}

export default class Toggle extends Component<IToggleProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('toggle');
        delete this.props.className;

        return (
            <div className={classNames.join(' ')}>
                <label>
                    <div className="toggle-box">
                        <input type="checkbox" {...this.props} />
                        <div className="toggle-button">&nbsp;</div>
                    </div>
                </label>
            </div>
        );
    }
}

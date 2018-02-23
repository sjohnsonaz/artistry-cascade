import Cascade, { Component, Elements } from 'cascade';

export interface IFormInputProps extends Elements.JSXInputElement {
    model: Object;
    modelProp: string;
}

export default class FormInput extends Component<IFormInputProps> {
    oninput = (event?: Event) => {
        let { model, modelProp } = this.props;
        if (model) {
            model[modelProp] = (event.target as HTMLInputElement).value;
        }
    }

    render() {
        let { model, modelProp } = this.props;
        return <input {...this.props} value={model ? model[modelProp] : undefined} oninput={this.oninput} />
    }
}

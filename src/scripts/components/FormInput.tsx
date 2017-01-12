import Cascade, { Component, Elements } from 'cascade';

export interface IFormInputProps extends Elements.JSXInputElement {
    model: Object;
    modelProp: string;
}

export class FormInput extends Component<IFormInputProps> {
    oninput = (event?: Event) => {
        let {model, modelProp} = this.props;
        model[modelProp] = (event.target as HTMLInputElement).value;
    }

    render() {
        let {model, modelProp} = this.props;
        return <input {...this.props} value={model[modelProp]} oninput={this.oninput} />
    }
}

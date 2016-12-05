import Cascade, {Component, VirtualNode, IVirtualNode, IVirtualNodeProps} from 'cascade';

export interface IFormInputProps {

}

export class FormInput extends Component<IFormInputProps> {
    render() {
        return <input {...this.props} />
    }
}

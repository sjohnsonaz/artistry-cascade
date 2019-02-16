import Cascade, { Component } from 'cascade';
import Icons from '@artistry/icons';

export interface IIconProps {
    name: string;
}

export default class Icon extends Component<IIconProps> {
    render() {
        return Icons.renderJSX(this.props.name);
    }
}
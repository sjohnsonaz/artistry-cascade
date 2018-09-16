import Cascade, { Component } from 'cascade';

import { Button } from '../../../../../scripts/modules/ArtistryCascade';

import ViewModel from '../../ViewModel';
import User from '../../models/User';

export interface IUserViewProps {
    user: User;
    viewModel: ViewModel;
}

export default class UserView extends Component<IUserViewProps> {
    removeUser = () => {
        this.props.viewModel.removeUser(this.props.user);
    }
    render() {
        let {user, viewModel} = this.props;
        return (
            <tr>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td><Button theme="danger" onclick={this.removeUser}>Remove</Button></td>
            </tr>
        );
    }
}

import Cascade, {Component} from 'cascade';

import ViewModel from '../ViewModel';
import User from '../models/User';

export interface IUserFormProps {
    viewModel: ViewModel;
}

export default class UserForm extends Component<IUserFormProps> {
    setFirstNameInput = (firstNameInput: HTMLElement) => {
        this.props.viewModel.firstNameInput = firstNameInput;
    }

    addUser(event) {
        event.preventDefault();
        this.props.viewModel.addUser();
        this.props.viewModel.firstNameInput.focus();
    }

    onChange(prop, event) {
        this.props.viewModel.user[prop] = event.target.value;
    }

    // TODO: This is a fix for IE11
    onKeyDown = (event) => {
        switch (event.keyCode) {
            case 13:
                event.preventDefault();
                this.props.viewModel.addUser();
                this.props.viewModel.firstNameInput.focus();
                break;
            case 27:
                event.preventDefault();
                this.props.viewModel.user = new User('', '');
                this.props.viewModel.firstNameInput.focus();
                break;
        }
    }

    render() {
        let {viewModel} = this.props;
        let {user} = viewModel;
        let valid = user['firstName-valid'] && user['lastName-valid'];
        return (
            <tr onkeydown={this.onKeyDown}>
                <td>
                    <input type="text" form="user-form" name="firstName" value={user.firstName} oninput={this.onChange.bind(this, 'firstName')} ref={this.setFirstNameInput} />
                </td>
                <td>
                    <input type="text" form="user-form" name="lastName" value={user.lastName} oninput={this.onChange.bind(this, 'lastName')} />
                </td>
                <td>
                    <button type="submit" form="user-form" name="submit" className="button" onclick={this.addUser.bind(this)} disabled={!valid}>Add</button>
                    <form id="user-form" onsubmit={this.addUser.bind(this)}></form>
                </td>
            </tr>
        );
    }
}

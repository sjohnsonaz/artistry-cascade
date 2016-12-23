import Cascade, { Component } from 'cascade';

import Modal from '../components/Modal';
import Button from '../components/Button';

import ViewModel from '../ViewModel';

import UserForm from './UserForm';
import UserView from './UserView';

export interface IUserListViewProps {
    viewModel: ViewModel;
}

export default class UserListView extends Component<IUserListViewProps> {
    openModal = () => {
        this.props.viewModel.modalOpen = true;
    }

    closeModal = () => {
        this.props.viewModel.modalOpen = false;
    }

    render() {
        let {viewModel} = this.props;
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserForm key="user-form-component" viewModel={viewModel} />
                        {viewModel.users.map(user => <UserView user={user} viewModel={viewModel} />)}
                    </tbody>
                </table>

                <h1>Modal</h1>
                <Button onclick={this.openModal}>Open Modal</Button>
                <Modal open={viewModel.modalOpen} onclose={this.closeModal}>
                    test
                </Modal>

                <h1>Tooltip</h1>
                <Button tooltip="Information..." tooltipDirection="right">Tooltip</Button>
            </div>
        );
    }
}

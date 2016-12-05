import Cascade, {Component} from 'cascade';

import ViewModel from '../ViewModel';

import UserForm from './UserForm';
import UserView from './UserView';
import Modal from '../components/Modal';

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
                <button className="button" onclick={this.openModal}>Open Modal</button>
                <Modal open={viewModel.modalOpen} onclose={this.closeModal}>
                    test
                </Modal>

                <h1>Tooltip</h1>
                <button className="button tooltip tooltip-right" aria-label="Information...">Tooltip</button>
            </div>
        );
    }
}

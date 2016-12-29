import Cascade, { Component } from 'cascade';

import Modal from '../components/Modal';
import Button from '../components/Button';
import ButtonGroup from '../components/ButtonGroup';

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

    openInnerModal = () => {
        this.props.viewModel.innerModalOpen = true;
    }

    closeInnerModal = () => {
        this.props.viewModel.innerModalOpen = false;
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

                <h2>Modal</h2>
                <Button onclick={this.openModal}>Open Modal</Button>
                <Modal open={viewModel.modalOpen} onclose={this.closeModal} title="Modal">
                    <div>test</div>
                    <Button onclick={this.openInnerModal}>Open Inner Modal</Button>
                    <Modal open={viewModel.innerModalOpen} onclose={this.closeInnerModal} title="Inner Modal">
                        inner test
                    </Modal>
                </Modal>

                <h2>Tooltip</h2>
                <Button tooltip="Information..." tooltipDirection="right">Tooltip</Button>

                <h2>Popover</h2>
                <Button popover={<span><strong>Popover</strong> Text</span>} popoverDirection="right">Popover</Button>

                <h2>Button Group</h2>
                <ButtonGroup>
                    <Button popover="Popover" theme="primary">Edit</Button>
                    <Button theme="danger">Delete</Button>
                    <Button>View</Button>
                </ButtonGroup>
            </div>
        );
    }
}

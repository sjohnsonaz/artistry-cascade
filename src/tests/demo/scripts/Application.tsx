declare var window: any;

import Cascade from 'cascade';

import ViewModel from './ViewModel';
import User from './models/User';
import UserListView from './views/user/UserListView';
import ModalView from './views/modal/ModalView';
import ButtonView from './views/button/ButtonView';
import SectionView from './views/section/SectionView';
import ProgressBarView from './views/progressBar/ProgressBarView';
import CodeView from './views/code/CodeView';

export default class Application {
    static run() {
        var viewModel = new ViewModel();
        window.viewModel = viewModel;
        window.User = User;
        Cascade.render(
            document.getElementById('root'),
            <div className="container">
                <h2>Components</h2>
                <ButtonView />
                <ProgressBarView />
                <ModalView />
                <SectionView />
                <CodeView />
                <h2>Examples</h2>
                <UserListView viewModel={viewModel} />
            </div>,
            function () {
                console.log('started');
            }
        );
        var user = new User('First', 'User');
        viewModel.users.push(user);
    }
}
declare var window: any;

import Cascade from 'cascade';

import ViewModel from './ViewModel';
import User from './models/User';
import UserListView from './views/UserListView';

export default class Application {
    static run() {
        var viewModel = new ViewModel();
        window.viewModel = viewModel;
        window.User = User;
        Cascade.render(
            document.getElementById('root'),
            <UserListView viewModel={viewModel} />,
            function() {
                console.log('started');
            }
        );
        var user = new User('Sean', 'Johnson');
        viewModel.users.push(user);
    }
}

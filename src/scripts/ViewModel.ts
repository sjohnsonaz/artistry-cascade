import {observable, array} from 'cascade';

import User from './models/User';

export default class ViewModel {
    @observable modalOpen: boolean = false;
    @observable users: User[] = [];
    @observable user: User = new User('', '');
    @observable firstNameInput: HTMLElement;

    addUser() {
        let user = this.user;
        let valid = user['firstName-valid'] && user['lastName-valid'];
        if (valid) {
            this.users.push(user);
            this.user = new User('', '');
        }
    }

    removeUser(user: User) {
        (this.users as any).remove(user);
    }
}

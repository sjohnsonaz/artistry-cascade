import {observable, array} from 'cascade';

import User from './models/User';

export default class ViewModel {
    @observable users: User[] = [];
    @observable user: User = new User('', '');
    @observable firstNameInput: HTMLElement;

    addUser() {
        this.users.push(this.user);
        this.user = new User('', '');
    }

    removeUser(user: User) {
        (this.users as any).remove(user);
    }
}

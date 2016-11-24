import {observable} from 'cascade';

export default class User {
    @observable firstName: string = '';
    @observable lastName: string = '';
    @observable get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

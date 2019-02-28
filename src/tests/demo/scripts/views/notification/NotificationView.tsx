import Cascade, { Component, observable } from 'cascade';

import { Button, NotificationContainer, NotificationType, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface INotificationViewProps {

}

export interface INotificationViewState {
    items?: {
        type?: NotificationType;
        title?: string;
        text?: string;
        decay?: number;
    }[];
}

export default class NotificationView extends Component<INotificationViewProps> {
    @observable items?: {
        type?: NotificationType;
        title?: string;
        text?: string;
        decay?: number;
    }[] = [];

    pushItem(item: {
        type?: NotificationType;
        title?: string;
        text?: string;
        decay?: number;
    }) {
        let items = this.items.splice(0);
        items.push(item);
        this.items = items;
    }

    pushDefault = () => {
        this.pushItem({
            type: 'default',
            title: 'Default',
            text: 'This is a default message.',
            decay: 2000
        });
    }

    pushSuccess = () => {
        this.pushItem({
            type: 'success',
            title: 'Success',
            text: 'This is a success message.',
            decay: 2000
        });
    }

    pushInfo = () => {
        this.pushItem({
            type: 'info',
            title: 'Info',
            text: 'This is a info message.',
            decay: 2000
        });
    }

    pushWarning = () => {
        this.pushItem({
            type: 'warning',
            title: 'Warning',
            text: 'This is a warning message.',
            decay: 2000
        });
    }

    pushDanger = () => {
        this.pushItem({
            type: 'danger',
            title: 'Danger',
            text: 'This is a danger message.',
            decay: 2000
        });
    }

    render() {
        return (
            <Section header="Notification" space>
                <Button onclick={this.pushDefault}>Push Default</Button>
                <Button onclick={this.pushSuccess}>Push Success</Button>
                <Button onclick={this.pushInfo}>Push Info</Button>
                <Button onclick={this.pushWarning}>Push Warning</Button>
                <Button onclick={this.pushDanger}>Push Danger</Button>
                <NotificationContainer
                    items={this.items}
                />
            </Section>
        );
    }
}
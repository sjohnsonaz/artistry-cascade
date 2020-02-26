import Cascade, { Component, observable, hash } from 'cascade';

import { Button, NotificationContainer, NotificationType, Section, Notification, INotificationProps, ActionBar } from '../../../../../scripts/modules/ArtistryCascade';

export interface INotificationViewProps {

}

export interface INotification extends INotificationProps {
    text?: string;
}

export interface INotificationViewState {
    items?: {
        [index: number]: INotification;
    };
}

export default class NotificationView extends Component<INotificationViewProps> {
    @hash items?: {
        [index: number]: INotification;
    };

    static currentKey = 0;

    pushItem(item: INotification) {
        this.items[NotificationView.currentKey] = item;
        NotificationView.currentKey++;
    }

    pushDefault = () => {
        this.pushItem({
            type: 'default',
            title: 'Default',
            text: 'This is a default message.',
            decay: 2000,
            onClick: () => console.log('Default clicked!')
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
            <Section header="Notification" headerSpace>
                <ActionBar align="start">
                    <Button onclick={this.pushDefault}>Push Default</Button>
                    <Button onclick={this.pushSuccess}>Push Success</Button>
                    <Button onclick={this.pushInfo}>Push Info</Button>
                    <Button onclick={this.pushWarning}>Push Warning</Button>
                    <Button onclick={this.pushDanger}>Push Danger</Button>
                </ActionBar>
                <NotificationContainer>
                    {Object.keys(this.items).map(key => {
                        let item = this.items[key];
                        return (
                            <Notification
                                key={key}
                                title={item.title}
                                type={item.type}
                                decay={item.decay}
                                onClick={item.onClick}
                                clickable={!!item.onClick}
                                allowDelay
                                onClose={() => {
                                    delete this.items[key];
                                }}
                            >
                                {item.text}
                            </Notification>
                        );
                    })}
                </NotificationContainer>
            </Section>
        );
    }
}
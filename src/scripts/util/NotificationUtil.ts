import BaseEventTarget from './BaseEventTarget';

export type NotificationType = 'default' | 'success' | 'info' | 'warning' | 'danger';

export interface INotification {
    type?: NotificationType;
    title?: string;
    decay?: number;
}

export default class NotificationUtil extends BaseEventTarget {
    notifications: INotification[] = [];

    push(notification: INotification) {
        this.notifications.push(notification);
        this.sendEvent('push', this.notifications);
        this.sendEvent('update', this.notifications);
    }

    remove(notification: INotification) {
        let index = this.notifications.indexOf(notification);
        if (index >= 0) {
            this.notifications.splice(0, 1);
            this.sendEvent('remove', this.notifications);
            this.sendEvent('update', this.notifications);
        }
    }
}
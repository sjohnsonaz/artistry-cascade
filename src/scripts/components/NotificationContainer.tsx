import Cascade, { Component, Portal } from 'cascade';

import ClassNames from '../util/ClassNames';
import { NotificationType } from '../util/NotificationUtil';
import PortalManager from '../util/Portal';

import Notification from './Notification';

export type NotificationLocation = 'default' | 'top' | 'right' | 'bottom' | 'left' | 'center-horizontal' | 'center-vertical' | 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';

export interface INotificationContainerProps {
    id?: string;
    className?: string;
    items?: {
        type?: NotificationType;
        title?: string;
        text?: string;
        decay?: number;
    }[];
    location?: NotificationLocation;
}

export default class NotificationContainer extends Component<INotificationContainerProps> {
    render() {
        let {
            id,
            className,
            items,
            location
        } = this.props;

        let classNames = new ClassNames(className);
        classNames.add('notification-container');

        if (!items || !items.length) {
            classNames.add('hidden');
        }

        switch (location) {
            case 'top':
                classNames.add('notification-top');
                break;
            case 'right':
                classNames.add('notification-right');
                break;
            case 'bottom':
                classNames.add('notification-bottom');
                break;
            case 'left':
                classNames.add('notification-left');
                break;
            case 'center-horizontal':
                classNames.add('notification-center-horizontal');
                break;
            case 'center-vertical':
                classNames.add('notification-center-vertical');
                break;
            case 'top-right':
                classNames.add('notification-top-right');
                break;
            case 'bottom-right':
                classNames.add('notification-bottom-right');
                break;
            case 'bottom-left':
                classNames.add('notification-bottom-left');
                break;
            case 'top-left':
                classNames.add('notification-top-left');
                break;
        }

        return (
            <Portal element={PortalManager.getElement('layer-fixed')}>
                <div className={classNames.toString()} id={id}>
                    {items ? items.map((item, index) => (
                        <Notification
                            type={item.type}
                            title={item.title}
                            decay={item.decay}
                            key={index}
                        >
                            {item.text}
                        </Notification>
                    )) : undefined}
                </div>
            </Portal>
        );
    }
}
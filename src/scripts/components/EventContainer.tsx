import Cascade, { Component } from 'cascade';

export interface IEventContainer {
    events: string | string[];
    preventDefault?: boolean;
    stopPropagation?: boolean;
    block?: boolean;
}

export default class EventContainer extends Component<IEventContainer> {
    eventHandler = (event: Event) => {
        if (this.props.preventDefault) {
            event.preventDefault();
        }
        if (this.props.stopPropagation) {
            event.stopPropagation();
        }
    }

    eventsToHash(events: string | string[]) {
        let hash = {};
        if (typeof events === 'string') {
            events = [events];
        }
        events.forEach(event => {
            hash[event] = this.eventHandler;
        });
        return hash;
    }

    render() {
        let {
            block,
            events
        } = this.props;
        if (block) {
            return (
                <div {...this.eventsToHash(events)}>
                    {this.children}
                </div>
            );
        } else {
            return (
                <span {...this.eventsToHash(events)}>
                    {this.children}
                </span>
            );
        }
    }
}
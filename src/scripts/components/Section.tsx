import Cascade, { Component, Elements, observable } from 'cascade';

import Button from './Button';

export interface ISectionProps extends Elements.JSXElement {
    title: any;
    lockable?: boolean;
    locked?: boolean;
    closeable?: boolean;
    closed?: boolean;
    onClose?: (closed: boolean) => void;
}

export default class Section extends Component<ISectionProps> {
    @observable closed: boolean;

    close = () => {
        if (this.props.onClose) {
            // Get closed value
            let closed = typeof this.props.closed !== 'undefined' ?
                this.props.closed :
                (this.closed || false);
            this.props.onClose(closed);
        } else {
            this.closed = !this.closed;
        }
    }

    afterRender(node: HTMLElement) {
        // Get closed value
        let closed = typeof this.props.closed !== 'undefined' ?
            this.props.closed :
            (this.closed || false);

        // Clear toggleTimeout
        let toggleTimeout: number = (node as any).toggleTimeout;
        if (typeof toggleTimeout === 'number') {
            window.clearTimeout(toggleTimeout);
            (node as any).toggleTimeout = undefined;
        }

        let header = node.childNodes[0] as HTMLElement;
        let content = node.childNodes[1] as HTMLElement;

        if (closed) {
            node.style.height = node.offsetHeight + 'px';
            node.style.height = header.offsetHeight + 'px';
        } else {
            if (node.style.height && node.style.height != 'auto') {
                var sectionBorder = node.offsetHeight - node.clientHeight;
                node.style.height = sectionBorder / 2 + header.offsetHeight + content.offsetHeight + 'px';
                (node as any).toggleTimeout = window.setTimeout(function () {
                    node.style.height = 'auto';
                }, 220);
            }
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('section');

        /*
        if (this.props.closed) {
            classNames.push('section-closed');
        }
        */
        let innerClassNames = ['section-content'];
        if (this.props.lockable) {
            innerClassNames.push('lock-contents');
        }
        if (this.props.locked) {
            innerClassNames.push('locked');
        }

        let className = classNames.join(' ');
        let innerClassName = innerClassNames.join(' ');
        return (
            <section className={className} {...this.props}>
                <header>
                    {this.props.title}
                    {this.props.closeable ?
                        <Button className="section-toggle" onclick={this.close}>-</Button>
                        : undefined}
                </header>
                <div className={innerClassName}>{this.children}</div>
            </section>
        );
    }
}

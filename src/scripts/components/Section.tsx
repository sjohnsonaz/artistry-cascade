import Cascade, { Component, Elements } from 'cascade';

export interface ISectionProps extends Elements.JSXElement {
    title: any;
    lockable?: boolean;
    locked?: boolean;
    closed?: boolean;
}

export default class Section extends Component<ISectionProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('section');

        if (this.props.closed) {
            classNames.push('section-closed');
        }

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
                <header>{this.props.title}</header>
                <div className={innerClassName}>{this.children}</div>
            </section>
        );
    }
}
import Cascade, { Component, Elements } from 'cascade';

export interface ISectionProps extends Elements.JSXElement {
    title: any;
    locked?: boolean;
}

export default class Section extends Component<ISectionProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('section');
        let className = classNames.join(' ');

        let innerClassNames = ['section-content'];
        if (this.props.locked) {
            innerClassNames.push('lock-contents');
            innerClassNames.push('locked');
        }

        let innerClassName = innerClassNames.join(' ');
        return (
            <section className={className} {...this.props}>
                <header>{this.props.title}</header>
                <div className={innerClassName}>{this.children}</div>
            </section>
        );
    }
}
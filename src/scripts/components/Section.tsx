import Cascade, { Component, Elements } from 'cascade';

export interface ISectionProps extends Elements.JSXElement {
    title: any;
}

export default class Section extends Component<ISectionProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('section');
        let className = classNames.join(' ');
        return (
            <section className={className} {...this.props}>
                <header>{this.props.title}</header>
                <div className="section-content">{this.children}</div>
            </section>
        );
    }
}
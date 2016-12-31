import Cascade, { Component, Elements } from 'cascade';

export interface ISectionProps extends Elements.JSXElement {
    title: any;
}

export default class Section extends Component<ISectionProps> {
    render() {
        return (
            <section className="section">
                <header>{this.props.title}</header>
                <div className="section-content">{this.children}</div>
            </section>
        );
    }
}
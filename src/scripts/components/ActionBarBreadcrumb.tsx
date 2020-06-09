import Cascade, { Component, Ref, observable } from 'cascade';

import ClassNames from '../util/ClassNames';

interface IActionBarItem {
    title: string;
    onClick?: () => any;
    link?: string;
}

export interface IActionBarBreadcrumbProps {
    className?: string;
    id?: string;
    items?: IActionBarItem[];
}

export default class ActionBarBreadcrumb extends Component<IActionBarBreadcrumbProps> {
    @observable observer?: IntersectionObserver;
    ref: Ref<HTMLDivElement> = new Ref();

    afterRender(_node: Element, update: boolean) {
        if (!update) {
            let breadcrumbHeader = this.ref.current;
            //let breadcrumbDropdown = document.querySelector('.action-bar-dropdown');

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('action-bar-breadcrumb-item-hidden')) {
                            entry.target.classList.remove('action-bar-breadcrumb-item-hidden');
                        }
                    } else {
                        if (!entry.target.classList.contains('action-bar-breadcrumb-item-hidden')) {
                            entry.target.classList.add('action-bar-breadcrumb-item-hidden');
                        }
                    }
                });
                let hiddenCount = 0;
                breadcrumbHeader.childNodes.forEach(child => {
                    if (child instanceof Element) {
                        if (child.classList.contains('action-bar-breadcrumb-item-hidden')) {
                            hiddenCount++;
                        }
                    }
                })
                if (hiddenCount > 0) {
                    breadcrumbHeader.setAttribute('data-align', 'end');
                    //breadcrumbDropdown.classList.remove('action-bar-breadcrumb-item-hidden');
                } else {
                    breadcrumbHeader.removeAttribute('data-align');
                    //breadcrumbDropdown.classList.add('action-bar-breadcrumb-item-hidden');
                }
            }, {
                root: breadcrumbHeader,
                rootMargin: '0px',
                threshold: 1
            })

            breadcrumbHeader.childNodes.forEach(child => {
                if (child instanceof Element) {
                    this.observer.observe(child);
                }
            });
        }
    }

    afterDispose() {
        this.observer.disconnect();
    }

    render() {
        let {
            id,
            className,
        } = this.props;

        let classNames = new ClassNames(className, 'action-bar', 'action-bar-breadcrumb');

        return (
            <div
                ref={this.ref}
                className={classNames.toString()}
                id={id}
            >
                {this.observer ?
                    this.children.map((child: any, index: number) => {
                        return (
                            <ActionBarItem
                                key={index}
                                observer={this.observer}
                            >
                                {child}
                            </ActionBarItem>
                        );
                    }) :
                    undefined}
            </div>
        );
    }
}

export interface IActionBarItemProps {
    observer: IntersectionObserver;
}

export class ActionBarItem extends Component<IActionBarItemProps> {
    @observable hidden?: boolean = false;
    ref: Ref<HTMLDivElement> = new Ref();

    afterRender(node: Element, update: boolean) {
        if (!update) {
            this.props.observer.observe(this.ref.current);
        }
    }

    afterDispose() {
        this.props.observer.unobserve(this.ref.current);
    }

    render() {
        return (
            <div
                ref={this.ref}
            >
                {this.children}
            </div>
        )
    }

}
import Cascade, { Component } from 'cascade';

import { MenuBar, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface IMenuBarViewProps {

}

export default class MenuBarView extends Component<IMenuBarViewProps> {
    render() {
        return (
            <MenuBar
                top
                title="Cascade Components"
                links={[
                    {
                        active: true,
                        title: 'Home',
                        href: '#'
                    }
                ]}
            />
        );
    }
}

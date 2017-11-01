import Cascade, { Component } from 'cascade';

import { MenuBar, Button, Section, UserThumbnail } from '../../../../../scripts/modules/CascadeComponents';

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
                    }, {
                        reverse: true,
                        title: (
                            <Button popover={<div>Logout</div>} popoverDirection="bottom" popoverAlign="right">
                                <UserThumbnail src="https://placebear.com/50/50" size="small" />
                            </Button>
                        )
                    }
                ]}
            />
        );
    }
}

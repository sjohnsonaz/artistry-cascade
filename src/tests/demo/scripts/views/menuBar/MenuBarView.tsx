import Cascade, { Component } from 'cascade';

import { Button, MenuBar, MenuBarLink, Popover, Section, UserThumbnail } from '../../../../../scripts/modules/CascadeComponents';

export interface IMenuBarViewProps {

}

export default class MenuBarView extends Component<IMenuBarViewProps> {
    render() {
        return (
            <MenuBar
                top
                title="Cascade Components"
            >
                <MenuBarLink
                    active
                    title="Home"
                    href="#"
                />
                <li class="menu-spacer"></li>
                <MenuBarLink
                    reverse
                    simple
                    noLink
                    title={
                        <UserThumbnail
                            src="https://placebear.com/50/50"
                            placeholder="C"
                            size="small"
                            popover={"Logout"}
                            popoverDirection="bottom"
                            popoverAlign="right"
                        />
                    }
                />
                <MenuBarLink
                    reverse
                    simple
                    noLink
                    title={
                        <UserThumbnail
                            src=""
                            placeholder="C"
                            size="small"
                            popover={"Logout"}
                            popoverDirection="bottom"
                            popoverAlign="right"
                        />
                    }
                />
            </MenuBar>
        );
    }
}

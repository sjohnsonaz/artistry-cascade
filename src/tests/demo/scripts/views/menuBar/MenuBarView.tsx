import Cascade, { Component, observable } from 'cascade';

import { Button, MenuBar, MenuBarLink, Popover, Section, UserThumbnail } from '../../../../../scripts/modules/CascadeComponents';

export interface IMenuBarViewProps {

}

export default class MenuBarView extends Component<IMenuBarViewProps> {
    @observable userMenuOpen: boolean = false;
    toggleUserMenu = (event: MouseEvent) => {
        event.preventDefault();
        this.userMenuOpen = !this.userMenuOpen;
    }
    closeUserMenu = (event: MouseEvent) => {
        event.preventDefault();
        this.userMenuOpen = false;
    }
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
                            onclick={this.toggleUserMenu}
                            popover={"Logout"}
                            popoverDirection="bottom"
                            popoverAlign="right"
                            popoverMenu
                            popoverOpen={this.userMenuOpen}
                            menuBarTop
                            onPopoverClose={this.closeUserMenu}
                        />
                    }
                />
            </MenuBar>
        );
    }
}

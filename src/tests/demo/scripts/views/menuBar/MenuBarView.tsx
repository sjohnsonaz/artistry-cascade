import Cascade, { Component, observable } from 'cascade';

import { MenuBar, MenuBarLink, UserThumbnail, Spacer } from '../../../../../scripts/modules/ArtistryCascade';

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
                title="Artistry Cascade"
            >
                <MenuBarLink
                    active
                    title="Home"
                    href="#"
                />
                <Spacer />
                <MenuBarLink
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

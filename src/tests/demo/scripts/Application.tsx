declare var window: any;

import Cascade from 'cascade';

import { Container, BodyScroll } from '../../../scripts/modules/CascadeComponents';

import ButtonView from './views/button/ButtonView';
import RangeView from './views/range/RangeView';
import ToggleView from './views/toggle/ToggleView';
import CalendarView from './views/calendar/CalendarView';
import ProgressBarView from './views/progressBar/ProgressBarView';
import MenuBarView from './views/menuBar/MenuBarView';
import ModalView from './views/modal/ModalView';
import SectionView from './views/section/SectionView';
import CarouselView from './views/carousel/CarouselView';
import TabView from './views/tab/TabView';
import TableView from './views/table/TableView';
import PagerView from './views/pager/PagerView';
import FormView from './views/form/FormView';
import CodeView from './views/code/CodeView';
import DrawerView from './views/drawer/DrawerView';
import ViewModel from './ViewModel';
import User from './models/User';
import UserListView from './views/user/UserListView';

export default class Application {
    static run() {
        var viewModel = new ViewModel();
        window.viewModel = viewModel;
        window.User = User;
        viewModel.bodyScrollLocked;
        Cascade.subscribe<boolean>(viewModel, 'bodyScrollLocked', (value) => {
            BodyScroll.lock(value);
        });
        Cascade.render(
            document.getElementById('root'),
            <Container menuBarTop>
                <MenuBarView />
                <h2>Components</h2>
                <ButtonView />
                <RangeView />
                <ToggleView />
                <CalendarView />
                <ProgressBarView />
                <ModalView />
                <DrawerView />
                <SectionView />
                <CarouselView />
                <TabView />
                <TableView />
                <PagerView />
                <FormView />
                <CodeView />
                <h2>Examples</h2>
                <UserListView viewModel={viewModel} />
            </Container>,
            function () {
                console.log('started');
            }
        );
        var user = new User('First', 'User');
        viewModel.users.push(user);
    }
}

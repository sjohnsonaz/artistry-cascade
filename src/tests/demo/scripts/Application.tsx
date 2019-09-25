declare var window: any;

import Cascade from 'cascade';

import { Container, BodyScroll, Portal, DepthStack } from '../../../scripts/modules/ArtistryCascade';

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
import ListView from './views/list/ListView';
import ScrollableView from './views/scrollable/ScrollableView';
import FormView from './views/form/FormView';
import FileUploadView from './views/file-upload/FileUploadView';
import CodeView from './views/code/CodeView';
import DrawerView from './views/drawer/DrawerView';
import GridView from './views/grid/GridView';
import ViewModel from './ViewModel';
import User from './models/User';
import UserListView from './views/user/UserListView';
import CardView from './views/card/CardView';
import NotificationView from './views/notification/NotificationView';

export default class Application {
    static run() {
        var viewModel = new ViewModel();
        window.viewModel = viewModel;
        window.User = User;
        Portal.addElement('modal-root', 'modal-root');
        BodyScroll.init();
        DepthStack.init();
        Cascade.render(
            document.getElementById('root'),
            <Container menuBarTop screenSize="all">
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
                <ListView />
                <ScrollableView />
                <FormView />
                <FileUploadView />
                <CodeView />
                <GridView />
                <CardView />
                <NotificationView />
                <h2>Examples</h2>
                <UserListView viewModel={viewModel} />
            </Container>
        );
        console.log('started');
        var user = new User('First', 'User');
        viewModel.users.push(user);
    }
}

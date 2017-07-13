declare var window: any;

import Cascade from 'cascade';

import { Container } from '../../../scripts/modules/CascadeComponents';

import ButtonView from './views/button/ButtonView';
import RangeView from './views/range/RangeView';
import ToggleView from './views/toggle/ToggleView';
import ProgressBarView from './views/progressBar/ProgressBarView';
import ModalView from './views/modal/ModalView';
import SectionView from './views/section/SectionView';
import CarouselView from './views/carousel/CarouselView';
import TabView from './views/tab/TabView';
import FormView from './views/form/FormView';
import CodeView from './views/code/CodeView';
import ViewModel from './ViewModel';
import User from './models/User';
import UserListView from './views/user/UserListView';

export default class Application {
    static run() {
        var viewModel = new ViewModel();
        window.viewModel = viewModel;
        window.User = User;
        Cascade.render(
            document.getElementById('root'),
            <Container>
                <h2>Components</h2>
                <ButtonView />
                <RangeView />
                <ToggleView />
                <ProgressBarView />
                <ModalView />
                <SectionView />
                <CarouselView />
                <TabView />
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

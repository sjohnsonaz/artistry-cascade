import 'reflect-metadata';
import Cascade from 'cascade';
import * as FontAwesome from '@fortawesome/free-solid-svg-icons';
import Icons from '@artistry/icons';

import Application from './Application';

window.onload = function() {
    Icons.registerFontAwesome(FontAwesome.fas);
    document.body.appendChild(Icons.createIconRoot());
    Icons.setCreateElement(Cascade.createElement);
    Application.run();
};

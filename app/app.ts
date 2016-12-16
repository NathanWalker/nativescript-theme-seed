import * as app from 'application';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
import { isActive } from './sidedrawer/sidedrawer';
require("nativescript-dom");

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
  'fa': 'font-awesome.css'
};
TNSFontIcon.loadCss();

app.resources['fonticon'] = fonticon;
app.resources['isActive'] = isActive;
app.setCssFileName('yours.css');
app.start({ moduleName: 'main-page' });
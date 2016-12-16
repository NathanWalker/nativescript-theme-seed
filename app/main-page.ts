
import { EventData } from "data/observable";
import { Page } from "ui/page";
import * as app from 'application';
import { isIOS, isAndroid, device } from 'platform';
import { topmost } from 'ui/frame';
import { Color } from 'color';
import { NavigationViewModel } from './navigation-vm';
import { knownFolders } from 'file-system';
var themes = require('nativescript-themes');

export function navigatingTo(args: EventData) {
  var page = <Page>args.object;
  page.bindingContext = new NavigationViewModel(page);

  if (isIOS) {
    let controller = topmost().ios.controller;
    let navigationBar = controller.navigationBar;
    navigationBar.barStyle = 0;
  }

  let appPath = knownFolders.currentApp().path + '/';
  themes.applyTheme(`${appPath}/yours.css`);
}
import { EventData } from "data/observable";
import { Page } from "ui/page";
import { BaseModel } from './base';
import { knownFolders } from 'file-system';
import { isIOS, isAndroid } from 'platform';
var themes = require('nativescript-themes');

export class ThemesModel extends BaseModel {
    public labelText: string;
    private _toggled: boolean = false;

    constructor(page: Page) {
        super(page);
        let active = themes.getAppliedTheme(this.getPath('yours.css'));
        this.label = this.getThemeName(active);
        themes.applyTheme(active);
    }

    public set label(value: string) {
        this.set('labelText', value);
    }

    public applyTheme(args) {
        let style = args.object.cssName;
        this.label = this.getThemeName(style);
        themes.applyTheme(this.getPath(style));
    }

    private getThemeName(cssPath: string): string {
        if (!cssPath || cssPath.indexOf('yours.css') > -1) {
            return 'Default';
        } 
        // You could setup more
    }

    private getPath(name: string) {
        let appPath = knownFolders.currentApp().path + '/';
        return `${appPath}/${name}`;
    }
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ThemesModel(page);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
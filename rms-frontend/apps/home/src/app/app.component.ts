import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Store, Select } from '@ngxs/store';
import { GlobalState, SetTheme } from '@rms-frontend/core';
import { Observable } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HelpBase } from '@rms-frontend/help-modal';

@Component({
  selector: 'home-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public overlayContainer: OverlayContainer, public store: Store) { }
  title = 'Home';
  links: KeyValue<string, string>[] = [
    {
      key: 'Main Home',
      value: `https://RMSLowside.github.io/rmslow/apps/home/`
    },
    {
      key: 'Kaylee Home',
      value: `https://saepark90.github.io/rmslow/apps/home/`
    },
    {
      key: 'Steve Home',
      value: `https://smcfall2.github.io/rmslow/apps/home/`
    },
    {
      key: 'Daniel Home',
      value: `https://flare891.github.io/rmslow/apps/home`
    },
    { key: 'S3 App', value: `${location.origin}/rmslow/apps/s3` },
    { key: 'Lazy App', value: `${location.origin}/rmslow/apps/lazy-load` },
    { key: 'NGXS Form App', value: `${location.origin}/rmslow/apps/ngxs-forms` },
    { key: 'Date Translation App', value: `${location.origin}/rmslow/apps/date-translation`}
  ];
  @Select(GlobalState.getTheme) theme$: Observable<string>;

  themeSub = this.theme$.subscribe(a => {
    this.overlayContainer.getContainerElement().classList.remove('dark-theme');
    this.overlayContainer.getContainerElement().classList.remove('light-theme');
    this.overlayContainer.getContainerElement().classList.add(`${a}-theme`);
  });
  themeChange(theme) {
    this.store.dispatch(new SetTheme(theme));
  }

  getHelpModalContent() {
    const helpContent = [
      new HelpBase({
        type: 'text',
        title: 'test1',
        order: 2,
        value: 'test help content'
      }),
      new HelpBase({
        type: 'link',
        title: 'link to main home page ',
        order: 3,
        value: 'https://rmslowside.github.io/rmslow/apps/home/'
      }),
      new HelpBase({
        type: 'text',
        title: 'Home page',
        order: 1,
        value: 'Contains help file content'
      })
    ]

    return helpContent;
  }
}

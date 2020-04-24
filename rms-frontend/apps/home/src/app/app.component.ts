import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Store, Select } from '@ngxs/store';
import { GlobalState, SetTheme } from '@rms-frontend/core';
import { Observable } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HelpBase, HelpText, HelpLink } from '@rms-frontend/help-modal';

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
    { key: 'NGXS Form App', value: `${location.origin}/rmslow/apps/ngxs-forms` }
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
      new HelpText({
        title: 'test1',
        order: 2,
        text: 'test help content'
      }),
      new HelpLink({
        title: 'link to main home page ',
        order: 3,
        link: 'https://rmslowside.github.io/rmslow/apps/home/'
      }),
      new HelpText({
        title: 'test3',
        order: 1,
        text: 'test help content'
      })
    ]

    return helpContent;
  }
}

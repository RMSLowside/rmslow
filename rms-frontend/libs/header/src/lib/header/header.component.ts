import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HelpModalComponent } from '@rms-frontend/help-modal';
import { Select, Store } from '@ngxs/store';
import { GlobalState, SetTheme } from '@rms-frontend/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rms-frontend-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string;
  @Input() helpContent: any = [];
  @Output() helpChange = new EventEmitter<string>();
  @Select(GlobalState.getTheme) theme$: Observable<string>;
  themeSub = this.theme$.subscribe(a => {
    document.body.classList.remove('dark-theme');
    document.body.classList.remove('light-theme');
    document.body.classList.add(`${a}-theme`);
  });

  constructor(public dialog: MatDialog, public store: Store) {}

  links: KeyValue<string, string>[] = [
    {
      key: 'Main Home',
      value: `https://RMSLowside.github.io/rmslow/apps/home/`
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
    {
      key: 'NGXS Form App',
      value: `${location.origin}/rmslow/apps/ngxs-forms`
    },
    {
      key: 'Date Translation App',
      value: `${location.origin}/rmslow/apps/date-translation`
    },
    {
      key: 'Rules Engine',
      value: `${location.origin}/rmslow/apps/rules-engine`
    },
    {
      key: 'Metrics',
      value: `${location.origin}/rmslow/apps/charts`
    }
  ];

  openHelpModal() {
    // check if help modal is already open
    if (this.dialog.openDialogs.findIndex(x => x.id === 'help-modal') == -1) {
      const dialogRef = this.dialog.open(HelpModalComponent, {
        id: 'help-modal',
        hasBackdrop: false,
        minWidth: '500px',
        minHeight: '400px',
        position: { top: '70px', right: '10px' }
      });
      dialogRef.componentInstance.title = 'Home Page Help Modal';
      dialogRef.componentInstance.contents = this.helpContent;
      dialogRef.componentInstance.updateHelpContent.subscribe(value => {
        this.HelpContentChange(value);
      });
      dialogRef.afterClosed().subscribe(res => {
        console.log('help modal closed');
      });
    }
  }
  themeChange(theme: string) {
    this.store.dispatch(new SetTheme(theme));
  }

  HelpContentChange(value) {
    this.helpChange.emit(value);
  }
}

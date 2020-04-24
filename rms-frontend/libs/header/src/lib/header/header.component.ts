import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HelpComponent, HelpModalBase } from '@rms-frontend/help-modal';

@Component({
  selector: 'rms-frontend-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string;
  @Output() themeChange = new EventEmitter<string>();
  constructor(public dialog: MatDialog) { }

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
    { key: 'S3 App', value: `${location.origin}/rmslow/apps/s3` },
    { key: 'Lazy App', value: `${location.origin}/rmslow/apps/lazy-load` }
  ];

  openHelpModal() {
    // ccheck if help modal is already open
    if (this.dialog.openDialogs.findIndex(x => x.id === 'help-modal') == -1) {
      const dialogRef = this.dialog.open(HelpComponent,
        {
          id: 'help-modal',
          hasBackdrop: false,
          width: '500px',
          position: { top: '70px', right: '10px' }
        });
      dialogRef.componentInstance.title = 'Home Page Help Modal';
      dialogRef.componentInstance.contents = this.getHelpContent()
      dialogRef.afterClosed().subscribe(res => {
        console.log('help modal closed');
      });
    }
  }

  getHelpContent() {
    const helpContent = [
      new HelpModalBase('text', 'test1', 'test help content'),
      new HelpModalBase('link', 'link to main home page ', 'https://rmslowside.github.io/rmslow/apps/home/'),
      new HelpModalBase('text', 'test3', 'test help content'),
    ]

    return helpContent;
  }
}

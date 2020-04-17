import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'rms-frontend-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string;
  @Output() themeChange = new EventEmitter<string>();
  constructor() {}

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
}

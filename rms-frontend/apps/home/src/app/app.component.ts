import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'home-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'home';
  links: KeyValue<string, string>[] = [
    {
      key: 'Kaylee Home',
      value: `https://saepark90.github.io/rmslow/apps/lazy-load/`
    },
    {
      key: 'Steve Home',
      value: `https://smcfall2.github.io/rmslow/apps/lazy-load/`
    },
    { key: 'S3 App', value: `${location.origin}/rmslow/apps/s3` },
    { key: 'Lazy App', value: `${location.origin}/rmslow/apps/lazy-load` }
  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'rms-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'date-translation';
  startQuery: string;
  endQuery: string;

  onEmit(result: string){
    this.endQuery = result;
  }
}

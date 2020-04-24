import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DateRangeModule } from '@rms-frontend/date-range';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DateRangeModule,
    FormsModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

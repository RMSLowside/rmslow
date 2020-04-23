import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@rms-frontend/core';
import { HelpComponent } from './help/help.component';

@NgModule({
  imports: [CommonModule, CoreModule],
  declarations: [HelpComponent]
})
export class HelpModalModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from '@rms-frontend/core';
import { HelpModalModule } from '@rms-frontend/help-modal';

@NgModule({
  imports: [CommonModule, CoreModule, HelpModalModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }

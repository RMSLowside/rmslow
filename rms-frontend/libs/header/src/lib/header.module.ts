import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from '@rms-frontend/core';

@NgModule({
  imports: [CommonModule, CoreModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CoreModule, GlobalState } from '@rms-frontend/core';
import { HelpModalModule } from '@rms-frontend/help-modal';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HelpModalModule,
    NgxsModule.forFeature([GlobalState])
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}

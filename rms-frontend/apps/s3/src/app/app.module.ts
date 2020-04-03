import { NgModule } from '@angular/core';

import { CoreModule } from '@rms-frontend/core';

import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { FileExplorerModule } from '@rms-frontend/file-explorer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExplorerState } from './+state/file.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    FileExplorerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([ExplorerState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

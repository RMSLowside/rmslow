import { NgModule } from '@angular/core';

import { CoreModule, GlobalState, AuthState } from '@rms-frontend/core';

import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExplorerState } from './+state/file.state';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SessionModalComponent } from './session-modal/session-modal.component';

@NgModule({
  declarations: [AppComponent, SessionModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([GlobalState, AuthState, ExplorerState]),
    NgxsStoragePluginModule.forRoot({
      key: [GlobalState, ExplorerState]
    }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

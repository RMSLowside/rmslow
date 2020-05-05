import { NgModule } from '@angular/core';
import { CoreModule, GlobalState } from '@rms-frontend/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NovelsState, FormState } from './+state/forms.state'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NewNovelComponent } from './new-novel-component/new-novel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from '@rms-frontend/header'

@NgModule({
  declarations: [
    AppComponent,
    NewNovelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([GlobalState, NovelsState, FormState]),
    NgxsStoragePluginModule.forRoot(),
    NgxsFormPluginModule.forRoot()    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

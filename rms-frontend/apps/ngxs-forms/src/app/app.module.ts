import { NgModule } from '@angular/core';
import { CoreModule } from '@rms-frontend/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NovelsState, FormState } from './+state/forms.state'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NewNovelComponent } from './new-novel-component/new-novel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NewNovelComponent
  ],
  imports: [
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([NovelsState, FormState]),
    NgxsStoragePluginModule.forRoot(),
    NgxsFormPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, GlobalState, AuthState } from '@rms-frontend/core';

import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateRuleModalComponent } from './create-rule-modal/create-rule-modal.component';
import { OrderRulesModalComponent } from './order-rules-modal/order-rules-modal.component';
import { TestRulesModalComponent } from './test-rules-modal/test-rules-modal.component';

import { CreateRuleComponent } from './create-rule-modal/create-rule/create-rule.component';
import { RuleBuildPieceComponent } from './create-rule-modal/rule-build-piece/rule-build-piece.component';
import { TestRuleComponent } from './create-rule-modal/test-rule/test-rule.component';

import { RulesState } from './+state/rules.state';

@NgModule({
  declarations: [
    AppComponent,
    CreateRuleModalComponent,
    OrderRulesModalComponent,
    TestRulesModalComponent,
    CreateRuleComponent,
    RuleBuildPieceComponent,
    TestRuleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([GlobalState, AuthState, RulesState]),
    NgxsStoragePluginModule.forRoot({
      key: [GlobalState]
    }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

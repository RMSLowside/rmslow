import { Component, ViewContainerRef, ComponentFactoryResolver, ViewChild, Injector, OnInit, AfterViewInit, ComponentRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GlobalState, AuthState, SetTheme } from '@rms-frontend/core';
import { Observable } from 'rxjs';
import { HeaderComponent } from '@rms-frontend/header';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'rms-frontend-lazy-load',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'lazy-load';

  @Select(GlobalState.getTheme) theme$: Observable<string>;
  @Select(AuthState.isAuthenticated) authed$: Observable<boolean>;
  @ViewChild('header', { read: ViewContainerRef }) vcr: ViewContainerRef;
  headerRef: ComponentRef<HeaderComponent>;

  authedSub = this.authed$.subscribe(a => {
    if (a) {
      this.loadHeader();
      this.authedSub.unsubscribe();
    }
  });

  themeSub = this.theme$.subscribe(a => {
    this.overlayContainer.getContainerElement().classList.remove('dark-theme');
    this.overlayContainer.getContainerElement().classList.remove('light-theme');
    this.overlayContainer.getContainerElement().classList.add(`${a}-theme`);
  });

  themeChange(theme) {
    this.store.dispatch(new SetTheme(theme));
  }

  constructor(
    public overlayContainer: OverlayContainer,
    public store: Store,
    private cfr: ComponentFactoryResolver
  ) {}
  async loadHeader() {
    if (!this.headerRef) {
      const { HeaderComponent } = await import('@rms-frontend/header');
      const factory = this.cfr.resolveComponentFactory(HeaderComponent);
      this.headerRef = this.vcr.createComponent(factory);
      this.headerRef.instance.title = this.title;
      this.headerRef.hostView.detectChanges();
      this.headerRef.instance.themeChange.subscribe(theme => {
        this.themeChange(theme);
      });
    }
  }


}

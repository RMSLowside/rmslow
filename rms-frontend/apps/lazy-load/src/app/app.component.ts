import {
  Component,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild,
  Injector,
  OnInit,
  AfterViewInit,
  ComponentRef
} from '@angular/core';
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

  @Select(AuthState.isAuthenticated) authed$: Observable<boolean>;
  @ViewChild('header', { read: ViewContainerRef }) vcr: ViewContainerRef;
  headerRef: ComponentRef<HeaderComponent>;

  authedSub = this.authed$.subscribe(a => {
    if (a) {
      this.loadHeader();
      this.authedSub.unsubscribe();
    }
  });

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
    }
  }
}

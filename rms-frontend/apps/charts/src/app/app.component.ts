import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { OverlayContainer } from '@angular/cdk/overlay';
import { GlobalState, SetTheme, Login, AuthState } from '@rms-frontend/core';
import { HeaderComponent } from '@rms-frontend/header';

@Component({
  selector: 'charts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'charts';

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
      this.headerRef.instance.title = 'Charts';
      this.headerRef.hostView.detectChanges();
    }
  }
}

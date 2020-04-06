import { Component, ViewContainerRef, ComponentFactoryResolver, ViewChild, Injector, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'rms-frontend-lazy-load',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'lazy-load';

  @ViewChild('btnContainer', { read: ViewContainerRef }) btnContainer: ViewContainerRef;
  @ViewChild('container1', { read: ViewContainerRef }) container1: ViewContainerRef;
  @ViewChild('container2', { read: ViewContainerRef }) container2: ViewContainerRef;
  @ViewChild('container3', { read: ViewContainerRef }) container3: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    //viewContainerRef clear function doesn't clear static component so if inital component needs to be displayed create the component them manually.    
    this.lazyLoadComponent1();
    this.lazyLoadTabContent1();
  }

  async lazyLoadComponent1() {
    this.btnContainer.clear(); // clear existing component  will not clear static componentu
    const name = 'test';
    import('./part1/part1.component').then(
      ({ Part1Component }) => {
        const component = this.cfr.resolveComponentFactory(Part1Component);
        const componentRef = this.btnContainer.createComponent(component);
        componentRef.instance.name = name;
      }
    );
  }

  async lazyLoadFileExplorerModule() {
    import('@rms-frontend/file-explorer').then(
      ({ FileExplorerModule }) => {
        import('libs/file-explorer/src/lib/file-explorer/file-explorer.component').then(
          ({ FileExplorerComponent }) => {
            const component = this.cfr.resolveComponentFactory(FileExplorerComponent);
            const componentRef = this.container3.createComponent(component);
          }
        )
      })
  }

  async getLazy1() {
    this.btnContainer.clear(); // clear existing component  will not clear static componentu
    const name = 'test';
    import('./part2/part2.component').then(
      ({ Part2Component }) => {
        const component = this.cfr.resolveComponentFactory(Part2Component);
        const componentRef = this.btnContainer.createComponent(component);
        componentRef.instance.name = name;
      }
    );
  }

  async getLazy2() {
    this.btnContainer.clear(); // clear existing component in the container
    const { Part3Component } = await import('./part3/part3.component');
    this.btnContainer.createComponent(
      this.cfr.resolveComponentFactory(Part3Component)
    );
  }

  tabSelectionChanged(event) {
    let selectedTabName = event.tab.textLabel;
    console.log(selectedTabName);

    switch (selectedTabName) {
      case 'Frst':
        this.lazyLoadTabContent1()
        break;

      case 'Second':
        this.lazyLoadTabContent2()
        break;
      case 'File Explorer':
        this.lazyLoadFileExplorerModule()
        break;

      default:
        break;
    }
  }

  async lazyLoadTabContent1() {
    this.container1.clear();
    import('./tab-content1/tab-content1.component').then(
      ({ TabContent1Component }) => {
        const component = this.cfr.resolveComponentFactory(TabContent1Component);
        const componentRef = this.container1.createComponent(component);
      }
    );
  }

  async lazyLoadTabContent2() {
    this.container2.clear();
    import('./part1/part1.component').then(
      ({ Part1Component }) => {
        const component = this.cfr.resolveComponentFactory(Part1Component);
        const componentRef = this.container2.createComponent(component);
        componentRef.instance.name = name;
      }
    );
  }

  async lazyLoadTabContent3() {
    this.container3.clear();
    import('./part1/part1.component').then(
      ({ Part1Component }) => {
        const component = this.cfr.resolveComponentFactory(Part1Component);
        const componentRef = this.container3.createComponent(component);
        componentRef.instance.name = name;
      }
    );
  }
}

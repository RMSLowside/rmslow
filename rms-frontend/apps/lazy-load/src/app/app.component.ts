/**
 * Lazy loading components
 * REFERENCE EXAMPLE
 * https://medium.com/angular-in-depth/lazy-load-components-in-angular-596357ab05d8
 * 
 * ADVANTAGE OF LAZY LOAD
 * * less components loaded which will enhance performance when application starts to get larger
 * * smaller bundle size
 * * as application grows lazy loading component will 
 * reduce the size of the javascript file ehanceing performance
 * 
 * PLACES WE CAN USE LAZY LOADING COMPONENT
 * could use this in our dynamic forms reduce amount of unused components to be imported each time
 * 
 * 
 * THINGS TO KEEP IN MIND WHEN LAZY LOADING COMPONENT
 * life cycle hooks:
 * * when lazy loading component ngOnChange life cycle hook doesn't get triggered.
 * therefore when properties are changed we have manually call ngOnChanges life cycle hook.
 * 
 */
import { Component, ViewContainerRef, ComponentFactoryResolver, ViewChild, Injector, OnInit, AfterViewInit } from '@angular/core';
import { Part1Component } from './part1/part1.component';

@Component({
  selector: 'rms-frontend-lazy-load',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'lazy-load';

  @ViewChild('btnContainer', { read: ViewContainerRef }) btnContainer: ViewContainerRef;
  @ViewChild('container1', { read: ViewContainerRef }) container1: ViewContainerRef;
  @ViewChild('container2', { read: ViewContainerRef }) container2: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  ngAfterViewInit(): void {
    //viewContainerRef clear function doesn't clear static component so if inital component needs to be displayed create the component them manually.

    this.btnContainer.createComponent(this.cfr.resolveComponentFactory(Part1Component));
  }

  async lazyLoadComponent1() {
    const { Part1Component } = await import('./part1/part1.component');
    const part1ComponentFactory = this.cfr.resolveComponentFactory(Part1Component);
    const { instance } = this.container1.createComponent(part1ComponentFactory, null, this.injector);
    // instance.question = this.quizservice.getNextQuestion();
    // instance.questionAnswered.pipe(
    //   takeUntil(instance.destroy$)
    // ).subscribe(() => this.showNewQuestion());
    // (instance as any).ngOnChanges({
    //   question: new SimpleChange(null, instance.question, true)
    // });
  }


  async getLazy1() {
    this.btnContainer.clear(); // clear existing component  will not clear static component
    const { Part2Component } = await import('./part2/part2.component');
    const { instance } = this.btnContainer.createComponent(this.cfr.resolveComponentFactory(Part2Component));
    instance.name = "test";
  }

  async getLazy2() {
    this.btnContainer.clear(); // clear existing component
    const { Part3Component } = await import('./part3/part3.component');
    this.btnContainer.createComponent(
      this.cfr.resolveComponentFactory(Part3Component)
    );
  }


}

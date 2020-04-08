# Lazy loading components


 
 ## ADVANTAGE OF LAZY LOAD
 - less components loaded which will enhance performance when application starts to get larger
    - smaller bundle size
    - as application grows lazy loading component will reduce the size of the javascript file ehanceing performance
  
 ## THINGS TO KEEP IN MIND WHEN LAZY LOADING COMPONENT
 - viewContainerRef clear function doesn't clear static component so if inital component needs to be lazy loaded component needs to be manually created in AfterViewInit function.
 - life cycle hooks:
    - when lazy loading component ngOnChange life cycle hook doesn't get triggered. therefore when properties are changed we have manually call ngOnChanges life cycle hook.

  ## REFERENCE
 https://medium.com/angular-in-depth/lazy-load-components-in-angular-596357ab05d8
# Rms-FrontEnd

## Angular
All of our applications are built with the Angular Framework. Visit [Angular Documentation](https://angular.io/) for more information.

## Applications
[S3](https://github.com/RMSLowside/rmslow/tree/master/rms-frontend/apps/s3) - An application used to wrap S3 in a more user friendly way. 

## Libraries
[Core](https://github.com/RMSLowside/rmslow/tree/master/rms-frontend/libs/core) - Core library that has things that all applications and libs need, such as Angular Material.

[File Explorer](https://github.com/RMSLowside/rmslow/tree/master/rms-frontend/libs/file-explorer) - A file explorer library that takes in a list of file elements and shows it on the screen. Currently used by the S3 application.

## Quick Start & Nx Documentation
This project was generated using [Nx](https://nx.dev).

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@rms/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.


## Angular Material

Angular Material is the first party component library for Angular application. Visit [Angular Material Documentation](https://material.angular.io/) for more information

## Application/Library structure

Anything that can be put in libs, should be put in libs. For the most part anything in libs should handle state by itself, mostly with just inputs and outputs, possible exceptions will be forms, logger, and user services. Everythign should be made with smart and dumb components. Smart components are attached to state and should not have much if any visual parts. They should be containers for dumb components. This keeps our dumb components as reusable as possible. Dumb components should not rely on services and should take in and emit values. Example of a smart component is the [S3 app](https://github.com/RMSLowside/rmslow/tree/master/rms-frontend/apps/s3/src/app) The app.component handles all of the business logic and state, but leaves all the view portions to the [File Explorer lib](https://github.com/RMSLowside/rmslow/tree/master/rms-frontend/libs/file-explorer).

## NGXS

This project uses NGXS for state management. NGXS is a redux based state management library. Some benefits of a redux based solution is that it provides an immutable single source of truth for state. THis makes debugging actions much easier and consistent. To ensure immutability we are leveraging Immer and the NGXS Immer plugin. Visit [NGXS Documentation](https://www.ngxs.io/) for more information.

## Testing

Our test are written and run in Jest.

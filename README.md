# MLS frontend

There are multiple libraries based on Angular 9, bundled in one application.

All commands need to be executed from the root directory if not noted otherwise.

## Install Angular CLI

To install the Angular CLI, simply run the following command (`-g` installs it globally so you can call it from the command line):
`npm i -g @angular/cli`

## Install dependencies

Run `npm i` to install the required dependencies.

After the initial run of `npm i`, the libraries need to be built with `npm run build-all`.
Further changes can be built manually using `npm run build *library*`, where `*library*` is the name of the library (i.e., the directory).
It is also possible to listen for changes in the library using `npm run build *library* -- --watch`.

See the README files for the API libraries for more information on generating the API definitions (which is not required for running the application).

## Start the project

After Angular CLI and the dependencies have been installed, you can run each App using the Angular Webserver:

```
npm start mls
```

Navigate to http://localhost:4200.
The app will automatically reload if you change any of the watched source files (see above).

## Start the application with Docker

Run `docker-compose build` and `docker-compose up` to build and start the application in an Nginx container.
The container binds to http://localhost:8089.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

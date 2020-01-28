# MLS Auth Service API

## Generating

Most code in this library is auto-generated using [ng-swagger-gen](https://github.com/cyclosproject/ng-swagger-gen):
* Run the Auth service and gateway (on port 8090).
* Install the dev dependencies for the Auth API library by running `npm i` (from within the auth-api directory)
* Run the execution script with `npm run generate`

## Building

Build the module using `npm run build auth-api` (from the angular root module).

## Usage

The library path is set through the root `angular.json` file.
After the API library has been built all classes can be imported with `import {ClassName} from 'mls-auth-api';`
(CAVE: The IDE sometimes auto-generates imports using relative paths, but it has to be `mls-auth-api`!)

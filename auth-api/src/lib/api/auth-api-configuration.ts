/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class AuthApiConfiguration {
  rootUrl: string = 'http://localhost:8092';
}

/**
 * Parameters for `AuthApiModule.forRoot()`
 */
export interface AuthApiConfigurationParams {
  rootUrl?: string;
}

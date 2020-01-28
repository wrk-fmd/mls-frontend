/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for AuthApi services
 */
@Injectable({
  providedIn: 'root',
})
export class AuthApiConfiguration {
  rootUrl: string = '//localhost:8090/auth';
}

export interface AuthApiConfigurationInterface {
  rootUrl?: string;
}

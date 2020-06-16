/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for CocesoRest services
 */
@Injectable({
  providedIn: 'root',
})
export class CocesoRestConfiguration {
  rootUrl: string = '//localhost:8090/coceso';
}

export interface CocesoRestConfigurationInterface {
  rootUrl?: string;
}

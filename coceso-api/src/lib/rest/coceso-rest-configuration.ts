/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class CocesoRestConfiguration {
  rootUrl: string = 'http://localhost:8093';
}

/**
 * Parameters for `CocesoRestModule.forRoot()`
 */
export interface CocesoRestConfigurationParams {
  rootUrl?: string;
}

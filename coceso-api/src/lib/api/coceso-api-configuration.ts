/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for CocesoApi services
 */
@Injectable({
  providedIn: 'root',
})
export class CocesoApiConfiguration {
  rootUrl: string = '//localhost:8090/coceso';
}

export interface CocesoApiConfigurationInterface {
  rootUrl?: string;
}

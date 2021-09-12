/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CocesoRestConfiguration, CocesoRestConfigurationParams } from './coceso-rest-configuration';

import { ConcernEndpointService } from './services/concern-endpoint.service';
import { ContainerEndpointService } from './services/container-endpoint.service';
import { IncidentEndpointService } from './services/incident-endpoint.service';
import { TaskEndpointService } from './services/task-endpoint.service';
import { JournalEndpointService } from './services/journal-endpoint.service';
import { MessageEndpointService } from './services/message-endpoint.service';
import { PatientEndpointService } from './services/patient-endpoint.service';
import { UnitEndpointService } from './services/unit-endpoint.service';
import { LoggingEndpointService } from './services/logging-endpoint.service';
import { PointEndpointService } from './services/point-endpoint.service';
import { StaffEndpointService } from './services/staff-endpoint.service';
import { SystemEndpointService } from './services/system-endpoint.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ConcernEndpointService,
    ContainerEndpointService,
    IncidentEndpointService,
    TaskEndpointService,
    JournalEndpointService,
    MessageEndpointService,
    PatientEndpointService,
    UnitEndpointService,
    LoggingEndpointService,
    PointEndpointService,
    StaffEndpointService,
    SystemEndpointService,
    CocesoRestConfiguration
  ],
})
export class CocesoRestModule {
  static forRoot(params: CocesoRestConfigurationParams): ModuleWithProviders<CocesoRestModule> {
    return {
      ngModule: CocesoRestModule,
      providers: [
        {
          provide: CocesoRestConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: CocesoRestModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('CocesoRestModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}

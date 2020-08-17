/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CocesoRestConfiguration, CocesoRestConfigurationInterface } from './coceso-rest-configuration';

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
 * Provider for all CocesoRest services, plus CocesoRestConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    CocesoRestConfiguration,
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
    SystemEndpointService
  ],
})
export class CocesoRestModule {
  static forRoot(customParams: CocesoRestConfigurationInterface): ModuleWithProviders<CocesoRestModule> {
    return {
      ngModule: CocesoRestModule,
      providers: [
        {
          provide: CocesoRestConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}

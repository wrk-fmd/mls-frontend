import {NgModule} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';

import {WatchService} from './services';

/**
 * This module provides and configures the STOMP services
 */
@NgModule({
  providers: [WatchService, RxStompService]
})
export class CommonDataModule {
}

import {Component, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {MessageChannelDto} from 'mls-coceso-api';
import {DialogContent} from 'mls-common-ui';

import {BehaviorSubject, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {CombinedMessage, MessageDataService} from '../../../services';

@Component({
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements DialogContent {

  @Output() windowTitle: Observable<string>;

  readonly channels: Observable<MessageChannelDto[]>;
  readonly messages: Observable<CombinedMessage[]>;
  readonly channel = new BehaviorSubject<MessageChannelDto | null>(null);

  readonly activePanels = new Set<number>();

  constructor(private readonly messageService: MessageDataService, translateService: TranslateService) {
    this.channels = this.messageService.getChannels();
    this.messages = this.channel.pipe(
        switchMap(channel => this.messageService.getCombined(channel ? channel.id : null)),
    );

    this.windowTitle = of(translateService.instant('main.nav.windows.showMessages'));
  }

  set data(_: any) {
  }

  setChannel(channel: MessageChannelDto) {
    this.channel.next(channel);
  }
}

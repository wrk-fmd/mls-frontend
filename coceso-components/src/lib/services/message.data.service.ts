import {Injectable, OnDestroy} from '@angular/core';

import {MessageChannelDto, MessageEndpointService, ReceivedMessageDto} from 'mls-coceso-api';
import {DataService, ListOptions} from 'mls-common-data';

import {BehaviorSubject, combineLatest, interval, Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {UnitWithIncidents} from '../models/unit-with-incidents';

import {CocesoWatchService} from './coceso.watch.service';
import {ConcernDataService} from './concern.data.service';
import {TaskDataService} from './task.data.service';

@Injectable()
export class MessageDataService extends DataService<ReceivedMessageDto> implements OnDestroy {

  private readonly contacts: Observable<Map<string, UnitWithIncidents>>;
  private readonly cleanupSubscription: Subscription;

  constructor(private readonly endpoint: MessageEndpointService, taskService: TaskDataService,
              private readonly concernService: ConcernDataService, watchService: CocesoWatchService) {
    super(watchService.watchMessages());

    this.contacts = taskService.getUnits().pipe(
        map(units => this.buildContactDictionary(units)),
        shareReplay(1)
    );

    this.cleanupSubscription = interval(30000).subscribe(() => this.cleanup());
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.cleanupSubscription.unsubscribe();
  }

  private cleanup() {
    const data = this.getData() as BehaviorSubject<Map<number, ReceivedMessageDto>>;

    const cutoff = Date.now() / 1000 - 5 * 60;
    let changed = false;

    data.value.forEach(message => {
      if (message.timestamp < cutoff) {
        data.value.delete(message.id);
        changed = true;
      }
    });

    if (changed) {
      data.next(data.value);
    }
  }

  public getChannels(): Observable<MessageChannelDto[]> {
    return this.concernService.runWithConcern(c => this.endpoint.getChannels(c));
  }

  public getCombined(channel: string): Observable<CombinedMessage[]> {
    const options = new ListOptions<ReceivedMessageDto>();
    if (channel) {
      options.addFilters(m => !m.channel || m.channel === channel);
    }

    return combineLatest([this.contacts, this.getAll(options)]).pipe(
        map(([contacts, messages]) => this.buildCombined(contacts, messages))
    );
  }

  private buildCombined(contacts: Map<string, UnitWithIncidents>, messages: any[]): CombinedMessage[] {
    const result: CombinedMessage[] = [];
    let last: CombinedMessage = null;

    messages.forEach(message => {
      if (last && last.messages[0].type === message.type && last.messages[0].sender === message.sender) {
        // Matches last message, just add it there
        last.messages.push(message);
      } else {
        const unit = contacts.get(message.type + message.sender);
        if (last && last.unit && unit && last.unit.id === unit.id) {
          // Different contact, but same unit, add it to previous messages
          last.messages.push(message);
        } else {
          last = {unit, messages: [message]};
          result.push(last);
        }
      }
    });

    return result;
  }

  private buildContactDictionary(units: UnitWithIncidents[]): Map<string, UnitWithIncidents> {
    const result = new Map<string, UnitWithIncidents>();
    units.forEach(unit => {
      if (unit.contacts) {
        unit.contacts.forEach(contact => result.set(contact.type + contact.data, unit));
      }
    });
    return result;
  }

  protected defaultSort(): ((a: ReceivedMessageDto, b: ReceivedMessageDto) => number)[] {
    return [
      (a, b) => b.timestamp - a.timestamp,
      ...super.defaultSort()
    ];
  }
}

export interface CombinedMessage {
  unit: UnitWithIncidents;
  messages: ReceivedMessageDto[];
}

import {Component, Input} from '@angular/core';
import {ContactDto} from 'mls-coceso-api';

@Component({
  selector: 'coceso-main-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  private _contact: ContactDto;

  @Input()
  set contact(value: ContactDto) {
    this._contact = value;
    this.setLink(value);
  }

  get contact(): ContactDto {
    return this._contact;
  }

  link: string;

  private setLink(contact: ContactDto) {
    this.link = contact && contact.type === 'phone' && contact.data ? `tel:${contact.data}` : null;
  }
}

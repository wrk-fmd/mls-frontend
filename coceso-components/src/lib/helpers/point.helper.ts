import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Address, PointDto} from 'mls-coceso-api';

@Injectable()
export class PointHelper {

  constructor(private readonly translateService: TranslateService) {
  }

  toString(point?: PointDto | null, separator: string | null = '\n', defaultText = ''): string {
    // TODO This does not yet cover all cases properly (prints "null" and similar things)
    const lines = [];

    if (point) {
      if (point.poi) {
        lines.push(point.poi);
      }
      if (point.address) {
        lines.push(this.buildStreet(point.address));
        lines.push(`${point.address.postCode} ${point.address.city}`.trim());
      }
      if (point.details) {
        lines.push(...point.details.split('\n'));
      }
    }

    if (!lines.length) {
      return defaultText ? this.translateService.instant(defaultText) : '';
    }

    if (!separator) {
      return lines[0].split('\n')[0];
    }

    return lines.join(separator);
  }

  private buildStreet(address: Address): string {
    return address.intersection
        ? `${address.street} # ${address.intersection}`
        : `${address.street} ${address.number || ''}/${address.block || ''}/${address.details || ''}`;
  }

  isEmpty(point?: PointDto | null): boolean {
    if (!point) {
      return true;
    }

    return !point.poi && !point.details && this.isAddressEmpty(point.address);
  }

  equals(a?: PointDto | null, b?: PointDto | null) {
    // TODO
    return false;
  }

  isAddressEmpty(address?: Address | null): boolean {
    if (!address) {
      return true;
    }

    return !address.street && !address.intersection && !address.number && !address.block && !address.details
        && !address.postCode && !address.city;
  }
}

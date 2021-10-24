import {Pipe, PipeTransform} from '@angular/core';
import {PointDto} from 'mls-coceso-api';
import {PointHelper} from '../helpers/point.helper';

@Pipe({
  name: 'cocesoPoint'
})
export class PointPipe implements PipeTransform {

  constructor(private readonly pointHelper: PointHelper) {
  }

  transform(point: PointDto, separator: string | null = '\n', defaultText = ''): string {
    return this.pointHelper.toString(point, separator, defaultText);
  }
}

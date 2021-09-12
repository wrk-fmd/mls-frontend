/* tslint:disable */
/* eslint-disable */
import { PointDto } from './point-dto';
export interface UnitBatchCreateDto {
  call: string;
  from?: number;
  home?: PointDto;
  portable?: boolean;
  to?: number;
}

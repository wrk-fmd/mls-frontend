/* tslint:disable */
/* eslint-disable */
import { Address } from './address';
import { LatLng } from './lat-lng';
export interface PointDto {
  address?: Address;
  coordinates?: LatLng;
  details?: string;
  poi?: string;
}

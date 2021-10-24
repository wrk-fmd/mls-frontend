import {PointDto} from './rest/models';

export interface GeocodingResult {
  data: PointDto;
  source: string;
  priority: number;
}

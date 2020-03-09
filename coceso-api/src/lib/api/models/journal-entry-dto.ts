/* tslint:disable */
import { ChangesDto } from './changes-dto';
export interface JournalEntryDto {
  changes?: ChangesDto;
  id?: number;
  incident?: number;
  patient?: number;
  state?: 'Assigned' | 'ZBO' | 'ABO' | 'ZAO' | 'AAO' | 'Detached';
  text?: string;
  timestamp?: string;
  type?: string;
  unit?: number;
  username?: string;
}

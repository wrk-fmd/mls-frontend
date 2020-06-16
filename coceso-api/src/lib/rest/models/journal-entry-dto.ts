/* tslint:disable */
import { ChangeDto } from './change-dto';
export interface JournalEntryDto {
  changes?: Array<ChangeDto>;
  id?: number;
  incident?: number;
  patient?: number;
  state?: 'Assigned' | 'ZBO' | 'ABO' | 'ZAO' | 'AAO' | 'Detached';
  text?: string;
  timestamp?: number;
  type?: string;
  unit?: number;
  username?: string;
}

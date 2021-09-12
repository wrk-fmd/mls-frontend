/* tslint:disable */
/* eslint-disable */
import { ChangeDto } from './change-dto';
import { TaskStateDto } from './task-state-dto';
export interface JournalEntryDto {
  changes: null | Array<null | ChangeDto>;
  id: number;
  incident: null | number;
  patient: null | number;
  state: TaskStateDto;
  text: null | string;
  timestamp: number;
  type: string;
  unit: null | number;
  username: null | string;
}

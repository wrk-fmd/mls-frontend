/* tslint:disable */
/* eslint-disable */
import { TaskStateDto } from './task-state-dto';
export interface TaskDto {
  alarmSent: null | number;
  casusSent: null | number;
  incident: number;
  state: TaskStateDto;
  unit: number;
  updated: number;
}

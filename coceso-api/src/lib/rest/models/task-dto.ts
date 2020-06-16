/* tslint:disable */
export interface TaskDto {
  alarmSent?: number;
  casusSent?: number;
  incident?: number;
  state?: 'Assigned' | 'ZBO' | 'ABO' | 'ZAO' | 'AAO' | 'Detached';
  unit?: number;
  updated?: number;
}

/* tslint:disable */
export interface TaskDto {
  incident?: number;
  state?: 'Assigned' | 'ZBO' | 'ABO' | 'ZAO' | 'AAO' | 'Detached';
  unit?: number;
  updated?: string;
}

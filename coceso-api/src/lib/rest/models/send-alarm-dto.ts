/* tslint:disable */
export interface SendAlarmDto {
  message?: string;
  recipients?: 'ALL' | 'UNSENT' | 'LIST';
  type?: 'ALARM' | 'CASUS';
  units?: Array<number>;
}

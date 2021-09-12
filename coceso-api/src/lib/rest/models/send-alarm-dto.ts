/* tslint:disable */
/* eslint-disable */
import { AlarmRecipientsDto } from './alarm-recipients-dto';
import { AlarmTypeDto } from './alarm-type-dto';
export interface SendAlarmDto {
  message: string;
  recipients: AlarmRecipientsDto;
  type: AlarmTypeDto;
  units?: Array<number>;
}

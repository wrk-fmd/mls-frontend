/* tslint:disable */
/* eslint-disable */
import { SexDto } from './sex-dto';
export interface PatientUpdateDto {
  birthday?: string;
  diagnosis?: string;
  erType?: string;
  externalId?: string;
  firstname?: string;
  info?: string;
  insurance?: string;
  lastname?: string;
  sex?: SexDto;
}

/* tslint:disable */
/* eslint-disable */
import { SexDto } from './sex-dto';
export interface PatientDto {
  birthday: null | string;
  concern: number;
  diagnosis: string;
  erType: string;
  externalId: string;
  firstname: string;
  id: number;
  info: string;
  insurance: string;
  lastname: string;
  sex: SexDto;
}

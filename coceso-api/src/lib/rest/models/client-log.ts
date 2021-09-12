/* tslint:disable */
/* eslint-disable */
import { ClientLogLevel } from './client-log-level';
export interface ClientLog {
  codeColumn?: number;
  codeLine?: number;
  logLevel?: ClientLogLevel;
  message?: string;
  stack?: string;
  url?: string;
}

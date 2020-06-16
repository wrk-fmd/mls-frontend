/* tslint:disable */
export interface ClientLog {
  codeColumn?: number;
  codeLine?: number;
  logLevel?: 'ERROR' | 'WARNING' | 'INFO' | 'DEBUG';
  message?: string;
  stack?: string;
  url?: string;
}

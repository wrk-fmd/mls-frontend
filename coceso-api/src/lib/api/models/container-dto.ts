/* tslint:disable */
export interface ContainerDto {
  id?: number;
  name?: string;
  ordering?: number;
  parent?: number;
  units?: {[key: string]: number};
}

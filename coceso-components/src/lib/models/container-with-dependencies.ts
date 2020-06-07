import {ContainerDto} from 'mls-coceso-api';
import {UnitWithIncidents} from './unit-with-incidents';

export interface ContainerWithDependencies extends ContainerDto {
  childrenData: ContainerWithDependencies[];
  unitsData: UnitWithIncidents[];
  totalUnits: number;
  availableUnits: number;
}

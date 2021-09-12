import {ContainerDto} from 'mls-coceso-api';
import {UnitWithIncidents} from './unit-with-incidents';

export interface ContainerWithDependencies extends ContainerDto {
  childrenData: ContainerWithDependencies[] | null;
  unitsData: UnitWithIncidents[] | null;
  totalUnits: number;
  availableUnits: number;
}

import { EDEALER } from '../../constants';
import { EdealerVehicle } from './edealer';

export * from './edealer';

export type Vendors = typeof EDEALER;
export type VendorVehicleParsers = EdealerVehicle;

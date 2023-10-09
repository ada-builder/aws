import { NEW, USED } from '../constants/vehicle';

export type VehicleConditions = typeof NEW | typeof USED;

export type Vehicle = {
  bodyStyle?: string;
  condition: VehicleConditions;
  drivetrain?: string;
  exteriorColor?: string;
  feedId: string;
  fuelType?: string;
  id: string;
  images?: string[];
  interiorColor?: string;
  make: string;
  mileage?: number;
  model: string;
  modelCode?: string;
  msrp?: number;
  originalUrl?: string;
  path: string;
  price: number;
  siteId: string;
  stockNumber: string;
  suggestedPrice?: number;
  transmission?: string;
  year: number;
  vin: string;
};

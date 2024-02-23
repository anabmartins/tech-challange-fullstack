export interface Vehicle {
  id: number;
  name: string;
  plate: string;
  model: string;
}

export interface RootState {
  vehicle: VehicleList[];
}

export interface VehicleList {
  id: number;
  name: string;
  plate: string;
  model: string;
  year: number;
}

export const initialState: RootState = {
  vehicle: []
};

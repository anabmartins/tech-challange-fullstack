export interface Vehicle {
  id: number;
  name: string;
  plate: string;
  modelName: string;
}

export interface RootState {
  vehicle: VehicleList[];
}

export interface VehicleList {
  id: number;
  name: string;
  plate: string;
  modelName: string;
  year: number;
}

export const initialState: RootState = {
  vehicle: []
};

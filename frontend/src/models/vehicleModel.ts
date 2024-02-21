export interface Vehicle {
  id: number;
  name: string;
  plate: string;
  model: string;
}

export interface RootState {
  vehicles: VehicleList[]
}

export interface VehicleList {
  name: string;
  plate: string;
  model: string;
  year: number;
}

export const initialState: RootState = {
  vehicles: []
};

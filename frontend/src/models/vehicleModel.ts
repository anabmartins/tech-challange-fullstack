export interface Vehicle {
  name: string;
  plate: string;
  model: string;
  creationDate: Date;
  lastUpdateDate: Date;
}

interface VehicleState {
  loading: boolean;
  vehicle: null | any;
  error: null | string;
}

export const initialState: VehicleState = {
  loading: false,
  vehicle: null,
  error: null,
};

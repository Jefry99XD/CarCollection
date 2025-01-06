import { Car } from "./car.model";

export interface User {
    id: string,
    username: string;
    photo: string;
    friendsCount: number;
    CarCollectionCount: number;
    email?: string;
    CarCollection?: Car;
  }
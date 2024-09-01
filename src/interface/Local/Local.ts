import { Reservation } from "../Reserve/Reservation";

export interface Local {
    name: string;
    capacity: number;
    createdAt: string;
    reserves: Reservation[];
}

import { ActionTypes } from "./constants";
import { Point } from "geojson"

export type Longitude = number
export type Latitude = number

export interface Datum {
   value: number;
   date: Date;
}

export interface SensorMetadata {
   id: number;
   name: string;
   tags: string[];
   location: Point;
}

export interface SensorAction { 
   type: ActionTypes;
   payload: SensorMetadata
}
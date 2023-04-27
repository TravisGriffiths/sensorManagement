import { Latitude , Longitude } from "./types"

export const isString = (s: unknown): s is string =>
  (typeof s === 'string')

export const isNumber = (n: unknown): n is number => 
  (typeof n === 'number' && !isNaN(n))

export const isLongitude = (n: unknown): n is Longitude =>
   (isNumber(n) && n >= -180.0 && n <= 180.0)

export const isLatitude = (n: unknown): n is Latitude => 
   (isNumber(n) && n >= -90.0 && n <= 90.0)
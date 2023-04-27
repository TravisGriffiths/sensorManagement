// Modify to mock out more or less pregen sensors
export const NUMBER_OF_PREGEN_SENSORS = 100


// Modify to change the random tag list, 
// tags near the beginning will show up more often
export const mockTags = [
   'wattage',
   'amprage',
   'voltage',
   'thermal-equipment',
   'thermal-ambient',
   'wind-speed',
   'photometer', 
   'deprecated',
]

// Coords will be rounded to the number of digits as zeros here
// 10000 is accurate to ~5-10m depending on exact location
export const COORD_ROUND = 10000

export enum ActionTypes {
   ADD = 'add',
   EDIT = 'edit',
   DELETE = 'delete'
}
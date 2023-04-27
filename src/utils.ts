import { Config, names, uniqueNamesGenerator } from "unique-names-generator"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import * as gjUtils from "geojson-utils"
import { Sensor, SensorMetadata } from "./types"
import { COORD_ROUND , mockTags } from "./constants"
import { scaleLinear, scaleSqrt } from "d3-scale"
import { max } from "d3-array"


const config: Config = {
   dictionaries: [names]
 }

const uniqName = () => uniqueNamesGenerator(config) 

const tagsScale = scaleSqrt()
   .domain([0, 1])
   .range([(mockTags.length - 1), 0])

const makeTags = () => {
   const numberOfTags = Math.ceil(Math.random() * 3)
   const tagSet = new Set<string>()
   for(let i = 0; i < numberOfTags; i++) {
      tagSet.add(mockTags[Math.floor(tagsScale(Math.random()))])
   }
   return Array.from(tagSet)
}

// between Memphis and Salt Lake E-W
const linearLongitudeScale = scaleLinear()
   .domain([0, 1])
   .range([-90, -112])

// between San Antonio and Minniapolis S-N
const linearLatitudeScale = scaleLinear()
   .domain([0, 1])
   .range([30, 45])

// Important, GeoJSON in lng, lat order
const mockPosition = () => ([
   (Math.round(linearLongitudeScale(Math.random()) * COORD_ROUND) / COORD_ROUND),
   (Math.round(linearLatitudeScale(Math.random()) * COORD_ROUND) / COORD_ROUND)
])

const createMockSensor = (index: number): Sensor => {
   return ({
      id: index,
      name: uniqName(),
      tags: makeTags(),
      location: {
         type: 'Point',
         coordinates: mockPosition(),
      }
   })
}

export const createSensorList = (count?: number) => {
   const listSize = count ?? 10
   const sensorList: Sensor[] = []
   for (let i = 0; i < listSize; i++) {
      sensorList.push(createMockSensor(i + 1))
   }
   return sensorList
}


export const getNextID = (list: SensorMetadata[]) => {
   const last = max(list.map((sensor) => sensor.id))
   return last ? last + 1 : 1
}
   
export const findByLocation = (list: SensorMetadata[], lat: number | null, lng: number | null) => {
   if (lat === null && lng === null) return list
   const latFiltered = (lat !== null) ? 
      list.filter((sensor) => (
         Math.abs(sensor.location.coordinates[1] - lat) < 0.1)
      ) : 
      list 
   return (lng !== null) ?
      latFiltered.filter((sensor) => (
         Math.abs(sensor.location.coordinates[0] - lng) < 0.1)
      ) :
      latFiltered 
}
import { findByLocation } from "./utils";
import Sensor from "./Sensor";
import SensorUpdate from "./SensorUpdate";
import { SensorAction, SensorMetadata } from "./types";
import React, { ChangeEvent, useState } from "react";
import { getNextID } from "./utils";
import { isLatitude, isLongitude } from "./guards";

interface SensorSearchProps {
   sensorList: SensorMetadata[];
   dispatch: React.Dispatch<SensorAction>
}

const SensorSearch: React.FC<SensorSearchProps> = ({ sensorList, dispatch }) => {
   const [results, setResults] = useState<SensorMetadata[]>([])
   const [isAdding, setIsAdding] = useState<boolean>(false)
   const [editingSensor, setEditingSensor] = useState<SensorMetadata | null>(null)
   const [latitude, setLatitude] = useState<number | null>(null)
   const [longitude, setLongititude] = useState<number | null>(null)
   const [badLat, setBadLat] = useState<boolean>(false)
   const [badLng, setBadLng] = useState<boolean>(false)
 
   const resetToSearch = () => {
      setIsAdding(false)
      setEditingSensor(null)
      setResults([])
   }


   const updateLatitude = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.value !== '' && isLatitude(Number(e.target.value))) {
         setLatitude(Number(e.target.value))
         setBadLat(false)
      } else {
         setBadLat(true)
      }
   }

   const updateLongitude = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.value !== '' && isLongitude(Number(e.target.value))) {
         setLongititude(Number(e.target.value))
         setBadLng(false)
      } else {
         setBadLng(true)
      }
   }

   const nameSearch = (e: ChangeEvent<HTMLInputElement>) => 
      setResults(
         sensorList.filter(
            (sensor) => 
               sensor.name.toLowerCase().match(e.target.value.toLowerCase()) !== null
         )
      )

   const tagSearch = (e: ChangeEvent<HTMLInputElement>) => 
      setResults(
         sensorList.filter(
            (sensor) => sensor.tags.filter(
               (tag) => tag.match(e.target.value) 
            ).length > 0
         )
      )

   const hasValidLocationSearch = () => 
      [
         !badLat,
         !badLng,
         (latitude !== null || longitude !== null)
       ].every(Boolean)


   const searchByLocation = () => {
      setResults(findByLocation(sensorList, latitude, longitude))
   }

   return (
      <>
         { !(isAdding || editingSensor) &&
            (<>
               <h3>Find a sensor</h3>
               <div className="searchMethods">
                  <div>
                     Name: <input 
                              className="singleLineInput" 
                              onChange={nameSearch} 
                              type="text" 
                              placeholder="Search by Name"/>
                  </div>
                  <div>
                     Tag: <input 
                              className="singleLineInput" 
                              onChange={tagSearch} 
                              type="text" 
                              placeholder="Search by Tag" />
                  </div> 
                  <div>
                     Location:
                     <div className="locationBlock">
                        <input onChange={updateLatitude} type="text" placeholder="Latitude" />
                        { badLat === true && (
                           <div className="invalidNotice">Must be between -90 and 90</div>
                        )}
                        <input onChange={updateLongitude} type="text" placeholder="Longitude" />
                        { badLng === true && (
                           <div className="invalidNotice">Must be between -180 and 180</div>
                        )}
                     </div>
                     { 
                        hasValidLocationSearch() && 
                        <button onClick={searchByLocation}>Find</button> 
                     }
                  </div>
               </div>
               <button onClick={() => setIsAdding(true)} >Add a Sensor</button>
               {
                  results.length > 0 && 
                     (<div>
                        <table className='sensorTable'>
                           <thead>
                              <tr>
                                 <th>Name</th>
                                 <th>Tags</th>
                                 <th>Location</th>
                                 <th>Actions</th>
                              </tr>
                           </thead>
                           <tbody>
                              { 
                                 results.map(
                                    (sensor) => 
                                       <Sensor 
                                          key={sensor.id} 
                                          sensorRecord={sensor} 
                                          deleteRecord={dispatch}
                                          setEdit={setEditingSensor} />
                                 )
                              }
                           </tbody>
                        </table>
                     </div>
                  ) 
               }
            </>)
         }
         {
            (isAdding || editingSensor) && (
               <SensorUpdate 
                  sensorID={editingSensor ? editingSensor.id : getNextID(sensorList)}
                  editing={editingSensor}
                  dispatch={dispatch}
                  reset={resetToSearch} />
            )
         }
      </>
   )
}

export default SensorSearch
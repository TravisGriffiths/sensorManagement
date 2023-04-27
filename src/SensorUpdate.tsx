import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import { isLatitude, isLongitude } from "./guards";

import { ActionTypes } from "./constants";
import { SensorAction } from "./types";
import { SensorMetadata } from "./types";

interface SensorUpdateProps {
   sensorID: number;
   dispatch: React.Dispatch<SensorAction>;
   editing: SensorMetadata | null;
   reset: VoidFunction;
}

const SensorUpdate: React.FC<SensorUpdateProps> = ({ sensorID, dispatch, editing, reset }) => {
   const [name, setName] = useState<string | null>(editing ? editing.name : null)
   const [tags, setTags] = useState<string[]>(editing ? editing.tags : [])
   const [latitude, setLatitude] = useState<number | null>(editing ? editing.location.coordinates[1] : null)
   const [longitude, setLongititude] = useState<number | null>(editing ? editing.location.coordinates[0] : null)
   const [badLat, setBadLat] = useState<boolean>(false)
   const [badLng, setBadLng] = useState<boolean>(false)
   const newTagRef = useRef<HTMLInputElement>(null)
   const canUpdate = useMemo(() => [
      name,
      latitude,
      longitude
   ].every(Boolean), [
      name,
      latitude,
      longitude
   ])

   const updateName = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.value !== '') {
         setName(e.target.value)
      }
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

   const deleteTag = (delTag: string) => 
      setTags([...tags.filter((tag) => tag !== delTag)])

   const addTag = () => {
      const newTag = newTagRef?.current?.value
      if (newTag !== undefined && newTag !== '') {
         const uniqueTags = new Set([...tags, newTag])
         setTags(Array.from(uniqueTags))
         if(newTagRef.current?.value) newTagRef.current.value = ''
      }
   }
      
   const saveSensor = () => {
      const updated: SensorMetadata = {
         id: sensorID,
         name: name ? name : '', 
         tags, 
         location: {
            type: 'Point',
            coordinates: [(longitude ? longitude : 0), (latitude ? latitude : 0)],
         }
      }   
      dispatch({
         type: editing ? ActionTypes.EDIT : ActionTypes.ADD,
         payload: updated
      })
      reset()
   }

   return (
      <>
         <div>
            Name: 
            <input 
               className="singleLineInput"
               onChange={updateName}
               type="text" 
               placeholder={editing ? editing.name : 'Enter Name'} />
            { name === null  && (
               <div className="invalidNotice">Must have a name</div>
            )}
         </div>
         <hr />
         <div>
            Tags:
            <ul className="tagList">
               { 
                  tags.map(
                     (tag, idx) => 
                        <li key={idx}>{tag} 
                           <div 
                              className="deleteAction"
                              onClick={() => deleteTag(tag)}>
                                 Delete
                           </div>
                        </li>
                  ) 
               }
            </ul>
            <div>
               <input 
                  className="singleLineInput" 
                  ref={newTagRef} 
                  type="text" 
                  placeholder="Add a new tag"/>
               <button onClick={addTag}>Add Tag</button>
            </div>
         </div>
         <hr />
         <div>
            Location:
            <div className="locationBlock">
               <input 
                  onChange={updateLatitude}
                  type="text" 
                  placeholder={editing ? String(editing.location.coordinates[1]) : "Latitude"} />
               { badLat && (
                  <div className="invalidNotice">Must be between -90 and 90</div>
               )}
               <input 
                  onChange={updateLongitude}
                  type="text" 
                  placeholder={ editing ? String(editing.location.coordinates[0]) : "Longitude" } />
               { badLng && (
                  <div className="invalidNotice">Must be between -180 and 180</div>
               )}
            </div>
         </div>
         <hr />
         { canUpdate && (
            <button onClick={saveSensor}>Save</button>

         )}
      </>
   )
}

export default SensorUpdate
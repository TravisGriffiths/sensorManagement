import { ActionTypes } from "./constants";
import React from "react"
import { SensorAction, SensorMetadata } from "./types"

interface SensorProps {
   sensorRecord: SensorMetadata;
   deleteRecord: React.Dispatch<SensorAction>;
   setEdit: React.Dispatch<React.SetStateAction<SensorMetadata | null>>;
}

const Sensor: React.FC<SensorProps> = ({ sensorRecord, deleteRecord, setEdit }) => (
   <tr>
         <td className="sensorNameCell">{ sensorRecord.name }</td>
         <td>{ sensorRecord.tags.map((tag) => tag).join(', ') }</td>
         <td className="coordCell">
            <span>
               Lat: {sensorRecord.location.coordinates[1].toFixed(2) }
            </span>
            <span>
               Lng: {sensorRecord.location.coordinates[0].toFixed(2) }
            </span>
         </td>
         <td className="sensorActionCell">
            <div onClick={() => setEdit(sensorRecord)}>Edit</div>
            <div onClick={() => deleteRecord({
               type: ActionTypes.DELETE,
               payload: sensorRecord,
            })}>Delete</div>
         </td>
   </tr>
)

export default Sensor
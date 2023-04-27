import { ActionTypes ,  NUMBER_OF_PREGEN_SENSORS } from './constants'
import React, { useReducer } from 'react'
import { createSensorList } from './utils'


import './App.css'
import { SensorAction, SensorMetadata } from './types'
import SensorSearch from './SensorSearch'

const addSensor = (list: SensorMetadata[], newSensor: SensorMetadata) => 
  [...list, newSensor]

const editSensor = (list: SensorMetadata[], editedSensor: SensorMetadata) => {
  const uneditedSensors = list.filter((sensor) => sensor.id !== editedSensor.id)
  return ( 
    uneditedSensors !== undefined ?
      [...uneditedSensors, editedSensor] :
      [editedSensor]
  ) 
}

const deleteSensor = (list: SensorMetadata[], deletedSensor: SensorMetadata) => {
  const remainingSensors = list.filter((sensor) => sensor.id !== deletedSensor.id)
  return [...remainingSensors]
}

const reducerActions = {
  [ActionTypes.ADD]: addSensor, 
  [ActionTypes.EDIT]: editSensor, 
  [ActionTypes.DELETE]: deleteSensor
}

const reducer = (state: SensorMetadata[], action: SensorAction) => 
  reducerActions[action.type](state, action.payload)

const App: React.FC = () => {
  
  const [sensorList, dispatch] = useReducer(reducer, createSensorList(NUMBER_OF_PREGEN_SENSORS)) 

  return (
    <div className="mainLayout">
      <SensorSearch sensorList={sensorList} dispatch={dispatch} />
    </div>
  )
}

export default App

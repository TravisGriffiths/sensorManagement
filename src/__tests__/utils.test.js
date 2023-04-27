import { createSensorList } from "../utils"
import { describe, expect, it } from "jest"


describe("Can successfully mock a sensor list", () => {
   it("returns the correct number of sensors", () => {
      const sensorCount = 3
      const mockedSensors = createSensorList(sensorCount)
      expect(mockedSensors.length).toEqual(sensorCount)
   })
})
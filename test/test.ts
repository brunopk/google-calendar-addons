import assert from "assert"
import { isEqualByYearMonthDay } from "../Utils"
import { generateOfficeDayArray, generateBusinessDayArray } from "../WorkPlanification"

describe("WorkPlanification", function () {
  it("Test generateOfficeDayArray excluding some days", function () {
    const excludedDays = [new Date("2023-01-04")]
    const businessDayArray = generateBusinessDayArray(0, excludedDays)
    const officeDayArray = generateOfficeDayArray(businessDayArray, 60)

    officeDayArray.dayDistribution.forEach((_isOfficeDay, currentOfficeDayIndex) => {
      assert.ok(
        !isEqualByYearMonthDay(businessDayArray.businessDays[currentOfficeDayIndex], excludedDays[0]),
        `Day ${excludedDays[0]} should not be included as office day`
      )
    })
  })
})

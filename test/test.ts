import assert from "assert"
import { isEqualByYearMonthDay } from "../Utils"
import { selectDays } from "../WorkPlanning"

describe("WorkPlanning", function () {
  it("Test selectDays excluding some days", function () {
    const monthNumber = 4
    const minimumDayPercentage = 60
    const excludedDays = [new Date("2023-01-04")]
    const selectedDays = selectDays(monthNumber, excludedDays, minimumDayPercentage)

    selectedDays.forEach((day) => {
      assert.ok(
        !isEqualByYearMonthDay(day, excludedDays[0]),
        `Day ${excludedDays[0]} should not be included as office day`
      )
    })
  })
})

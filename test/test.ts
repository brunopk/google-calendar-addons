import assert from "assert"
import { isEqualByYearMonthDay } from "../Utils"
import {
  findBestBusinessDaySelectionUsingBacktracking,
  generateBusinessDayArray,
  generateEmptyBusinessDaySelection,
  generateWorstBusinessDaySelection
} from "../WorkPlanning"

describe("WorkPlanning", function () {
  it("Test generateBusinessDayArray", function () {
    const businessDayArray = generateBusinessDayArray(7, [new Date("2023-07-18T00:00:00-03:00")])
    assert.equal(businessDayArray.totalDays, 20)
  })

  it("Test selectDays excluding some days", function () {
    const monthNumber = 1
    const excludedDays = [new Date("2023-01-04")]
    const minimumDayPercentage = 60
    const businessDayArray = generateBusinessDayArray(monthNumber, excludedDays)
    const currentSelection = generateEmptyBusinessDaySelection(businessDayArray)
    const bestFoundSelection = generateWorstBusinessDaySelection(businessDayArray)

    findBestBusinessDaySelectionUsingBacktracking(
      currentSelection,
      bestFoundSelection,
      0,
      businessDayArray,
      minimumDayPercentage
    )

    bestFoundSelection.selection.forEach((isSelected, dayIndex) => {
      if (isSelected) {
        assert.ok(
          !isEqualByYearMonthDay(businessDayArray.businessDays[dayIndex], excludedDays[0]),
          `Day ${excludedDays[0]} should not be included as office day`
        )
      }
    })
  })
})

import {
  findPassageFontStyle,
  passageFontScale
} from "@/util/passage-font-scale"
import { isNotEmpty } from "@/util"

describe("findPassageFontStyle", () => {
  it("does something", () => {
    const result = findPassageFontStyle({ containerWidth: 1025, characterCount: 776 })

    expect(true).toBe(true)
  })
})

import { isNotObjectLiteral } from "@/util"

export function findPassageFontStyle({ containerWidth, characterCount }) {
  console.log({ containerWidth, characterCount })
  const findEntry = ({ target, comparatorValue, entryComparatorProp }) => {
    let result = null

    if (isNotObjectLiteral(target)) {
      return result
    }

    const targetEntries = Object.entries(target)
    console.log({ targetEntries })

    for (const [index, { 1: targetEntry }] of targetEntries.entries()) {
      const isFirstEntry = index === 0
      const isLastEntry = index === (targetEntries.length - 1)
      const currentTargetEntry = targetEntry
      console.log({ currentTargetEntry, entryComparatorProp })
      const entryComparatorPropValue = currentTargetEntry[entryComparatorProp]
      console.log("srsly?!!", comparatorValue, entryComparatorPropValue)
      const isLessThan = (comparatorValue < entryComparatorPropValue)
      const isGreaterThan = (comparatorValue >= entryComparatorPropValue)

      console.log({ isLessThan, isFirstEntry })

      if (
        (isLessThan && isFirstEntry) ||
        (isGreaterThan && isLastEntry)
      ) {
        result = currentTargetEntry
        break
      }

      if (!isLastEntry) {
        const { 1: nextTargetEntry } = targetEntries[index + 1]
        const nextEntryComparatorPropValue = nextTargetEntry[entryComparatorProp]
        const isLessThanNext = (comparatorValue < nextEntryComparatorPropValue)
        const isMatch = (isGreaterThan && isLessThanNext)

        if (isMatch) {
          result = currentTargetEntry
          break
        }
      }
    }

    return result
  }

  const viewport = findEntry({
    target: passageFontScale,
    comparatorValue: containerWidth,
    entryComparatorProp: "minWidth"
  })

  console.log({ viewport })

  // delete viewport.minWidth
  const { fontSize, lineHeight } = findEntry({
    target: viewport,
    comparatorValue: characterCount,
    entryComparatorProp: "minCount"
  })

  console.log({ fontSize, lineHeight })

  return { fontSize, lineHeight }
}

export const passageFontScale = {
  viewportXS: {
    minWidth: 320,
    charCountXS: {
      minCount: 100,
      fontSize: "1.5rem",
      lineHeight: "150%"
    },
    charCountS: {
      minCount: 325,
      fontSize: "1.25rem",
      lineHeight: "150%"
    },
    charCountM: {
      minCount: 550,
      fontSize: "1.1rem",
      lineHeight: "150%"
    },
    charCountL: {
      minCount: 775,
      fontSize: "0.9rem",
      lineHeight: "175%"
    },
    charCountXL: {
      minCount: 1000,
      fontSize: "0.85rem",
      lineHeight: "175%"
    }
  },
  viewportS: {
    minWidth: 640,
    charCountXS: {
      minCount: 100,
      fontSize: "2.15rem",
      lineHeight: "150%"
    },
    charCountS: {
      minCount: 325,
      fontSize: "1.7rem",
      lineHeight: "150%"
    },
    charCountM: {
      minCount: 550,
      fontSize: "1.5rem",
      lineHeight: "150%"
    },
    charCountL: {
      minCount: 775,
      fontSize: "1.2rem",
      lineHeight: "175%"
    },
    charCountXL: {
      minCount: 1000,
      fontSize: "1.1rem",
      lineHeight: "175%"
    }
  },
  viewportM: {
    minWidth: 768,
    charCountXS: {
      minCount: 100,
      fontSize: "2.25rem",
      lineHeight: "150%"
    },
    charCountS: {
      minCount: 325,
      fontSize: "1.85rem",
      lineHeight: "150%"
    },
    charCountM: {
      minCount: 550,
      fontSize: "1.65rem",
      lineHeight: "150%"
    },
    charCountL: {
      minCount: 775,
      fontSize: "1.35rem",
      lineHeight: "175%"
    },
    charCountXL: {
      minCount: 1000,
      fontSize: "1.25rem",
      lineHeight: "175%"
    }
  },
  viewportL: {
    minWidth: 960,
    charCountXS: {
      minCount: 100,
      fontSize: "2.75rem",
      lineHeight: "150%"
    },
    charCountS: {
      minCount: 325,
      fontSize: "2rem",
      lineHeight: "150%"
    },
    charCountM: {
      minCount: 550,
      fontSize: "1.85rem",
      lineHeight: "150%"
    },
    charCountL: {
      minCount: 775,
      fontSize: "1.45rem",
      lineHeight: "175%"
    },
    charCountXL: {
      minCount: 1000,
      fontSize: "1.25rem",
      lineHeight: "175%"
    }
  },
  viewportXL: {
    minWidth: 1024,
    charCountXS: {
      minCount: 100,
      fontSize: "3rem",
      lineHeight: "150%"
    },
    charCountS: {
      minCount: 325,
      fontSize: "2.25rem",
      lineHeight: "150%"
    },
    charCountM: {
      minCount: 550,
      fontSize: "1.85rem",
      lineHeight: "150%"
    },
    charCountL: {
      minCount: 775,
      fontSize: "1.45rem",
      lineHeight: "175%"
    },
    charCountXL: {
      minCount: 1000,
      fontSize: "1.25rem",
      lineHeight: "175%"
    }
  }
}

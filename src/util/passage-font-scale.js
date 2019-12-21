export function findPassageFontStyle({ containerWidth, characterCount }) {
  const findItem = ({ collection, comparatorValue, comparatorProp }) => {
    let result = null

    for (const [index, item] of collection.entries()) {
      const isFirstItem = index === 0
      const isLastItem = index === (collection.length - 1)
      const currentItem = item
      const itemComparatorPropValue = item[comparatorProp]
      const isLessThan = (comparatorValue < itemComparatorPropValue)
      const isGreaterThan = (comparatorValue >= itemComparatorPropValue)

      if (
        (isLessThan && isFirstItem) ||
        (isGreaterThan && isLastItem)
      ) {
        result = currentItem
        break
      }

      if (!isLastItem) {
        const nextItem = collection[index + 1]
        const nextItemComparatorPropValue = nextItem[comparatorProp]
        const isLessThanNext = (comparatorValue < nextItemComparatorPropValue)
        const isMatch = (isGreaterThan && isLessThanNext)

        if (isMatch) {
          result = currentItem
          break
        }
      }
    }

    return result
  }

  const { charCountFontStyleMaps } = findItem({
    collection: passageFontScale,
    comparatorValue: containerWidth,
    comparatorProp: "minWidth"
  })

  const { fontSize, lineHeight } = findItem({
    collection: charCountFontStyleMaps,
    comparatorValue: characterCount,
    comparatorProp: "minCount"
  })

  return { fontSize, lineHeight }
}

const passageFontScale = [
  {
    minWidth: 320,
    charCountFontStyleMaps: [
      {
        minCount: 100,
        fontSize: "1.5rem",
        lineHeight: "150%"
      },
      {
        minCount: 325,
        fontSize: "1.25rem",
        lineHeight: "150%"
      },
      {
        minCount: 550,
        fontSize: "1.1rem",
        lineHeight: "150%"
      },
      {
        minCount: 775,
        fontSize: "0.9rem",
        lineHeight: "175%"
      },
      {
        minCount: 1000,
        fontSize: "0.85rem",
        lineHeight: "175%"
      }
    ]
  },
  {
    minWidth: 640,
    charCountFontStyleMaps: [
      {
        minCount: 100,
        fontSize: "2.15rem",
        lineHeight: "150%"
      },
      {
        minCount: 325,
        fontSize: "1.7rem",
        lineHeight: "150%"
      },
      {
        minCount: 550,
        fontSize: "1.5rem",
        lineHeight: "150%"
      },
      {
        minCount: 775,
        fontSize: "1.2rem",
        lineHeight: "175%"
      },
      {
        minCount: 1000,
        fontSize: "1.1rem",
        lineHeight: "175%"
      }
    ]
  },
  {
    minWidth: 768,
    charCountFontStyleMaps: [
      {
        minCount: 100,
        fontSize: "2.25rem",
        lineHeight: "150%"
      },
      {
        minCount: 325,
        fontSize: "1.85rem",
        lineHeight: "150%"
      },
      {
        minCount: 550,
        fontSize: "1.65rem",
        lineHeight: "150%"
      },
      {
        minCount: 775,
        fontSize: "1.35rem",
        lineHeight: "175%"
      },
      {
        minCount: 1000,
        fontSize: "1.25rem",
        lineHeight: "175%"
      }
    ]
  },
  {
    minWidth: 960,
    charCountFontStyleMaps: [
      {
        minCount: 100,
        fontSize: "2.75rem",
        lineHeight: "150%"
      },
      {
        minCount: 325,
        fontSize: "2rem",
        lineHeight: "150%"
      },
      {
        minCount: 550,
        fontSize: "1.85rem",
        lineHeight: "150%"
      },
      {
        minCount: 775,
        fontSize: "1.45rem",
        lineHeight: "175%"
      },
      {
        minCount: 1000,
        fontSize: "1.25rem",
        lineHeight: "175%"
      }
    ]
  },
  {
    minWidth: 1024,
    charCountFontStyleMaps: [
      {
        minCount: 100,
        fontSize: "3rem",
        lineHeight: "150%"
      },
      {
        minCount: 325,
        fontSize: "2.25rem",
        lineHeight: "150%"
      },
      {
        minCount: 550,
        fontSize: "1.85rem",
        lineHeight: "150%"
      },
      {
        minCount: 775,
        fontSize: "1.45rem",
        lineHeight: "175%"
      },
      {
        minCount: 1000,
        fontSize: "1.25rem",
        lineHeight: "175%"
      }
    ]
  }
]

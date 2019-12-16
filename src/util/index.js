export const isEmpty = target => {
  if (Array.isArray(target)) {
    return target.length === 0
  }

  return typeof target === "undefined" ||
    target === null ||
    (typeof target === "string" && target.trim() === "")
}

export const isNotEmpty = target => (!isEmpty(target))

export const isObjectLiteral = target => (Object.getPrototypeOf(target) === Object.prototype)

export const isNotObjectLiteral = target => !isObjectLiteral(target)

export const colorsValidator = (propValue, key, componentName, location, propFullName) => {
  const color = propValue[0]
  const duration = propValue[1]

  if (!color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
    return new Error(
      `Invalid prop '${propFullName}[0]' supplied to '${componentName}'.Expect a color with HEX color code.`
    )
  }

  if (!(duration === undefined || (duration >= 0 && duration <= 1))) {
    return new Error(
      `Invalid prop '${propFullName}[1]' supplied to '${componentName}'. Expect a number of color transition duration with value between 0 and 1.`
    )
  }
}

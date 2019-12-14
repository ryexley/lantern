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

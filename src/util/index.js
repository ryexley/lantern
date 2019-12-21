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

export function debounce(fn, wait, immediate) {
  let timeout = null

  return function() {
    const context = this
    const args = arguments

    const later = () => {
      timeout = null
      if (!immediate) {
        fn.apply(context, args)
      }
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) {
      fn.apply(context, args)
    }
  }
}

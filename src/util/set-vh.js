const cssVar = (name, value) => {
  if (name.substr(0, 2) !== "--") {
    name = `--${name}`
  }

  if (value) {
    document.documentElement.style.setProperty(name, value)
  }

  return getComputedStyle(document.documentElement).getPropertyValue(name)
}

export function setVh() {
  if (window && document) {
    let height = window.innerHeight

    if (window.visualViewport) {
      height = window.visualViewport.height
    }

    const vh = (height * 0.01)

    cssVar("vh", `${vh}px`)
  }
}

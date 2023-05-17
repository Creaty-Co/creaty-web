export function getOrientation(): string | null {
  if (typeof window === "undefined") return null

  const { 
    orientation: orientationDeprecated,
    screen: { orientation }
  } = window

  if (orientation) return orientation.type

  switch (orientationDeprecated) {
    case 0: return "portrait-primary"
    case 90: return "landscape-secondary"
    case -90: return "landscape-primary"
    case 180: return "portrait-primary"
    default: return ""
  }

  return null
}

const browsers = {
  "chrome": / chrome | chromium | crios /i,
  "opera": /(?:opera mini)|opera/i,
  "firefox": /firefox/i,
  "android": /android/i,
  "iphone": /iphone/i,
  "safari": /safari/i,
  "explorer": /msie/i,
  "edge": /edge/i
}
type browsersKeyType = keyof typeof browsers;

export function getBrowser(): string | null {
  if (typeof window === "undefined") return null

  const { navigator: { userAgent } } = window
  const key = Object.keys(browsers).find((name): RegExpMatchArray | null => userAgent.match(browsers[name as browsersKeyType]))

  return key || null
}

const os = {
  mac: /macintosh|mac os x/i,
  windows: /windows|win32/i,
  ios: /iphone|ipad|ipod/i,
  android: /android/i,
  linux: /linux/i
}
type osKeyType = keyof typeof os;

export function getOS(): string | null {
  if (typeof window === "undefined") return null
  
  const { navigator: { userAgent } } = window
  const key = Object.keys(os).find((name): RegExpMatchArray | null => userAgent.match(os[name as osKeyType]))
  
  return key || null
}

export function getTouch(): boolean | null {
  if (typeof window === "undefined") return null

  return "ontouchstart" in window
}
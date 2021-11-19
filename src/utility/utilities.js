// given array, split into array of chunks of size n
// "balanced" (subarrays' lengths differ as less as possible) or
// "even" (all subarrays but the last have the same length):
// https://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
export const chunkify = (a, n, balanced) => {
  const numChunks = n
  if (n < 2) return [a]
  var len = a.length,
    out = [],
    i = 0,
    size
  if (len % n === 0) {
    size = Math.floor(len / n)
    while (i < len) {
      out.push(a.slice(i, (i += size)))
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--)
      out.push(a.slice(i, (i += size)))
    }
  } else {
    n--
    size = Math.floor(len / n)
    if (len % size === 0) size--
    while (i < size * n) {
      out.push(a.slice(i, (i += size)))
    }
    out.push(a.slice(size * n))
  }

  // push empty arrays if not enough elements to fulfill chunks
  while (out.length < numChunks) {
    out.push([])
  }

  return out
}

// given hex color code, convert to RGBA with given alpha value
export const hexToRgba = (hex, a = 1) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}, ${a})`
    : `rgba(0, 0, 0, ${a})`
}

// given youtube video URL, convert to thumnail URL
export const getYoutubeThumbnail = link => {
  if (link.includes('youtube')) {
    const youtubeID = new URL(link).searchParams.get('v')
    return `https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`
  }
  if (link.includes('youtu.be')) {
    const youtubeID = new URL(link).pathname
    return `https://img.youtube.com/vi${youtubeID}/maxresdefault.jpg`
  }
  return 'https://img.youtube.com/vi/aaa/maxresdefault.jpg'
}

export const formatProject = project => {
  return {
    ...project,
    imgUrl: getYoutubeThumbnail(project.youtubeUrl),
    href: project.devpostUrl,
  }
}

// find object from array of objects by value of property
export const findElement = (arr, key, val) => arr.find(o => o[key] === val)

// creates a label-value pair (for schools and majors)
const createObj = val => ({ label: val, value: val })

export const creatableDropdownValue = (arr, key, val) => {
  const obj = findElement(arr, key, val) ?? {}
  if (Object.keys(obj).length > 0) {
    return createObj(obj.label)
  } else {
    return createObj(val)
  }
}

const isNullOrUndefined = obj => obj === null || obj === undefined

export function verifyObjectExists(obj, templateObj, key) {
  if (
    !key ||
    key === '_id' ||
    typeof obj === 'string' ||
    typeof templateObj === 'string' ||
    isNullOrUndefined(templateObj) ||
    isNullOrUndefined(templateObj)
  )
    return
  if (obj[key] === undefined) {
    obj[key] = templateObj[key]
  }
  Object.keys(templateObj[key]).forEach(k => {
    verifyObjectExists(obj[key], templateObj[key], k)
  })
}

export const fillMissingProperties = (obj, templateObj) => {
  Object.keys(templateObj).forEach(k => {
    verifyObjectExists(obj, templateObj, k)
  })
}

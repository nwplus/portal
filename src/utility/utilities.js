import { getHackerAppQuestions } from './firebase'
import { useCallback, useState } from 'react'

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

// given youtube video URL, convert to thumbnail URL
export const getYoutubeThumbnail = link => {
  try {
    if (link.includes('youtube')) {
      const youtubeID = new URL(link).searchParams.get('v')
      return `https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`
    }
    if (link.includes('youtu.be')) {
      const youtubeID = new URL(link).pathname.replace('/', '')
      return `https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`
    }
  } catch (err) {
    return 'https://img.youtube.com/vi/aaa/maxresdefault.jpg'
  }
  return 'https://img.youtube.com/vi/aaa/maxresdefault.jpg'
}

export const formatProject = project => {
  return {
    ...project,
    imgUrl: getYoutubeThumbnail(project?.links?.youtube || ''),
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

export function ensureHttps(url) {
  if (url === '') {
    return url
  }
  if (!url.startsWith('https://')) {
    return 'https://' + url
  }
  return url
}

export function verifyObjectExists(obj, templateObj, key) {
  if (
    !key ||
    key === '_id' ||
    typeof obj === 'string' ||
    typeof templateObj === 'string' ||
    isNullOrUndefined(templateObj) ||
    isNullOrUndefined(templateObj[key])
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

export const useDebounce = (fn, waitTime) => {
  const [timeoutHandler, setTimeoutHandler] = useState()

  const clear = () => {
    clearTimeout(timeoutHandler)
    setTimeoutHandler(null)
  }

  const debounced = useCallback(() => {
    if (timeoutHandler) {
      clear()
    }
    setTimeoutHandler(setTimeout(fn, waitTime))
    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, waitTime])

  return debounced
}

export const cutString = (string, maxLength) => {
  const cut = string.indexOf(' ', maxLength)
  if (cut === -1) {
    return string
  }
  return `${string.substring(0, cut)}...`
}

// for multi-select dropdown hacker app questions
export const applyCustomSort = (data, sort) => {
  const filteredData = data.filter(([key]) => sort.includes(key))
  filteredData.sort((a, b) => {
    const indexA = sort.indexOf(a[0])
    const indexB = sort.indexOf(b[0])
    return indexA - indexB
  })
  return filteredData
}

export const getQuestionsByOrder = appQuestions => {
  const selectedFormInputs = appQuestions.flatMap(q => {
    if (q.type === 'Country') {
      return [['countryOfResidence', q.required]]
    }
    if (q.type === 'Major') {
      return [['major', q.required]]
    }
    if (q.type === 'School') {
      return [['school', q.required]]
    }
    if (q.type === 'Full Legal Name') {
      return [
        ['legalFirstName', q.required],
        ['legalMiddleName', false],
        ['legalLastName', q.required],
      ]
    }
    if (q.type === 'Portfolio') {
      return [
        ['resume', q.required],
        ['github', false],
        ['linkedin', false],
        ['portfolio', false],
      ]
    }

    return [[q.formInput, q.required, q.maxWords ? q.maxWords : undefined]]
  })

  return selectedFormInputs
}

export const toOtherCamelCase = str => {
  const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1)
  return `other${capitalizedStr}`
}

export const toCamelCase = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')
}

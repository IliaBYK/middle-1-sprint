type StringIndexed = Record<string, unknown>

function queryString (data: StringIndexed): string | never {
  if (typeof data !== 'object' || data === null) throw new Error('input must be an object')

  const objectToQuery = (obj: StringIndexed): string => {
    return Object.entries(obj)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map((item, index) => `${encodeURIComponent(key)}[${index}]=${encodeURIComponent(String(item))}`)
            .join('&')
        } else if (typeof value === 'object' && value !== null) {
          return objectToQuery(value as StringIndexed).split('&').map(q => `${encodeURIComponent(key)}${q ? `.${q}` : ''}`)
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        }
      })
      .flat()
      .join('&')
  }

  return objectToQuery(data)
}

export default queryString

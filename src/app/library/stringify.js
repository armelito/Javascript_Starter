export function stringifyClass (value) 
{
  if (Array.isArray(value)) return stringifyArray(value)
  if (isObject(value)) return stringifyObject(value)
  if (typeof value === 'string') return value

  return ''
}

export function stringifyArray (value)
{
  let res = ''
  let stringified

  for (let i = 0, l = value.length; i < l; i++) 
  {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') 
    {
      if (res) res += ' '

      res += stringified
    }
  }

  return res
}

export function stringifyObject (value)
{
  let res = ''

  for (const key in value) 
  {
    if (value[key]) 
    {
      if (res) res += ' '

      res += key
    }
  }

  return res
}
export function isUndef (v) 
{
  return v === undefined || v === null
}

export function isDef (v) 
{
  return v !== undefined && v !== null
}

export function isTrue (v) 
{
  return v === true
}

export function isFalse (v) 
{
  return v === false
}

export function isRegExp (v) 
{
  return _toString.call(v) === '[object RegExp]'
}

export function isPrimitive (value) 
{
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

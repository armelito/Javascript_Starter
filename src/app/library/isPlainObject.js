export function isPlainObject (obj) 
{
  return _toString.call(obj) === '[object Object]'
}
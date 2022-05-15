export function toRawType (value) 
{
  return _toString.call(value).slice(8, -1)
}
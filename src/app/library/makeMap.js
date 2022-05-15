/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(str,expectsLowerCase)
{
  const map = Object.create(null)
  const list = str.split(',')

  for (var i = 0; i < list.length; i++)
  {
    map[list[i]] = true
  }

  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()] }
    : function (val) { return map[val] }
}

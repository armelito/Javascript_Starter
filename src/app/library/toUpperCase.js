export function toUpperCase(str) 
{
  return str.replace(/(\b[a-z](?!\s))/g, function(x)
  {
    return x.toUpperCase()
  })
}
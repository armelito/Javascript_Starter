import { extend } from "./extend"

export function toObject (arr) 
{
  const res = {}

  for (let i = 0; i < arr.length; i++) 
  {
    if (arr[i]) 
    {
      extend(res, arr[i])
    }
  }
  return res
}
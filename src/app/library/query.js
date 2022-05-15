export function query (el)
{
  if (typeof el === 'string')
  {
    const selected = document.querySelector(el)

    if (!selected)
    {
      process.env.NODE_ENV !== 'production' && console.error(
        'Cannot find element: ' + el
      )

      return document.createElement('div')
    }

    return selected
  }
  else
  {
    return el
  }
}

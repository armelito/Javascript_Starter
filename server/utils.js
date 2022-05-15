const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

function noop (a, b, c,) {}

const no = function (a, b, c)
{
  return false
}

const inBrowser = typeof window !== 'undefined'

module.exports =
{
  __DEV__,
  __PROD__,
  noop,
  no,
  inBrowser
}

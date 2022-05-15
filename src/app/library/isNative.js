export function isNative(Constructor)
{
  return typeof Constructor === 'function' && /native code/.test(Constructor.toString())
}

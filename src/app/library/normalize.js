import { isPlainObject } from "./isPlainObject"
import { camelize } from "./camelize"
import { toRawType } from "./toRawType"
import { extend } from "./extend"

export function normalizeProps (options, vm) 
{
  var props = options.props

  if (!props) { return }

  var res = {}

  var i, val, name

  if (Array.isArray(props)) 
  {
    i = props.length

    while (i--) 
    {
      val = props[i]

      if (typeof val === 'string') 
      {
        name = camelize(val);
        res[name] = { type: null }
      } 
      else 
      {
        console.error('props must be strings when using array syntax.')
      }
    }
  } 
  else if (isPlainObject(props)) 
  {
    for (var key in props) 
    {
      val = props[key]
      name = camelize(key)
      res[name] = isPlainObject(val)
        ? val
        : { type: val }
    }
  } 
  else 
  {
    console.error(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    )
  }
  options.props = res;
}

export function normalizeInject (options, vm) 
{
  var inject = options.inject

  if (!inject) { return }

  var normalized = options.inject = {}

  if (Array.isArray(inject)) 
  {
    for (var i = 0; i < inject.length; i++) 
    {
      normalized[inject[i]] = { from: inject[i] }
    }
  } 
  else if (isPlainObject(inject)) 
  {
    for (var key in inject) 
    {
      var val = inject[key]
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } 
  else 
  {
    console.error(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

export function normalizeDirectives (options) 
{
  var dirs = options.directives

  if (dirs) 
  {
    for (var key in dirs) 
    {
      var def$$1 = dirs[key]

      if (typeof def$$1 === 'function') 
      {
        dirs[key] = { bind: def$$1, update: def$$1 }
      }
    }
  }
}
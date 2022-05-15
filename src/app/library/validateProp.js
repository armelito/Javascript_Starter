import { hasOwn } from "./hasOwn"

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) 
{
  var prop = propOptions[key]
  var absent = !hasOwn(propsData, key)
  var value = propsData[key]

  var booleanIndex = getTypeIndex(Boolean, prop.type)

  if (booleanIndex > -1) 
  {
    if (absent && !hasOwn(prop, 'default')) 
    {
      value = false;
    } 
    else if (value === '' || value === hyphenate(key)) 
    {
      var stringIndex = getTypeIndex(String, prop.type)

      if (stringIndex < 0 || booleanIndex < stringIndex) 
      {
        value = true
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}


function getPropDefaultValue (vm, prop, key) 
{
  // no default, return undefined
  if (!hasOwn(prop, 'default')) 
  {
    return undefined
  }

  var def = prop.default

  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) 
  {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}
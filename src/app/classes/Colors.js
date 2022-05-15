import GSAP from 'gsap'

export default class Colors
{
  change ({
    _backgroundColor,
    _color,
  })
  {
    GSAP.to(document.documentElement,
    {
      _backgroundColor,
      _color,
      duration: 1.5
    })
  }
}

export const ColorsManager = new Colors()

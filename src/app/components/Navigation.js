import GSAP from 'gsap'
import Component from 'classes/Component'
import { WHITE, FONT_COLOR_INACTIVE } from '../utils/colors'
export default class Navigation extends Component
{
  constructor({ template })
  {
    super({
      element: '.navigation',
      elements: {},
    })

    this.onChange(template)
  }

  onChange(template)
  {
    if (template === 'about')
    {
      /*GSAP.to(this.elements.links[0],
      {
        fontSize: 16,
        fontFamily: 'Mulish-SemiBold',
        color: FONT_COLOR_INACTIVE,
        autoRound: false,
        ease: 'expo.out',
        delay: 0.08,
        duration: 0.4,
      })

      GSAP.to(this.elements.links[1],
      {
        fontSize: 18,
        fontFamily: 'Mulish-ExtraBold',
        color: WHITE,
        autoRound: false,
        ease: 'expo.out',
        duration: 0.4,
      })*/
    }
  }
}

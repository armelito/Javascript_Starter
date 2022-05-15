import GSAP from 'gsap'
import { each } from 'lodash'
import Component from '../classes/Component'

export default class Preloader extends Component
{
  constructor()
  {
    super({
      element: '.preloader',
      elements:
      {
        progressBar: '.preloader__progressBar',
        logo: '.preloader__media',
        number: '.preloader__number',
        images: document.querySelectorAll('img')
      }
    })

    this.length = 0

    this.createLoader()
  }

  createLoader()
  {
    each(this.elements.images, image =>
    {
      image.src = image.getAttribute('data-src')
      image.onload = _ => this.onAssetLoaded(image)
    })
  }

  onAssetLoaded(image)
  {
    this.length++

    const total = Math.round(this.length / this.elements.images.length * 100)

    this.elements.number.innerHTML = `${total}%`
    this.elements.progressBar.style.transform = `scaleX(${total / 100})`

    if(total === 100)
    {
      this.onLoaded()

      return
    }
  }

  onLoaded()
  {
    return new Promise(resolve =>
    {
      this.emit('completed')

      this.elements.progressBar.style.transformOrigin = 'right center'
      this.elements.progressBar.style.transform = `scaleX(${0})`

      this.animateOut = GSAP.timeline({ delay: 2 })

      this.animateOut.to(this.elements.logo,
      {
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        scale: 0,
        opacity: 0
      })

      this.animateOut.to(this.elements.number,
      {
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        y: '100%'
      }, '-=1.4')

      this.animateOut.to(this.element,
      {
        duration: 2,
        ease: 'expo.out',
        scaleY: 0,
        transformOrigin: '100% 100%'
      }, '-=1.48')

      this.animateOut.call(_ => { this.destroy() })
    })
  }

  destroy()
  {
    this.element.parentNode.removeChild(this.element)
  }
}

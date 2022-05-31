import * as THREE from 'three'
import GSAP from 'gsap'
import Component from 'classes/Component'
import each from 'lodash/each'
export default class Preloader extends Component
{
  constructor({ cursor })
  {
    super({
      element: '.preloader',
      elements:
      {
        media: '.preloader__media',
        logo: '.preloader__media__logo',
        images: document.querySelectorAll('img')
      },
    })

    this.cursor = cursor

    this.length = 0

    this.createLoader(this.elements.images)
  }

  createLoader(images)
  {
    each(images, (image) =>
    {
      image.src = image.getAttribute('data-src')
      image.onload = _ => this.onAssetLoaded(image)
    })
  }

  onAssetLoaded()
  {
    this.length++

    const percent = this.length / this.elements.images.length

    if (percent === 1)
      this.onLoaded()
  }

  // GSAP animations

  onLoaded()
  {
    return new Promise((resolve) =>
    {
      this.emit('completed')

      const animation = GSAP.timeline()
      animation.add(this.hideLoader())
      animation.add(this.showCursor())
      animation.add(this.hidePreloader(resolve))
    })
  }

  hideLoader()
  {
    this.timeline = GSAP.timeline({
      defaults:
      {
        ease: 'expo.out'
      },
      delay: 1
    })

    this.timeline.to(this.elements.media,
    {
      duration: 1,
      opacity: 0,
      transformOrigin: '50% 50%',
      delay: 1.1,
    }, 0)

    this.timeline.to(this.elements.media,
    {
      duration: 0.6,
      y: '30%',
      delay: 0.1,
    }, 0)
  }

  showCursor()
  {
    this.cursor.show()
  }

  hidePreloader(resolve)
  {
    this.timeline = GSAP.timeline({ delay: 7.8 })

    this.timeline.to(this.element,
    {
      duration: 2,
      scaleY: 0,
      ease: 'expo.out',
      transformOrigin: '100% 100%'
    })

    this.timeline.to(this.element,
    {
      autoAlpha: 0,
      duration: 1
    })

    this.timeline.call((_) =>
    {
      this.destroy()
    })
  }

  destroy()
  {
    this.element.parentNode.removeChild(this.element)
  }
}

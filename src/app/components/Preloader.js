import * as THREE from 'three'
import GSAP from 'gsap'
import Component from 'classes/Component'
import each from 'lodash/each'
export default class Preloader extends Component
{
  constructor({ experience, cursor })
  {
    super({
      element: '.preloader',
      elements:
      {
        media: '.preloader__media',
        logo: '.preloader__media__logo',
        number: '.preloader__number',
        transitionScreen: '.preloader__transitionScreen',
        animationTop: '.preloader__transitionScreen__top',
        animationBottom: '.preloader__transitionScreen__bottom',
        images: document.querySelectorAll('img')
      },
    })

    this.experience = experience
    this.cursor = cursor

    window.TEXTURES = {}

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

  loadTexture(image)
  {
    const texture = new THREE.Texture(image)
    texture.needsUpdate = true

    const media = new window.Image()

    media.crossOrigin = 'anonymous'
    media.src = image
    media.onload = (_) =>
    {
      texture.image = media

      //this.onAssetLoaded()
    }

    window.TEXTURES[image] = texture
  }

  onAssetLoaded()
  {
    this.length++

    const percent = this.length / this.elements.images.length

    this.elements.number.innerHTML = `${Math.round(percent * 100)}%`

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
      animation.add(this.namesTranslation())
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

    this.timeline.to(this.elements.number,
    {
      duration: 3,
      scale: 0,
      opacity: 0,
      transformOrigin: '50% 100%',
      delay: 0.1,
    }, 0)

    this.timeline.to(this.elements.number,
    {
      duration: 0.8,
      y: '30%',
    }, 0)

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

  namesTranslation()
  {
    this.timeline = GSAP.timeline({ delay: 3.2 })

    this.timeline.to(this.elements.animationTop,
    {
      opacity: 1,
      x: '-1400',
      ease: 'expo.out',
      duration: 0.8
    }, 0)

    this.timeline.to(this.elements.animationBottom,
    {
      opacity: 1,
      x: '1400',
      ease: 'expo.out',
      duration: 0.8
    }, 0)

    this.timeline.to(this.elements.animationTop,
    {
      x: '-1500',
      duration: 3,
    }, 0.6)

    this.timeline.to(this.elements.animationBottom,
    {
      x: '1500',
      duration: 3,
    }, 0.6)

    this.timeline.to(this.elements.animationTop,
    {
      x: '-4000',
      ease: 'expo.out',
      duration: 1.8,
    }, 2.7)

    this.timeline.to(this.elements.animationBottom,
    {
      x: '4000',
      ease: 'expo.out',
      duration: 1.8,
    }, 2.7)
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

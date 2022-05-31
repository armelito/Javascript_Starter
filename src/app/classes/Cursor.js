import GSAP from 'gsap'
export default class Cursor
{
  constructor({ template })
  {
    this.template = template || 'default'

    this.cursor = {}
    //this.cursor.container = ''

    this.cursor.border = {}
    this.cursor.border.container = ''
    this.cursor.border.spinner = ''
    this.cursor.border.mediaUp = ''
    this.cursor.border.mediaDown = ''

    this.cursor.inner = {}
    this.cursor.inner.container = ''
    this.cursor.inner.pointer = ''

    //this.createCursorContainerDOM()
    this.createCursorBorderDOM()
    this.createCursorInnerDOM()
    this.config()
  }

  createCursorContainerDOM()
  {
    this.cursor.container = document.createElement('div')
    this.cursor.container.classList.add('cursor')
    document.body.appendChild(this.cursor.container)
  }

  createCursorBorderDOM()
  {
    this.cursor.border.container = document.createElement('div')
    this.cursor.border.container.classList.add('cursor')
    this.cursor.border.container.classList.add('cursor__border')
    document.body.appendChild(this.cursor.border.container)

    this.cursor.border.mediaUp = document.createElement('figure')
    this.cursor.border.mediaUp.classList.add('cursor__border__up__media')
    this.cursor.border.container.appendChild(this.cursor.border.mediaUp)

    this.scrollIndicatorUp = new window.Image()
    this.scrollIndicatorUp.crossOrigin = 'anonymous'
    this.scrollIndicatorUp.setAttribute('data-src', '/icons/arrow-up.svg')
    this.scrollIndicatorUp.classList.add('cursor__border__up__media__image')
    this.cursor.border.mediaUp.appendChild(this.scrollIndicatorUp)

    this.cursor.border.spinner = document.createElement('div')
    this.cursor.border.spinner.classList.add('cursor__border__spinner')
    this.cursor.border.spinner.classList.add('--default')
    this.cursor.border.container.appendChild(this.cursor.border.spinner)

    this.cursor.border.mediaDown = document.createElement('figure')
    this.cursor.border.mediaDown.classList.add('cursor__border__down__media')
    this.cursor.border.container.appendChild(this.cursor.border.mediaDown)

    this.scrollIndicatorDown = new window.Image()
    this.scrollIndicatorDown.crossOrigin = 'anonymous'
    this.scrollIndicatorDown.setAttribute('data-src', '/icons/arrow-down.svg')
    this.scrollIndicatorDown.classList.add('cursor__border__down__media__image')
    this.cursor.border.mediaDown.appendChild(this.scrollIndicatorDown)
  }

  createCursorInnerDOM()
  {
    this.cursor.inner.container = document.createElement('div')
    this.cursor.inner.container.classList.add('cursor')
    this.cursor.inner.container.classList.add('cursor__inner')
    document.body.appendChild(this.cursor.inner.container)

    this.cursor.inner.pointer = document.createElement('div')
    this.cursor.inner.pointer.classList.add('cursor__inner__pointer')
    this.cursor.inner.container.appendChild(this.cursor.inner.pointer)
  }

  config()
  {
    this.isOnMouseMove = false
    this.isOnWheel = false
    this.isWrapperLimit = false
    this.isHoverLink = false
    this.speed = 0.08

    this.coord = {}
    this.coord.x = 0
    this.coord.y = 0

    this.scroll = {}
    this.scroll.current = 0
    this.scroll.limit = 0

    this.mouse = {}
    this.mouse.x = 0
    this.mouse.y = 0

    this.sizes = {}
    this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight

    this.media = new window.Image()
    this.media.crossOrigin = 'anonymous'
    this.media.src = '/icons/eye.svg'
    this.media.classList.add('cursor__inner__media')
  }

  show(animation)
  {
    return new Promise((resolve) =>
    {
      if (animation)
      {
        this.animationIn = animation
      }
      else
      {
        this.animationIn = GSAP.timeline({ delay: 7 })
        this.animationIn.to('.cursor',
          { opacity: 1, duration: 1, ease: 'expo.out', Complete: resolve })
      }
    })
  }

  hide(animation)
  {
    return new Promise((resolve) =>
    {
      if (animation)
      {
        this.removeEventListeners()

        this.animationIn = animation
      }
      else
      {
        this.removeEventListeners()

        this.animationIn = GSAP.timeline()
        this.animationIn.to('.cursor',
        {
          autoAlpha: 0,
          onComplete: resolve,
        })
      }
    })
  }

  onWheel({ pixelY })
  {
    this.isOnWheel = true

    if(pixelY <= 2 && pixelY >= -2)
      this.isOnWheel = false
  }

  onCursorMove(e)
  {
    this.isOnMouseMove = true

    this.mouse.x = e.clientX
    this.mouse.y = e.clientY
  }

  onMouseDown()
  {
    //this.timeline.play()
  }

  onMouseUp()
  {
    //this.timeline.play()
  }

  onMouseEnter()
  {
    this.isHoverLink = true
    this.cursor.border.spinner.classList.replace('--default', '--hover')
    this.cursor.inner.pointer.parentNode.replaceChild(this.media, this.cursor.inner.pointer)
  }

  onMouseLeave()
  {
    this.isHoverLink = false
    this.cursor.border.spinner.classList.replace('--hover', '--default')
    this.media.parentNode.replaceChild(this.cursor.inner.pointer, this.media)
  }

  update(scroll)
  {
    this.updateCursorPosition(scroll)
    this.updateCursorScrollIndicators()
  }

  updateCursorPosition({current, limit})
  {
    let deltaX = this.mouse.x - this.coord.x
    let deltaY = this.mouse.y - this.coord.y

    //console.log(deltaX, deltaY, this.coord.x)

    this.scroll.current = current
    this.scroll.limit = limit

    this.coord.x += deltaX * this.speed
    this.coord.y += deltaY * this.speed

    this.cursor.border.container.style.transform = `translate3d(calc(${this.coord.x}px - 50%), calc(${this.coord.y}px - 50%), 0)`
    this.cursor.inner.container.style.left = `${this.mouse.x}px`
    this.cursor.inner.container.style.top = `${this.mouse.y}px`

    //console.log(this.coord.x, this.coord.y)

    if(this.coord.x < this.mouse.x + 0.01 &&
       this.coord.x > this.mouse.x - 0.01 &&
       this.coord.y < this.mouse.y + 0.01 &&
       this.coord.y > this.mouse.y - 0.01)
      this.isOnMouseMove = false
  }

  updateCursorScrollIndicators()
  {
    if(this.isHoverLink)
    {
      if(this.scrollIndicatorUp.classList.contains('--wheel-off'))
         this.scrollIndicatorUp.classList.remove('--wheel-off')

      if(this.scrollIndicatorDown.classList.contains('--wheel-off'))
         this.scrollIndicatorDown.classList.remove('--wheel-off')

      if(!this.scrollIndicatorUp.classList.contains('--wheel-off') &&
         !this.scrollIndicatorDown.classList.contains('--wheel-off'))
         return
    }
    else
    {
      if(!this.isOnWheel && !this.isOnMouseMove)
      {
        if(!this.scrollIndicatorUp.classList.contains('--wheel-off'))
          this.scrollIndicatorUp.classList.add('--wheel-off')

        if(!this.scrollIndicatorDown.classList.contains('--wheel-off'))
          this.scrollIndicatorDown.classList.add('--wheel-off')

        if(this.scrollIndicatorUp.classList.contains('--wheel-off') &&
           this.scroll.current < 0.01)
          this.scrollIndicatorUp.classList.remove('--wheel-off')

        if(this.scrollIndicatorDown.classList.contains('--wheel-off') &&
           this.scroll.current > this.scroll.limit - 0.01)
          this.scrollIndicatorDown.classList.remove('--wheel-off')

        if(this.scrollIndicatorUp.classList.contains('--wheel-off') &&
           this.scrollIndicatorDown.classList.contains('--wheel-off'))
           return
      }
      else if(this.isOnWheel || this.isOnMouseMove)
      {
        if(this.scrollIndicatorUp.classList.contains('--wheel-off'))
           this.scrollIndicatorUp.classList.remove('--wheel-off')

        if(this.scrollIndicatorDown.classList.contains('--wheel-off'))
           this.scrollIndicatorDown.classList.remove('--wheel-off')

        if(!this.scrollIndicatorUp.classList.contains('--wheel-off') &&
           !this.scrollIndicatorDown.classList.contains('--wheel-off'))
           return
      }
    }
  }

  onResize()
  {
    this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight
  }

  addEventListeners()
  {
    this.onMouseDownEvent = this.onMouseDown.bind(this)
    this.onMouseUpEvent = this.onMouseUp.bind(this)

    document.addEventListener('mousedown', this.onMouseDownEvent)
    document.addEventListener('mouseup', this.onMouseUpEvent)
  }

  removeEventListeners()
  {
    document.removeEventListener('mousemove', this.onMouseEnterEvent)
    document.removeEventListener('mousedown', this.onMouseDownEvent)
    document.removeEventListener('mouseup', this.onMouseUpEvent)
  }
}

import GSAP from 'gsap'
import Component from 'classes/Component'

export default class Cursor extends Component
{
  constructor({ template })
  {
    super({
      elements:
      {
        cursorBorder: '.cursor__border',
        cursorBorderSpinner: '.cursor__border__spinner',
        scrollIndicatorUp: '.cursor__border__up__media',
        scrollIndicatorDown: '.cursor__border__down__media',
        cursorInner: '.cursor__inner',
        cursorInnerPointer: '.cursor__inner__pointer'
      },
    })

    this.template = template

    this.config()
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
        this.animationIn.to('#cursor',
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
        this.animationIn.to('#cursor',
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

  onMouseMove(e)
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
    this.elements.cursorBorderSpinner.classList.replace('--default', '--hover')
    this.elements.cursorInner.replaceChild(this.media, this.elements.cursorInnerPointer)
  }

  onMouseLeave()
  {
    this.isHoverLink = false
    this.elements.cursorBorderSpinner.classList.replace('--hover', '--default')
    this.elements.cursorInner.replaceChild(this.elements.cursorInnerPointer, this.media)
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

    this.scroll.current = current
    this.scroll.limit = limit

    this.coord.x += deltaX * this.speed
    this.coord.y += deltaY * this.speed

    this.elements.cursorBorder.style.transform = `translate3d(calc(${this.coord.x}px - 50%), calc(${this.coord.y}px - 50%), 0)`
    this.elements.cursorInner.style.left = `${this.mouse.x}px`
    this.elements.cursorInner.style.top = `${this.mouse.y}px`

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
      if(this.elements.scrollIndicatorUp.classList.contains('--wheel-off'))
        this.elements.scrollIndicatorUp.classList.remove('--wheel-off')

      if(this.elements.scrollIndicatorDown.classList.contains('--wheel-off'))
        this.elements.scrollIndicatorDown.classList.remove('--wheel-off')

      if(!this.elements.scrollIndicatorUp.classList.contains('--wheel-off') &&
         !this.elements.scrollIndicatorDown.classList.contains('--wheel-off'))
         return
    }
    else
    {
      if(!this.isOnWheel && !this.isOnMouseMove)
      {
        if(!this.elements.scrollIndicatorUp.classList.contains('--wheel-off'))
          this.elements.scrollIndicatorUp.classList.add('--wheel-off')

        if(!this.elements.scrollIndicatorDown.classList.contains('--wheel-off'))
          this.elements.scrollIndicatorDown.classList.add('--wheel-off')

        if(this.elements.scrollIndicatorUp.classList.contains('--wheel-off') &&
           this.scroll.current < 0.01)
          this.elements.scrollIndicatorUp.classList.remove('--wheel-off')

        if(this.elements.scrollIndicatorDown.classList.contains('--wheel-off') &&
           this.scroll.current > this.scroll.limit - 0.01)
          this.elements.scrollIndicatorDown.classList.remove('--wheel-off')

        if(this.elements.scrollIndicatorUp.classList.contains('--wheel-off') &&
           this.elements.scrollIndicatorDown.classList.contains('--wheel-off'))
           return
      }
      else if(this.isOnWheel || this.isOnMouseMove)
      {
        if(this.elements.scrollIndicatorUp.classList.contains('--wheel-off'))
          this.elements.scrollIndicatorUp.classList.remove('--wheel-off')

        if(this.elements.scrollIndicatorDown.classList.contains('--wheel-off'))
          this.elements.scrollIndicatorDown.classList.remove('--wheel-off')

        if(!this.elements.scrollIndicatorUp.classList.contains('--wheel-off') &&
           !this.elements.scrollIndicatorDown.classList.contains('--wheel-off'))
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
    this.onMouseMoveEvent = this.onMouseMove.bind(this)
    this.onMouseDownEvent = this.onMouseDown.bind(this)
    this.onMouseUpEvent = this.onMouseUp.bind(this)

    document.addEventListener('mousemove', this.onMouseMoveEvent)
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

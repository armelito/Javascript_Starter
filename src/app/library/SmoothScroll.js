// Nodes modules
import GSAP from 'gsap'
import Prefix from 'prefix'
import NormalizeWheel from 'normalize-wheel'
import * as dat from 'dat.gui'

export default class SmoothScroll 
{
  constructor(container, content, infinite = false)
  {
    this.transformPrefix = Prefix('transform')
    this.infinite = infinite
    this.init(container, content)
    this.setStyle()
    this.initParams()
    this.initPanel()
    this.addEventListeners()
  }

  init(container, content)
  {
    this.container = this.selectElement(container)
    this.content = this.selectElement(content)
  }

  selectElement(element)
  {
    if(Array.isArray(element)) return console.error('cannot select an array')
    else if(element instanceof window.NodeList) return console.error(window.NodeList)
    else if(element instanceof window.HTMLElement) return element
    else return document.querySelector(element)
  }

  setStyle()
  {
    this.container.style.overflow = `hidden`
    this.container.style.position = `fixed`
    this.container.style.width = `100vw`
    this.container.style.height = `100vh`
  }

  initParams()
  {
    this.settings = {}
    this.settings.duration = 300
    this.settings.a = 0
    this.settings.b = 0.8
    this.settings.c = 0.1
    this.settings.d = 0.4

    const bounds = this.container.getBoundingClientRect()

    this.params = {}
    this.params.animation = {}
    this.params.animation.duration = `${this.settings.duration}`
    this.params.animation.timingFunction = `cubic-bezier(${this.settings.a},${this.settings.b},${this.settings.c},${this.settings.d})`
    this.params.scroll = {}
    this.params.scroll.current = 0
    this.params.scroll.target = 0,
    this.params.scroll.last = 0,
    this.params.scroll.limit = 0
    this.params.wrapper = {}
    this.params.wrapper.width = bounds.width
    this.params.wrapper.height = bounds.height
  }

  initPanel()
  {
    //const gui = new dat.GUI()
    //const cubicFolder = gui.addFolder('Cubic Bezier')
    //cubicFolder.add(this.settings, 'a').min(-1).max(1).step(0.01).name('A')
    //cubicFolder.add(this.settings, 'b').min(-1).max(1).step(0.01).name('B')
    //cubicFolder.add(this.settings, 'c').min(-1).max(1).step(0.01).name('C')
    //cubicFolder.add(this.settings, 'd').min(-1).max(1).step(0.01).name('D')
    //cubicFolder.add(this.settings, 'duration').min(1).max(10000).step(2).name('Duration')
  }

  onScroll(event)
  {
    const { pixelY } = NormalizeWheel(event)
    this.params.scroll.target += pixelY
  }

  onResize()
  {
    const bounds = this.elements.wrapper.getBoundingClientRect()
    this.params.wrapper.width = bounds.width
    this.params.wrapper.height = bounds.height

    if(this.elements.wrapper)
      this.params.scroll.limit = this.params.wrapper.height - window.innerHeight
  }

  update()
  {
    this.params.animation.duration = `${this.settings.duration}`
    this.params.animation.timingFunction = `cubic-bezier(${this.settings.a},${this.settings.b},${this.settings.c},${this.settings.d})`

    this.setScroll()

    window.requestAnimationFrame(() =>
    {
      this.update()
    })
  }

  setScroll()
  {
    this.params.scroll.target = GSAP.utils.clamp(0, this.params.scroll.limit, this.params.scroll.target)
    this.params.scroll.current = GSAP.utils.interpolate(this.params.scroll.current, this.params.scroll.target, 0.1)

    if(this.params.scroll.current < 0.01)
      this.params.scroll.current = 0

    if(this.content)
      this.content.style[this.transformPrefix] = `translateY(-${this.params.scroll.current}px)`
      this.content.style.transition = `transform ${this.params.animation.duration}ms ${this.params.animation.timingFunction}`
  }

  addEventListeners()
  {
    window.addEventListener('mousewheel', this.onScroll.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
  }

  removeEventListeners()
  {
    window.removeEventListener('scroll', this.onScroll.bind(this))
    window.removeEventListener('resize', this.onResize.bind(this))
  }

}
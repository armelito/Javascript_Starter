import '../styles/index.styl'

import each from 'lodash/each'
import NormalizeWheel from 'normalize-wheel'

import Cursor from './classes/Cursor'
import Navigation from './components/Navigation'
import Preloader from './components/Preloader'

import { Home, About, } from './pages'
export default class App
{
  constructor()
  {
    this.createContent()
    this.createCursor()
    this.createPreloader()
    this.createNavigation()
    this.createPages()
    this.addEventListeners()
    this.addLinkListeners()
    this.update()
  }

  createNavigation()
  {
    this.navigation = new Navigation({ template: this.template })
  }

  createCursor()
  {
    this.cursor = new Cursor({ template: this.template })
  }

  createPreloader()
  {
    this.preloader = new Preloader({ cursor: this.cursor })
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createContent()
  {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages()
  {
    this.pages =
    {
      about: new About(),
      home: new Home(),
    }

    this.page = this.pages[this.template]
    this.page.create()
  }

  initParams()
  {
    const sizes = {}
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
  }

  onPreloaded()
  {
    this.onResize()

    this.page.show()
  }

  onPopState()
  {
    this.onChange({
      url: window.location.pathname,
      push: true,
    })
  }

  async onChange({ url, push = true })
  {
    await this.page.hide()

    const res = await window.fetch(url)

    if (res.status === 200)
    {
      const html = await res.text()
      const div = document.createElement('div')

      if (push) window.history.pushState({}, '', url)

      div.innerHTML = html

      const divContent = div.querySelector('.content')

      this.template = divContent.getAttribute('data-template')

      this.navigation.onChange(this.template)

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.page = this.pages[this.template]
      this.page.create()

      this.onResize()

      this.page.show()

      this.addLinkListeners()
    }
    else
    {
      console.error(`response status: ${res.status}`)
    }
  }

  onResize()
  {
    if (this.page && this.page.onResize)
      this.page.onResize()

    if (this.cursor && this.cursor.onResize)
      this.cursor.onResize()
  }

  onTouchDown(e)
  {

  }

  onTouchMove(e)
  {
    if (this.cursor && this.cursor.onCursorMove)
      this.cursor.onCursorMove(e)
  }

  onTouchUp(e)
  {

  }

  onWheel(e)
  {
    const normalizedWheel = NormalizeWheel(e)

    if (this.page && this.page.onWheel)
      this.page.onWheel(normalizedWheel)

    if (this.cursor && this.cursor.onWheel)
      this.cursor.onWheel(normalizedWheel)
  }

  onMouseEnter(e)
  {
    if (this.cursor && this.cursor.onMouseEnter)
      this.cursor.onMouseEnter()
  }

  onMouseLeave(e)
  {
    if (this.cursor && this.cursor.onMouseLeave)
      this.cursor.onMouseLeave()
  }
  /*
   *  LOop
   */

  update()
  {
    if (this.page && this.page.update)
      this.page.update()

    if (this.cursor && this.cursor.update)
      this.cursor.update(this.page.scroll)

    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }

  /*
   * Listeners
   */
  addEventListeners()
  {
    window.addEventListener('mousewheel', this.onWheel.bind(this))
    window.addEventListener('mousedown', this.onTouchDown.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))
    window.addEventListener('mouseup', this.onTouchUp.bind(this))
    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchUp.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
  }

  addLinkListeners()
  {
    const links = document.querySelectorAll('a')

    each(links, (link) =>
    {
      link.addEventListener('mouseenter', this.onMouseEnter.bind(this))
      link.addEventListener('mouseleave', this.onMouseLeave.bind(this))

      link.onclick = (event) =>
      {
        event.preventDefault()

        const { href } = link
        this.onChange({ url: href })
      }
    })
  }
}

new App()

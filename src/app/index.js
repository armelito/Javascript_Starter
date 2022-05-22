import '../styles/index.styl'

import each from 'lodash/each'
import { toUpperCase } from './library'
import NormalizeWheel from 'normalize-wheel'

import Experience from './experience/Experience.js'

import Navigation from './components/Navigation'
import Preloader from './components/Preloader'

import * as Pages from './pages'

export default class App
{
  constructor()
  {
    this.createContent()
    this.createExperience()
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

  createPreloader()
  {
    this.preloader = new Preloader({ experience: this.experience })
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createExperience()
  {
    this.experience = new Experience({
      targetElement: document.querySelector('.experience'),
      template: this.template
    })
  }

  createContent()
  {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages()
  {
    this.pages = { ...Pages }
    this.page = new this.pages[toUpperCase(this.template)]()
    this.page.create()
  }

  onPreloaded() {
    this.onResize()

    //this.experience.onPreloaded()

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
    //this.experience.onChangeStart(this.template, url)

    console.log(this.page)
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

      //this.experience.onChangeEnd(this.template)

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

    window.requestAnimationFrame((_) =>
    {
      if (this.experience && this.experience.onResize)
        this.experience.onResize()
    })
  }

  onTouchDown(e)
  {
    if (this.experience && this.experience.onTouchDown)
      this.experience.onTouchDown(e)
  }

  onTouchMove(e)
  {
    if (this.experience && this.experience.onTouchMove)
      this.experience.onTouchMove(e)
  }

  onTouchUp(e)
  {
    if (this.experience && this.experience.onTouchUp)
      this.canvas.onTouchUp(e)
  }

  onWheel(e)
  {
    const normalizedWheel = NormalizeWheel(e)

    if (this.experience && this.experience.onWheel)
      this.experience.onWheel(normalizedWheel)

    if (this.page && this.page.onWheel)
      this.page.onWheel(normalizedWheel)
  }

  /*
   *  LOop
   */

  update()
  {
    if (this.page && this.page.update)
      this.page.update()

    if (this.experience && this.experience.update)
      this.experience.update(this.page.scroll)

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

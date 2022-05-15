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

  onPreloaded()
  {
    this.resize()
    //this.experience.onPreloaded()
    this.page.show()
  }

  onPopState()
  {
    this.onChange({ url: window.location.pathname, push: false })
  }

  async onChange({ url, push = true })
  {
    this.experience.onChangeStart(this.template, url)

    await this.page.hide(this.template)

    const request = await window.fetch(url)

    if(request.status === 200)
    {
      const html = await request.text()
      const div = document.createElement('div')

      if(push) window.history.pushState({}, '', url)

      div.innerHTML = html
      const divContent = div.querySelector('.content')
      this.template = divContent.getAttribute('data-template')

      this.navigation.onChange(this.template)

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.experience.onChangeEnd(this.template)

      this.page = new this.pages[toUpperCase(this.template)]()
      this.page.create()
      this.page.show()

      this.addLinkListeners()
      this.resize()
    }
    else
    {
      console.error(`response status: ${res.status}`);
    }
  }

  update()
  {
    if(this.page && this.page.update) this.page.update()
    if(this.experience && this.experience.update) this.experience.update()

    window.requestAnimationFrame(() =>
    {
      this.update()
    })
  }
  /*
  *   LISTENERS
  *
  */
  resize(event)
  {
    if(this.page && this.page.resize) this.page.resize()

    window.requestAnimationFrame(_ =>
    {
      if(this.experience && this.experience.resize) this.experience.resize(event)
    })
  }

  onTouchStart(event)
  {
    if(this.page && this.page.onTouchStart) this.page.onTouchStart(event)
    if(this.experience && this.experience.onTouchStart) this.experience.onTouchStart(event)
  }

  onTouchMove(event)
  {
    if(this.page && this.page.onTouchMove) this.page.onTouchMove(event)
    if(this.experience && this.experience.onTouchMove) this.experience.onTouchMove(event)
  }

  onTouchEnd(event)
  {
    if(this.page && this.page.onTouchEnd) this.page.onTouchEnd(event)
    if(this.experience && this.experience.onTouchEnd) this.experience.onTouchEnd(event)
  }

  onMouseDown(event)
  {
    if(this.page && this.page.onTouchStart) this.page.onTouchStart(event)
    if(this.experience && this.experience.onTouchStart) this.experience.onTouchStart(event)
  }

  onMouseMove(event)
  {
    if(this.page && this.page.onTouchMove) this.page.onTouchMove(event)
    if(this.experience && this.experience.onTouchMove) this.experience.onTouchMove(event)
  }

  onMouseUp(event)
  {
    if(this.page && this.page.onTouchEnd) this.page.onTouchEnd(event)
    if(this.experience && this.experience.onTouchEnd) this.experience.onTouchEnd(event)
  }

  onMouseWheel(event)
  {
    const { pixelY } = NormalizeWheel(event)

    if(this.page && this.page.onMouseWheel) this.page.onMouseWheel(pixelY)
    if(this.experience && this.experience.onMouseWheel) this.experience.onMouseWheel(pixelY)
  }

  addEventListeners()
  {
    window.addEventListener('popstate', this.onPopState.bind(this))
    window.addEventListener('resize', this.resize.bind(this))
    window.addEventListener('mousewheel', this.onMouseWheel.bind(this))

    const isTouchCapable = 'ontouchstart' in window

    if(isTouchCapable)
      window.addEventListener('touchstart', this.onTouchStart.bind(this))
      window.addEventListener('touchmove', this.onTouchMove.bind(this))
      window.addEventListener('touchend', this.onTouchMove.bind(this))

    if(!isTouchCapable)
      window.addEventListener("mousedown", this.onMouseDown.bind(this))
      window.addEventListener("mousemove", this.onMouseMove.bind(this))
      window.addEventListener("mouseup", this.onMouseUp.bind(this))
  }

  addLinkListeners()
  {
    const links = document.querySelectorAll('a')

    each(links, (link) =>
    {
      link.onclick = event =>
      {
        event.preventDefault()

        const { href } = link

        this.onChange({ url: href })
      }
    })
  }
}

new App()

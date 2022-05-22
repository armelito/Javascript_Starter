import Page from '../../classes/Page'
import Button from '../../classes/Button'

export default class About extends Page
{
  constructor()
  {
    super({
      id: 'about',
      element: '.about',
      elements:
      {
        wrapper: '.about__wrapper',
        navigation: document.querySelector('.navigation'),
        link: '.about__link'
      }
    })
  }

  create()
  {
    super.create()

    this.link = new Button ({
      element: this.elements.link
    })
  }

  destroy()
  {
    super.destroy()

    this.link.removeEventListeners()
  }
}

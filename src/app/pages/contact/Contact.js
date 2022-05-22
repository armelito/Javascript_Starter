import Page from '../../classes/Page'
import Button from '../../classes/Button'

export default class Contact extends Page
{
  constructor()
  {
    super({
      id: 'contact',
      element: '.contact',
      elements:
      {
        wrapper: '.contact__wrapper',
        navigation: document.querySelector('.navigation'),
        link: '.contact__link'
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

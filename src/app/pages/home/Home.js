import Page from '../../classes/Page'
import Gallery from '../../components/Gallery'
import Button from '../../components/Button'

export default class Home extends Page
{
  constructor()
  {
    super({
      id: 'home',
      element: '.home',
      children:
      {
        wrapper: '.home__wrapper',
        section: document.querySelector('.gallery__project'),
        navigation: document.querySelector('.navigation'),
        link: '.home__link',
      },
      components: ['gallery'],
      infiniteScroll: true
    })
  }

  create()
  {
    super.create()

    this.link = new Button ({
      element: this.element.link
    })

    this.gallery = new Gallery()
  }

  destroy()
  {
    super.destroy()

    this.link.removeEventListeners()
  }
}

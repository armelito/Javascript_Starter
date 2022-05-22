import Page from '../../classes/Page'
import Button from '../../classes/Button'
import Gallery from '../../components/Gallery'

export default class Home extends Page
{
  constructor()
  {
    super({
      id: 'home',
      element: '.home',
      elements:
      {
        wrapper: '.home__wrapper',
        section: document.querySelector('.gallery__project'),
        navigation: document.querySelector('.navigation'),
      },
      components: ['gallery'],
      infiniteScroll: true
    })
  }

  create()
  {
    super.create()

    this.gallery = new Gallery()
  }

  destroy()
  {
    super.destroy()
  }
}

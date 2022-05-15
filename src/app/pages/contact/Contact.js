import Page from '../../classes/Page'

export default class Contact extends Page
{
  constructor()
  {
    super({
      id: 'contact',
      element: '.contact',
      children:
      {
        wrapper: '.contact__wrapper',
        navigation: document.querySelector('.navigation')
      }
    })
  }
}
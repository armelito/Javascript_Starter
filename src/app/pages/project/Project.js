import Page from '../../classes/Page'
import GSAP from 'gsap'

export default class Project extends Page
{
  constructor()
  {
    super({
      id: 'project',
      element: '.project',
      children:
      {
        wrapper: document.querySelector('.project__wrapper'),
        navigation: document.querySelector('.navigation'),
        imageFilter: document.querySelector('.project__filtre'),
        title: document.querySelector('.project__title'),
        description: document.querySelector('.project__description'),
        imageHero: document.querySelector('.project__hero__image')
      }
    })
  }

  addEventListeners() {}
  removeEventListeners() {}
}

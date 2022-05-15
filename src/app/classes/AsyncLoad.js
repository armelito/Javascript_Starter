import Component from './Component'

export default class AsyncLoad extends Component
{
  constructor({ element })
  {
    super({ element })

    this.createObserver()
  }

  createObserver()
  {
    this.observer = new window.IntersectionObserver(entries =>
    {
      entries.forEach(entry =>
      {
        if(entry.isIntersecting)
        {
          if(!this.element.src)
          {
            this.element.src = this.element.getAttribute('data-src')
            this.element.onload = _ => this.element.classList.add('loaded')
          }

          else this.element.classList.add('loaded')
        }

        else this.element.classList.remove('loaded')
      })
    })

    this.observer.observe(this.element)
  }
}
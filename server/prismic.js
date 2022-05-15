const Prismic = require('@prismicio/client')
const fetch = require('node-fetch')

const initApi = (request) =>
{
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT,
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      request,
      fetch,
    }
  )
}

const handleLinkResolver = doc =>
{
  if (doc.type === 'home') return '/'
  if (doc.type === 'project') return `/project/${doc.slug}`
  if (doc.type === 'contact') return '/contact'
  if (doc.type === 'about') return '/about'

  return '/'
}

const handleRequest = async (api) =>
{
  const [
    meta,
    preloader,
    navigation,
    home,
    about,
    { results: collections }
  ]
  = await Promise.all([
    api.getSingle('meta'),
    api.getSingle('preloader'),
    api.getSingle('navigation'),
    api.getSingle('home'),
    api.getSingle('about'),
    api.query(Prismic.Predicates.at('document.type', 'collection'), {
      fetchLinks:
      [
        'project.image',
        'project.title',
        'project.description'
      ]
    }),
  ]);

  console.log(home)

  const assets = []

  /*home.data.gallery.forEach((item) =>
  {
    assets.push(item.image.url)
  })

  about.data.gallery.forEach((item) =>
  {
    assets.push(item.image.url)
  })

  about.data.body.forEach((section) =>
  {
    if (section.slice_type === 'gallery')
    {
      section.items.forEach((item) =>
      {
        assets.push(item.image.url)
      })
    }
  })

  collections.forEach((collection) =>
  {
    collection.data.products.forEach((item) =>
    {
      assets.push(item.products_product.data.image.url)
    })
  })*/

  return {
    assets,
    meta,
    home,
    collections,
    about,
    navigation,
    preloader,
  }
}

module.exports =
{
  initApi,
  handleLinkResolver,
  handleRequest
}

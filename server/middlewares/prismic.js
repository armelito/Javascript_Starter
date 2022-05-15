const PrismicH = require('@prismicio/helpers')
const UAParser = require('ua-parser-js')
const { handleLinkResolver } = require('../prismic')

prismicMiddleware = (request, response, next) =>
{
  const ua = UAParser(request.headers['user-agent'])

  response.locals.isDesktop = ua.device.type === undefined
  response.locals.isPhone = ua.device.type === 'mobile'
  response.locals.isTablet = ua.device.type === 'tablet'

  response.locals.Link = handleLinkResolver
  response.locals.PrismicH = PrismicH

  next()
}

module.exports = prismicMiddleware

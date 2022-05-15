const { initApi, handleRequest } = require('../prismic')

homeController = async (request, response) =>
{
  const api = await initApi(request)
  const defaults = await handleRequest(api)

  response.render('pages/home',
  {
    ...defaults,
  });
}

module.exports = { homeController }

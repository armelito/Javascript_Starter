const { initApi, handleRequest } = require('../prismic')

aboutController = async (request, response) =>
{
  const api = await initApi(request)
  const defaults = await handleRequest(api)

  response.render('pages/about',
  {
    ...defaults,
  });
}

module.exports = { aboutController }

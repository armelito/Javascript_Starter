const { initApi, handleRequest } = require('../prismic')

contactController = async (request, response) =>
{
  const api = await initApi(request)
  const defaults = await handleRequest(api)

  response.render('pages/contact',
  {
    ...defaults,
  });
}

module.exports = { contactController }

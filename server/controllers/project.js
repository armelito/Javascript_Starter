const { initApi, handleRequest } = require('../prismic')

projectController = async (request, response) =>
{
  const api = await initApi(request)
  const defaults = await handleRequest(api)

  const project = await api.getByUID('project', request.params.uid, {
    fetchLinks: 'collection.title',
  })

  response.render('pages/project', {
    ...defaults,
    project,
  });
}

module.exports = { projectController }

const server = require('./server')

server.use((request, response) =>
{
  response.status(404)

  if (request.accepts('html'))
  {
    response.redirect('/')

    return
  }

  if (request.accepts('json'))
  {
    response.send({ error: 'Not Found' })

    return
  }

  response.type('txt').send('Not Found')
})

server.listen(server.get('port'), () =>
{
  console.log(`PORT: ${server.get('port')}`)
})

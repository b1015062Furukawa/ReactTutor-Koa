serve = require('koa-static')
app = require('koa')()
router = require('koa-router')()
koaBody = require('koa-body')()
http = require('http').createServer(app.callback())
path = require('path')
fs = require('fs')

commentsfile = path.join(__dirname, 'comments.json')

loadComments = ->
  return JSON.parse(fs.readFileSync(commentsfile))

saveComments = (comments) ->
  fs.writeFileSync(commentsfile, JSON.stringify(comments, null, 4))

router
  .get '/api/comments', (next)->
    comments = loadComments()
    this.body = JSON.stringify(comments)
  .post '/api/comments', (next)->
    comments = loadComments()
    console.log(this.request.body)
    comments.push(this.request.body)
    saveComments(comments)
    this.body = JSON.stringify(comments)

app
  .use(koaBody)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(__dirname))

http.listen(3000)

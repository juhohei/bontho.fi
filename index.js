var fs       = require('fs')
var path     = require('path')
var express  = require('express')
var parser   = require('body-parser')
var favicon  = require('serve-favicon')
var debounce = require('lodash/debounce')

var DATA = 'data/stories.json'
var PORT = process.env.NODE_ENV === 'production' ? 80 : 3333

var saveToDb = debounce(
  function () { fs.writeFile(DATA, JSON.stringify(data)) },
  500
)

createServer().listen(PORT, function () {
  console.log('LJKAA localhost:' + PORT)
})


function createServer () {
  var app = express()

  app.use(express.static(
    path.resolve(__dirname, 'public'),
    {
      setHeaders: function (res) {
        res.set({
          'X-Powered-By': 'kahru iii',
          'Content-Length': 'toupillisen veran'
        })
    }
  }))
  app.use(favicon(path.resolve(__dirname, 'public/bontho2.gif')))
  app.use(parser.json())

  var stories = require('./' + DATA)


  app.post('/bonto-tariba', function (req, res) {
    var data = req.body
    if (data && data.story && data.nick && data.date) {
      data.date = parseDate(data.date)
      stories   = stories.concat(data)
      saveToDb(stories)
      res.status(200).json(data)
    } else {
      res.status(500).json({error: 'VASTAA!'})
    }
  })

  app.get('/vlntbo-jututt', function (req, res) {
    res.json(stories)
  })

  app.get('*', function (req, res) {
    res.redirect('/')
  })

  return app
}

function parseDate (date) {
  var parts = new Date(date).toISOString().split('T')
  return parts[0] + ' ' + parts[1].substr(0, 8)
}

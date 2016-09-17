var inputs    = ['tariba', 'nimo', 'karuh']
var submit    = getEl('bonto')
var container = getEl('vlnthl')


get('/vlntbo-jututt', function (err, res) {
  if (err) return alert(err)
  renderStories(res.reverse())
})

document.addEventListener('keypress', function (e) {
  if (e.which === 13) bonto()
})


function bonto () {
  var data        = getPostContent()
  submit.disabled = true

  if (!data) return submit.disabled = false

  post('/bonto-tariba', data, function (err, data) {
    submit.disabled = false

    if (err) return alert(err)

    container.innerHTML = renderStory(data) + container.innerHTML
    setEmpty(inputs[0])
  })
}

function getPostContent () {
  var values = inputs.map(getVal)

  if (values.filter(id).length !== values.length) {
    alert('VASTAA KAIKIN KENTIIN!!')
    return null
  }

  if (values[2] !== 'karuh') {
    alert('VASTAA karuh')
    return null
  }

  return {
    story: values[0],
    nick:  values[1],
    date:  new Date()
  }
}

function renderStories (stories) {
  container.innerHTML = (
    '<section>' + stories.map(renderStory).join('') + '</section>'
  )
}

function renderStory (story) {
  return (
    '<article>' +
      renderContent(story) +
      renderMeta(story) +
    '</article>'
  )

  function renderContent (story) {
    return story.story
      .split('\n\n')
      .map(function (s) { return '<p>' + s + '</p>' })
      .join('')
  }

  function renderMeta (story) {
    return '<div>' + story.nick + ' @ ' + story.date + '</div>'
  }
}

function http (method, url, data, cb) {
  var req = new XMLHttpRequest()

  req.open(method, url, true)
  req.setRequestHeader('Content-Type', 'application/json')
  req.responseType = 'json'
  req.onload = function () {
    if (req.status === 200) cb(null, req.response)
    else cb('Kakka virhe: ' + req.status + ' ' + req.statusText, null)
  }
  req.send(JSON.stringify(data))
}

function get (url, cb)        { return http('GET', url, null, cb) }
function post (url, data, cb) { return http('POST', url, data, cb) }
function id (x)               { return x }
function getEl (id)           { return document.getElementById(id) }
function getVal (id)          { return getEl(id).value.trim() }
function setEmpty (id)        { return getEl(id).value = '' }

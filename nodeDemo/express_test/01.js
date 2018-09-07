var  express = require('express')
var app = express()

app.get('/', (req, res) => {
  console.log(req.url)
  res.send('Hello, world!')

})

app.get('/html5', (req, res) => {
  console.log(req.url)
  res.send('Html5')

})

app.get('/it666/:name', (req, res) => {
  console.log(req.params.name)
  res.send('it666')

})

app.listen(3000)

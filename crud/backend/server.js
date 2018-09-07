import express from 'express'
import mongodb from 'mongodb'
import bodyParser from 'body-parser' // body 解析的插件

const app = express()
app.use(bodyParser.json())
const dbUrl = "mongodb://localhost"

// 前端error验证 
// 前端传入的error对象 用validate进行验证 后端根据前端传过来的数据
// 在请求里面做判断
const validate = (data) => {
  let error = {}
  if (data.title === '') error.title = "Can't be empty"
  if (data.cover === '') error.cover = "Can't be empty"

  const isValid = Object.keys(error).length === 0 //

  return { error, isValid }
}

mongodb.MongoClient.connect(dbUrl, (err, client) => {
  if (err) throw err;
  const db = client.db('crud')

  app.get('/api/games', (req, res) => {
    // setTimeout(() => {
      db.collection('games').find({}).toArray((err, games) => {
        res.json({ games })
      })
    // }, 2000);
  })

  app.get('/api/games/:_id', (req, res) => {
    db.collection('games').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, game) => {
      res.json({ game })
    })
  })

  app.put('/api/games/:id', (req, res) => {
    // 解析body中的数据
    const { errors, isValid } = validate(req.body)
    // console.log(validate(req.body))
    if (isValid) {
      const { title, cover } = req.body
      db.collection('games').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: { title, cover } },
        { returnOriginal: false },
        (err, res) => {
          console.log(res)
          if (err) {
            res.status(500).json({ error: { global:err } })
            return;
          }
          res.json({ game: res })
        }
      )
    } else{
      res.status(400).json({ errors })
    }
  })
 
  app.post('/api/games', (req, res) => {
    const { error, isValid } = validate(req.body)
    if (isValid) {
      const { title, cover } = req.body
      db.collection('games').insert({ title, cover }, (err, result) => {
        if (err) {
          res.status(500).json({ error: { global: "Something went wrong" } })
        } else {
          res.json( { game: result.ops[0] } )
        }
      })
    } else {
      res.status(400).json({ error })
    }
  })

  app.use((req, res) => {
    // fetch 返回状态404时，返回的json对象{ error：global }
    res.status(404).json({
      error: {
        global: 'Still working on it, Please try again later than when implement it'
      }
    })
  })

  app.listen(8080, () => console.log('listening!8080'))
})

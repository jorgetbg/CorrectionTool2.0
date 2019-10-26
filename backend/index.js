const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
   
var upload = multer({ storage: storage })

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


app.post("/upload", (req, res) => {
    let file = req.files.sampleFile
    file.mv('./FILE')
})

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    if(!req.body.professor || !req.body.nome) {res.send(300); return;}

    file.filename = req.body.professor + "_" + req.body.nome
    res.send(200)
    
  })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
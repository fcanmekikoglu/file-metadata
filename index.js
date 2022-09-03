var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO, {

})

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json())

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// CHALLANGE AREA
const upload = multer({ dest: 'uploads/' })

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  try {
    if (!req.file.originalname) {
      return res.send("Something went wrong");
    }
    const { originalname, mimetype, size } = req.file;
    const fileMetaData = { name: originalname, type: mimetype, size };
    return res.send(fileMetaData);

  } catch (e) {
    res.send(e)
  }
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

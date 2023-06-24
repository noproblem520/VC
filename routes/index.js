var express = require('express');
var router = express.Router();
const multer = require('multer');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/updatepackages') // location where the files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // keeps the original file name
  }
});

const upload = multer({ storage: storage });

// POST API
router.post('/upload', upload.single('file'), (req, res) => {
  // check if file is provided
  try {
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
    } else {
      console.log('file received');
      return res.send({
        success: true
      })
    }
  } catch (e) {
    console.log(e);
  }

});

module.exports = router;

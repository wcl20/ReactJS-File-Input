const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const app = express()
app.use(cors());
const port = 8080;

// Storage
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => callback(null,  file.originalname)
});

// Upload
const upload = multer({
  storage: storage,
  // Validate file
  fileFilter: function(req, file, callback) {
    const mimetype = /jpeg|jpg|png|gif/.test(file.mimetype);
    if(mimetype) {
      callback(null, true);
    } else {
      callback("Invalid file type. Please select an image.");
    }
  }
}).array("images", 10);

app.post('/upload', (req, res) => {
  upload(req, res, function(err) {

    if (err instanceof multer.MulterError) {
      // Handle multer error
      res.status(400).send(err.code);
    } else if (err){
      // Handle unknown error
      res.status(400).send(err);
    } else {
      // Get files from from multipart/form-data
      console.log(req.files);
      res.status(200).end();
    }
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

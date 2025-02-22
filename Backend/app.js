const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000

// Database Instance
const db = require('./Services/DBConnectorService')();
const imagesDir = "../Interactive-Map/public/"
const resizedImageDir = "./Database/Files/ResizedImages"

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'Database/Images')));
console.log(path.join(__dirname, 'Database/Images/'));

app.get('/', (req, res) => {
  res.send('<h1>Image Server</h1><img src="2.png" />');
});

app.get('/events', (req, res) => {
  db.all('SELECT * FROM Event', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.send(rows)
    }
  });
})

// Route to handle image resizing via POST request
app.post('/resize', async (req, res) => {
  const { file_path, width, height } = req.body; // Get data from the request body

  console.log(!file_path, !width, !height);

  if (!file_path || !width || !height) {
    return res.status(400).send('Please provide imagePath, width, and height');
  }

  const imgPath = path.join(imagesDir, file_path);

  // Check if the file exists
  if (!fs.existsSync(imgPath)) {
    return res.status(404).send('Image not found');
  }

  const outputPath = path.join(resizedImagesDir, `resized_${path.basename(file_path)}`);

  try {
    // Resize the image and save it to the output path
    await sharp(imgPath)
      .resize(Number(width), Number(height))
      .toFile(imgPath);

    // Send a success response with the path of the resized image
    res.status(200).send({
      message: 'Image resized successfully!',
      resizedImagePath: outputPath
    });
  } catch (error) {
    res.status(500).send('Error resizing image: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
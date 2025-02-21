const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000

// Database Instance
const db = require('./Services/DBConnectorService')();

app.use(cors());

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
  const { imagePath, width, height } = req.body; // Get data from the request body

  if (!imagePath || !width || !height) {
    return res.status(400).send('Please provide imagePath, width, and height');
  }

  const imgPath = path.join(imagesDir, imagePath);

  // Check if the file exists
  if (!fs.existsSync(imgPath)) {
    return res.status(404).send('Image not found');
  }

  const outputPath = path.join(resizedImagesDir, `resized_${path.basename(imagePath)}`);

  try {
    // Resize the image and save it to the output path
    await sharp(imgPath)
      .resize(Number(width), Number(height))
      .toFile(outputPath); // Save the resized image to a new file

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
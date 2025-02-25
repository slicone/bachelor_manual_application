const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000

import { Event } from "./types/DTOs"

// Database Instance
const db = require('../Services/DBConnectorService')();
const imagesDir = "../Interactive-Map/public/"
const resizedImageDir = "./Database/Files/ResizedImages"

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../Database/Images')));

app.get('/events', (req, res) => {
  db.all('SELECT * FROM Event', [], (err, rows: Event) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.send(rows)
    }
  });
})

app.post("/event", (req, res) => {
  const event: Event = req.body;
  const stmt = db.prepare(`INSERT INTO Event (
    user_id, name, description, description_short, locationX, locationY, city, street, zip, fees, start_date, end_date, image_name
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  try {
  stmt.run(
    event.user_id,
    event.name,
    event.description,
    event.description_short,
    event.locationX,
    event.locationY,
    event.city,
    event.street,
    event.zip,
    event.fees,
    new Date(event.start_date).toISOString(),
    new Date(event.end_date).toISOString(), 
    event.image_name,
  );
  } catch (error) {
    let message = error instanceof RangeError ? error.message : error;
    res.status(400).send("Error adding event: " + message);
  }

  stmt.finalize();
  res.send("Event added successfully");
});

// Route to handle image resizing via POST request
app.post('/resize', async (req, res) => {
  const { file_path, width, height } = req.body; // Get data from the request body

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
  console.log(`listening on port ${port}`)
})
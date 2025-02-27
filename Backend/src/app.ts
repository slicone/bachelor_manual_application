const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000

import { Event } from "./types/DTOs"
import sqlite3 from "sqlite3";

// Database Instance
const db = require('../Services/DBConnectorService')();

app.use(cors());
app.use(bodyParser.json());


// Image
const imagePath = path.join(__dirname, '../Database/Images');

app.use('/images', express.static(imagePath));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9); 
    cb(null, uniqueName + fileExtension); 
  }
});

const upload = multer({ storage });

app.post("/image/upload", upload.array("images"), (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const fileNames = req.files.map((file: any) => file.filename);

  console.log(req.body);
  console.log(req.body.eventId);
  console.log(fileNames);

  let eventId = req.body.eventId;

  if (eventId !== null && eventId !== undefined) {
    insertImagesIntoDB(fileNames, eventId);
  }
  
  res.json({
    message: "Files uploaded successfully",
    files: fileNames,
  });
});

function insertImagesIntoDB(fileNames: string[], eventId: number) {
  const query = `INSERT INTO Image (event_id, file_path) VALUES (?, ?)`;
  // TODO Fehlerbehandlung
  fileNames.forEach((fileName) => {
    db.run(query, [eventId, fileName], (err: Error) => {
      if (err) {
        console.log(err);
      }
    });
  });
}


app.get('/events', (req, res) => {
  db.all('SELECT * FROM Event', [], (err, rows: Event) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.send(rows)
    }
  });
})


// Event
app.post("/event", async (req, res) => {
  const event: Event = req.body;
  const query = `INSERT INTO Event (
    user_id, name, description, description_short, locationX, locationY, city, street, zip, fees, start_date, end_date, image_name
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    const values = [
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
    ]

    let eventId = new Promise<number>((resolve, reject) => {
      db.run(query, values, function (this: sqlite3.RunResult, err) {
        if(err) {
          reject(err);
        }
        resolve(this.lastID);
      });
    });

    eventId.then((id: number) => {
      res.json({
        message: "Event added successfully", 
        eventId: id
      });
    }).catch((error) => {
      throw new Error(error);
    });
    
  } catch (error) {
    let message = error instanceof RangeError ? error.message : error;
    console.log(error);
    res.status(400).json({
      message: message, 
    });
  }
});


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
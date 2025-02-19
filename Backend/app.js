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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
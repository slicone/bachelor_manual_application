const sqlite3 = require('sqlite3').verbose();

// Connect to (or create) the database file
const db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

db.serialize(() => {
    const stmt = db.prepare(`INSERT INTO Event (
        user_id, name, description, description_short, locationX, locationY, city, street, zip, fees, start_date, end_date, file_path_main
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

        // Sample data
    const events = [
        {
        user_id: 1,
        name: "Concert Night",
        description: "An amazing live concert featuring top artists.",
        description_short: "Live concert",
        locationX: 40.7128,
        locationY: -74.0060,
        city: "New York",
        street: "5th Avenue",
        zip: 10001,
        fees: 25.50,
        start_date: "2025-03-01T19:00:00",
        end_date: "2025-03-01T22:00:00",
        file_path_main: "/images/concert.jpg"
        },
        {
        user_id: 2,
        name: "Art Expo",
        description: "An exhibition of modern art from emerging artists.",
        description_short: "Modern art expo",
        locationX: 34.0522,
        locationY: -118.2437,
        city: "Los Angeles",
        street: "Sunset Boulevard",
        zip: 90028,
        fees: 15.00,
        start_date: "2025-04-15T10:00:00",
        end_date: "2025-04-15T17:00:00",
        file_path_main: "/images/artexpo.jpg"
        },
        {
        user_id: 3,
        name: "Tech Meetup",
        description: "A meetup for tech enthusiasts to network and share ideas.",
        description_short: "Tech chat",
        locationX: 37.7749,
        locationY: -122.4194,
        city: "San Francisco",
        street: "Market Street",
        zip: 94103,
        fees: 0.00,
        start_date: "2025-05-10T18:00:00",
        end_date: "2025-05-10T20:00:00",
        file_path_main: "/images/techmeetup.jpg"
        }
    ];

    events.forEach(event => {
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
          event.start_date,
          event.end_date,
          event.file_path_main,
        );
      });
    stmt.finalize();
});
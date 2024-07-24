// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Helper function to check if date is valid
const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

// Your first API endpoint...
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;

  // Check if date parameter exists
  if (!dateParam) {
    date = new Date();
  } else {
    // Try parsing dateParam as a number first (for Unix timestamps)
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Validate date
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  // Return the response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

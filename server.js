// server.js
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

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  let date = null;

  if (!req.params.date) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  }

  if (Number(req.params.date)) {
    if (String(req.params.date).length === 13) {
      try {
        date = new Date(Number(req.params.date));
      } catch {
        return res.json({
          error: "Invalid Date",
        });
      }
    } else {
      return res.json({
        error: "Invalid Date",
      });
    }
  } else {
    try {
      date = new Date(req.params.date);
    } catch {
      return res.json({
        error: "Invalid Date",
      });
    }
  }

  if (date.toString() === "Invalid Date" || isNaN(date) || !date) {
    return res.json({
      error: "Invalid Date",
    });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

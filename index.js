// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// here
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api", function (req, res) {
  let [currentUnix, currentUtc] = [new Date().getTime(), new Date().toUTCString()];
  res.json({"unix": currentUnix, "utc": currentUtc});
});

app.get("/api/:date_value", (req, res) => {
  let dateString = req.params.date_value;
  let unixPattern = /\d{5,}/;
    if (unixPattern.test(dateString)) {
      let date_number = parseInt(dateString);
      res.json({"unix": date_number, "utc": new Date(date_number).toUTCString()});
    } else {
      let inputDate = new Date(dateString);
      if (inputDate.toString() === "Invalid Date") {
        res.json({error: "Invalid Date"});
      } else {
        res.json({"unix": inputDate.getTime(), "utc": inputDate.toUTCString()});
      };
    };
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

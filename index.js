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

app.get("/api/:date?", (req, res) => {
  let dateStr = req.params.date;
  let date;
  if (!dateStr)
  {
    date = new Date().toUTCString();
    res.json({
      "unix": Date.parse(date),
      "utc": date
    });
  }
  else if (/^\d+$/.test(dateStr))
  {
    date = new Date(Number(dateStr)).toUTCString();
    res.json({
      "unix": Date.parse(date),
      "utc": date
    });
  }
  else 
  {
    if (isNaN(Date.parse(dateStr)))
    {
      res.json({"error": "Invalid Date"});
    }
    else 
    {
      date = Date.parse(dateStr);
      res.json({
        "unix": date,
        "utc": new Date(date).toUTCString()
      });
    }
  }
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

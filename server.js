// server.js
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  //var unix = Date.UTC(Date);
  //console.log(unix);
  var param = req.params.date;
  var d = new Date(param);
  //console.log(typeof (req.params.date)) ;
  
  if(param === undefined) d = new Date();
  else if(isNaN(d.getTime())) d = new Date(Number(param));

  if(isNaN(d.getTime()))
  {
     res.json({
       error : "Invalid Date"
    });
  }else{
    /*
    console.log("==========");
    console.log("Parameters Date | " +typeof(req.params.date) + " | " +(req.params.date)  +  " | " + d.getTime());
    console.log("Converted Date | " + d);
    */
    //if(d == null) d = new Date(Number(req.params.data));
    var d_utc = d.toUTCString();
    var d_unix = Date.UTC(d.getUTCFullYear() , d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
    /*
    console.log("Raw : Y " +d.getUTCFullYear()  + " | M " + d.getUTCMonth() + " | D " + d.getUTCDate() );
    console.log("UNIX : " + d_unix);
    console.log("UTC : " + d_utc);
    */
    res.json({
        unix  : d_unix,
        utc   : d_utc,
      });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

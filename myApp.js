let express = require('express');
let app = express();

htmlName = __dirname + "/views/BusinessLogin.html"
app.get("/", function(req, res) {
  res.sendFile(htmlName);
const mySecret = process.env['MESSAGE_STYLE']
})

styleName = __dirname + "/public"
app.use("/public", express.static(styleName))

app.get("/json", function(req, res) {
  var response = {"message": "Hello json"};
  if(process.env.MESSAGE_STYLE === "uppercase") {
    response.message = response.message.toUpperCase();
  }
  return res.json(response);
  
})

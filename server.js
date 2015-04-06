var qs         = require("querystring")
var fs         = require("fs")
var express    = require("express")
var bodyParser = require("body-parser")
var app        = express()
var mainHTML   = fs.readFileSync("./templates/main.html", {encoding: "utf8"})
var printHTML  = fs.readFileSync("./templates/print.html", {encoding: "utf8"})

var PORT = process.ENV.PORT || 4004

function serveMain (req, res) {
  return res.send(mainHTML)
}

function servePrint (req, res) {
  return res.send(printHTML)
}

function sendPrintDetails (req, res) {
  var phrases = req.body.phrases.replace(/\r/g, "").split("\n") || []
  var count   = req.body.count
  var freeUrl = req.body.freeUrl

  var querystring = qs.stringify({
    phrases: phrases || undefined,
    count:   count || undefined,
    freeUrl: freeUrl ? encodeURIComponent(freeUrl) : undefined
  })

  res.redirect("/print?" + querystring)
}

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.post("/", sendPrintDetails)
app.get("/", serveMain)
app.get("/print", servePrint)

app.listen(PORT)

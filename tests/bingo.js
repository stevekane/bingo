var test    = require("tape")
var Card    = require("../src/Card")
var phrases = require("../phrases.json").phrases

test("Card returns a 2x2 array containing the phrases provided", function (t) {
  var c = new Card(phrases)

  t.plan(4)
  console.log(c)
  t.same(phrases.length, 24, "24 phrases found")
  t.same(c.width, 5)
  t.same(c.height, 5)
  t.same(c.data[2][2], "Free Space", "Free space found at center")
})

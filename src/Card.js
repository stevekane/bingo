var NDArray = require("./NDArray")

module.exports = Card

/* A card is a 2x2 array of tiles that contains tiles.  The tiles are
 * created by referencing a list of phrases and randomly assigning 
 * each tile to one of the phrases.  As phrases are used, they are removed
 * from the list of phrases available for other tiles.  
 */
function Card (phrases) {
  var tiles     = new NDArray(5, 5, "")
  var available = phrases.slice(0)
  var used      = []
  var row

  //skip the center tile only
  for (var i = 0; i < tiles.width; i++) {
    for (var j = 0; j < tiles.height; j++) {
      if (i === 2 && j === 2) tiles.data[i][j] = "Free Space"
      else                    tiles.data[i][j] = selectPhrase(available, used)
    }
  }
  return tiles
}

// mutates two provided arrays and returns the selected word
function selectPhrase (available, used) {
  if (available.length <= 0) throw new Error("no available phrase")

  var index = ~~(Math.random() * available.length)
  var word  = available[index]

  used.push(word)
  available.splice(index, 1)
  return word
}

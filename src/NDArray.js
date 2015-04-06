module.exports = NDArray

function NDArray (width, height, initialVal) {
  var ar = [] 

  for (var i = 0; i < width; i++) {
    ar.push(new Array(height))
    for (var j = 0; j < height; j++) {
      ar[i][j] = initialVal
    } 
  }
  this.width  = width
  this.height = height
  this.data   = ar
}


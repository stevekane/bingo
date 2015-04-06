(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],3:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":1,"./encode":2}],4:[function(require,module,exports){
module.exports={
  "phrases": [
    "Traveled to at least 3 different countries",
    "Same birthday month as yours",
    "Owned a pet other than a dog or cat",
    "Seen a Broadway musical",
    "Been on TV",
    "Attended a pro-sports game",
    "Baked a cake",
    "Has gone paintballing",
    "Can speak another language fluently",
    "Plays a musical instrument",
    "Had braces when younger",
    "Is left-handed",
    "Has ever owned a Motorola phone",
    "Broken a bone",
    "Can rub their stomach and pat their head at the same time",
    "Can say 'rubber baby buggy bumper' 5 times fast",
    "Wears the same shoe size as you",
    "Been to a concert in the past month",
    "Read all the Harry Potter books",
    "Taken martial arts classes",
    "Gone skydiving",
    "Is the youngest sibling",
    "Can ski or snowboard",
    "Played a sport in high school"
  ]
}

},{}],5:[function(require,module,exports){
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

},{"./NDArray":6}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
var qs         = require("querystring")
var R          = require("react")
var Card       = require("./Card")
var NDArray    = require("./NDArray")
var phraseJSON = require("../phrases.json")
var div        = R.DOM.div
var ul         = R.DOM.ul
var li         = R.DOM.li
var tr         = R.DOM.tr
var td         = R.DOM.td
var th         = R.DOM.th
var table      = R.DOM.table


var qsParams  = qs.parse(window.location.search.replace("?", ""))
var phrases   = qsParams.phrases || phraseJSON.phrases
var cardCount = qsParams.count || 0
var freeUrl   = qsParams.freeUrl || "http://acsspirit.com/walkietalkieimages/jpg/Motorola_Vert.jpg"
var cards     = new Array(cardCount)

for (var i = 0; i < cardCount; i++) {
  cards[i] = new Card(phrases)
}

//1in = 96px
//width = 96 * 8.5 = 816
//height = 96 * 5.5 = 528
//cell height = 88px

var cellStyles = {
  border:   "1px solid black",
  padding:  "8px",
  width:    "163px",
  height:   "88px",
  overflow: "wrap",
  wordWrap: "break-word",
  fontSize: "16px",
  fontFamily: "Ariel, Helvetica, sans-serif"
}

var starStyles = {
  backgroundImage: freeUrl ? "url(" + freeUrl + ")" : null,
  backgroundRepeat: "no-repeat",
  backgroundSize:   "contain",
  backgroundPosition: "center",
  fontWeight:         "bold",
  fontSize:           "18px"
}

var headerStyles = {
  width:    "163",
  height:   "88px",
  paddingTop: "16px",
  fontSize: "56px",
  textAlign: "center",
  fontFamily: "Impact, Charcoal, sans-serif"
}

var headerBlockStyles = {
  borderTop: "1px solid black",
  borderLeft: "1px solid black",
  borderRight: "1px solid black",
  backgroundColor: "rgba(224, 224, 224, 0.7)"
}

var tableStyles = {
  borderCollapse: "collapse",
  tableLayout: "fixed",
  width:       "816px",
  height:      "528px",
  textAlign:   "center"
}

var CardComponent = R.createClass({
  render: function () {
    var card   = this.props.card

    return table({style: tableStyles}, [
      tr({key: 0, style: headerBlockStyles}, [
        th({key: 1, style: headerStyles}, "B"),
        th({key: 2, style: headerStyles}, "I"),
        th({key: 3, style: headerStyles}, "N"),
        th({key: 4, style: headerStyles}, "G"),
        th({key: 5, style: headerStyles}, "O")
      ]),
      tr({key: 1}, [
        td({key: 1, style: cellStyles}, card.data[0][0]),
        td({key: 2, style: cellStyles}, card.data[1][0]),
        td({key: 3, style: cellStyles}, card.data[2][0]),
        td({key: 4, style: cellStyles}, card.data[3][0]),
        td({key: 5, style: cellStyles}, card.data[4][0])
      ]),
      tr({key: 2}, [
        td({key: 1, style: cellStyles}, card.data[0][1]),
        td({key: 2, style: cellStyles}, card.data[1][1]),
        td({key: 3, style: cellStyles}, card.data[2][1]),
        td({key: 4, style: cellStyles}, card.data[3][1]),
        td({key: 5, style: cellStyles}, card.data[4][1])
      ]),
      tr({key: 3}, [
        td({key: 1, style: cellStyles}, card.data[0][2]),
        td({key: 2, style: cellStyles}, card.data[1][2]),
        td({key: 3, style: starStyles}, freeUrl ? "" : "Free Space"),
        td({key: 4, style: cellStyles}, card.data[3][2]),
        td({key: 5, style: cellStyles}, card.data[4][2])
      ]),
      tr({key: 4}, [
        td({key: 1, style: cellStyles}, card.data[0][3]),
        td({key: 2, style: cellStyles}, card.data[1][3]),
        td({key: 3, style: cellStyles}, card.data[2][3]),
        td({key: 4, style: cellStyles}, card.data[3][3]),
        td({key: 5, style: cellStyles}, card.data[4][3])
      ]),
      tr({key: 5}, [
        td({key: 1, style: cellStyles}, card.data[0][4]),
        td({key: 2, style: cellStyles}, card.data[1][4]),
        td({key: 3, style: cellStyles}, card.data[2][4]),
        td({key: 4, style: cellStyles}, card.data[3][4]),
        td({key: 5, style: cellStyles}, card.data[4][4])
      ]) 
    ])
  }
})

var CardFactory = R.createFactory(CardComponent)

var listStyles = {
  padding: "0px",
  margin:  "0px"
}

var itemStyles = {
  margin: "0px",
  padding: "0px",
  height: "1056px"
}

var CardList = R.createClass({
  render: function () {
    var cards = this.props.cards

    return ul({style: listStyles}, cards.map(function (card, i) {
      return li({key: i, style: itemStyles}, CardFactory({card: card}))
    }))
  }
})

var CardListFactory = R.createFactory(CardList)

R.render(CardListFactory({cards: cards}), document.body)

},{"../phrases.json":4,"./Card":5,"./NDArray":6,"querystring":3,"react":"react"}]},{},[7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9pbmRleC5qcyIsInBocmFzZXMuanNvbiIsInNyYy9DYXJkLmpzIiwic3JjL05EQXJyYXkuanMiLCJzcmMvYmluZ28uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gbWFwKG9ialtrXSwgZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuZnVuY3Rpb24gbWFwICh4cywgZikge1xuICBpZiAoeHMubWFwKSByZXR1cm4geHMubWFwKGYpO1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICByZXMucHVzaChmKHhzW2ldLCBpKSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmRlY29kZSA9IGV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL2RlY29kZScpO1xuZXhwb3J0cy5lbmNvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwicGhyYXNlc1wiOiBbXG4gICAgXCJUcmF2ZWxlZCB0byBhdCBsZWFzdCAzIGRpZmZlcmVudCBjb3VudHJpZXNcIixcbiAgICBcIlNhbWUgYmlydGhkYXkgbW9udGggYXMgeW91cnNcIixcbiAgICBcIk93bmVkIGEgcGV0IG90aGVyIHRoYW4gYSBkb2cgb3IgY2F0XCIsXG4gICAgXCJTZWVuIGEgQnJvYWR3YXkgbXVzaWNhbFwiLFxuICAgIFwiQmVlbiBvbiBUVlwiLFxuICAgIFwiQXR0ZW5kZWQgYSBwcm8tc3BvcnRzIGdhbWVcIixcbiAgICBcIkJha2VkIGEgY2FrZVwiLFxuICAgIFwiSGFzIGdvbmUgcGFpbnRiYWxsaW5nXCIsXG4gICAgXCJDYW4gc3BlYWsgYW5vdGhlciBsYW5ndWFnZSBmbHVlbnRseVwiLFxuICAgIFwiUGxheXMgYSBtdXNpY2FsIGluc3RydW1lbnRcIixcbiAgICBcIkhhZCBicmFjZXMgd2hlbiB5b3VuZ2VyXCIsXG4gICAgXCJJcyBsZWZ0LWhhbmRlZFwiLFxuICAgIFwiSGFzIGV2ZXIgb3duZWQgYSBNb3Rvcm9sYSBwaG9uZVwiLFxuICAgIFwiQnJva2VuIGEgYm9uZVwiLFxuICAgIFwiQ2FuIHJ1YiB0aGVpciBzdG9tYWNoIGFuZCBwYXQgdGhlaXIgaGVhZCBhdCB0aGUgc2FtZSB0aW1lXCIsXG4gICAgXCJDYW4gc2F5ICdydWJiZXIgYmFieSBidWdneSBidW1wZXInIDUgdGltZXMgZmFzdFwiLFxuICAgIFwiV2VhcnMgdGhlIHNhbWUgc2hvZSBzaXplIGFzIHlvdVwiLFxuICAgIFwiQmVlbiB0byBhIGNvbmNlcnQgaW4gdGhlIHBhc3QgbW9udGhcIixcbiAgICBcIlJlYWQgYWxsIHRoZSBIYXJyeSBQb3R0ZXIgYm9va3NcIixcbiAgICBcIlRha2VuIG1hcnRpYWwgYXJ0cyBjbGFzc2VzXCIsXG4gICAgXCJHb25lIHNreWRpdmluZ1wiLFxuICAgIFwiSXMgdGhlIHlvdW5nZXN0IHNpYmxpbmdcIixcbiAgICBcIkNhbiBza2kgb3Igc25vd2JvYXJkXCIsXG4gICAgXCJQbGF5ZWQgYSBzcG9ydCBpbiBoaWdoIHNjaG9vbFwiXG4gIF1cbn1cbiIsInZhciBOREFycmF5ID0gcmVxdWlyZShcIi4vTkRBcnJheVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhcmRcblxuLyogQSBjYXJkIGlzIGEgMngyIGFycmF5IG9mIHRpbGVzIHRoYXQgY29udGFpbnMgdGlsZXMuICBUaGUgdGlsZXMgYXJlXG4gKiBjcmVhdGVkIGJ5IHJlZmVyZW5jaW5nIGEgbGlzdCBvZiBwaHJhc2VzIGFuZCByYW5kb21seSBhc3NpZ25pbmcgXG4gKiBlYWNoIHRpbGUgdG8gb25lIG9mIHRoZSBwaHJhc2VzLiAgQXMgcGhyYXNlcyBhcmUgdXNlZCwgdGhleSBhcmUgcmVtb3ZlZFxuICogZnJvbSB0aGUgbGlzdCBvZiBwaHJhc2VzIGF2YWlsYWJsZSBmb3Igb3RoZXIgdGlsZXMuICBcbiAqL1xuZnVuY3Rpb24gQ2FyZCAocGhyYXNlcykge1xuICB2YXIgdGlsZXMgICAgID0gbmV3IE5EQXJyYXkoNSwgNSwgXCJcIilcbiAgdmFyIGF2YWlsYWJsZSA9IHBocmFzZXMuc2xpY2UoMClcbiAgdmFyIHVzZWQgICAgICA9IFtdXG4gIHZhciByb3dcblxuICAvL3NraXAgdGhlIGNlbnRlciB0aWxlIG9ubHlcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aWxlcy53aWR0aDsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aWxlcy5oZWlnaHQ7IGorKykge1xuICAgICAgaWYgKGkgPT09IDIgJiYgaiA9PT0gMikgdGlsZXMuZGF0YVtpXVtqXSA9IFwiRnJlZSBTcGFjZVwiXG4gICAgICBlbHNlICAgICAgICAgICAgICAgICAgICB0aWxlcy5kYXRhW2ldW2pdID0gc2VsZWN0UGhyYXNlKGF2YWlsYWJsZSwgdXNlZClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRpbGVzXG59XG5cbi8vIG11dGF0ZXMgdHdvIHByb3ZpZGVkIGFycmF5cyBhbmQgcmV0dXJucyB0aGUgc2VsZWN0ZWQgd29yZFxuZnVuY3Rpb24gc2VsZWN0UGhyYXNlIChhdmFpbGFibGUsIHVzZWQpIHtcbiAgaWYgKGF2YWlsYWJsZS5sZW5ndGggPD0gMCkgdGhyb3cgbmV3IEVycm9yKFwibm8gYXZhaWxhYmxlIHBocmFzZVwiKVxuXG4gIHZhciBpbmRleCA9IH5+KE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGUubGVuZ3RoKVxuICB2YXIgd29yZCAgPSBhdmFpbGFibGVbaW5kZXhdXG5cbiAgdXNlZC5wdXNoKHdvcmQpXG4gIGF2YWlsYWJsZS5zcGxpY2UoaW5kZXgsIDEpXG4gIHJldHVybiB3b3JkXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE5EQXJyYXlcblxuZnVuY3Rpb24gTkRBcnJheSAod2lkdGgsIGhlaWdodCwgaW5pdGlhbFZhbCkge1xuICB2YXIgYXIgPSBbXSBcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICBhci5wdXNoKG5ldyBBcnJheShoZWlnaHQpKVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspIHtcbiAgICAgIGFyW2ldW2pdID0gaW5pdGlhbFZhbFxuICAgIH0gXG4gIH1cbiAgdGhpcy53aWR0aCAgPSB3aWR0aFxuICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICB0aGlzLmRhdGEgICA9IGFyXG59XG5cbiIsInZhciBxcyAgICAgICAgID0gcmVxdWlyZShcInF1ZXJ5c3RyaW5nXCIpXG52YXIgUiAgICAgICAgICA9IHJlcXVpcmUoXCJyZWFjdFwiKVxudmFyIENhcmQgICAgICAgPSByZXF1aXJlKFwiLi9DYXJkXCIpXG52YXIgTkRBcnJheSAgICA9IHJlcXVpcmUoXCIuL05EQXJyYXlcIilcbnZhciBwaHJhc2VKU09OID0gcmVxdWlyZShcIi4uL3BocmFzZXMuanNvblwiKVxudmFyIGRpdiAgICAgICAgPSBSLkRPTS5kaXZcbnZhciB1bCAgICAgICAgID0gUi5ET00udWxcbnZhciBsaSAgICAgICAgID0gUi5ET00ubGlcbnZhciB0ciAgICAgICAgID0gUi5ET00udHJcbnZhciB0ZCAgICAgICAgID0gUi5ET00udGRcbnZhciB0aCAgICAgICAgID0gUi5ET00udGhcbnZhciB0YWJsZSAgICAgID0gUi5ET00udGFibGVcblxuXG52YXIgcXNQYXJhbXMgID0gcXMucGFyc2Uod2luZG93LmxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKFwiP1wiLCBcIlwiKSlcbnZhciBwaHJhc2VzICAgPSBxc1BhcmFtcy5waHJhc2VzIHx8IHBocmFzZUpTT04ucGhyYXNlc1xudmFyIGNhcmRDb3VudCA9IHFzUGFyYW1zLmNvdW50IHx8IDBcbnZhciBmcmVlVXJsICAgPSBxc1BhcmFtcy5mcmVlVXJsIHx8IFwiaHR0cDovL2Fjc3NwaXJpdC5jb20vd2Fsa2lldGFsa2llaW1hZ2VzL2pwZy9Nb3Rvcm9sYV9WZXJ0LmpwZ1wiXG52YXIgY2FyZHMgICAgID0gbmV3IEFycmF5KGNhcmRDb3VudClcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBjYXJkQ291bnQ7IGkrKykge1xuICBjYXJkc1tpXSA9IG5ldyBDYXJkKHBocmFzZXMpXG59XG5cbi8vMWluID0gOTZweFxuLy93aWR0aCA9IDk2ICogOC41ID0gODE2XG4vL2hlaWdodCA9IDk2ICogNS41ID0gNTI4XG4vL2NlbGwgaGVpZ2h0ID0gODhweFxuXG52YXIgY2VsbFN0eWxlcyA9IHtcbiAgYm9yZGVyOiAgIFwiMXB4IHNvbGlkIGJsYWNrXCIsXG4gIHBhZGRpbmc6ICBcIjhweFwiLFxuICB3aWR0aDogICAgXCIxNjNweFwiLFxuICBoZWlnaHQ6ICAgXCI4OHB4XCIsXG4gIG92ZXJmbG93OiBcIndyYXBcIixcbiAgd29yZFdyYXA6IFwiYnJlYWstd29yZFwiLFxuICBmb250U2l6ZTogXCIxNnB4XCIsXG4gIGZvbnRGYW1pbHk6IFwiQXJpZWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZlwiXG59XG5cbnZhciBzdGFyU3R5bGVzID0ge1xuICBiYWNrZ3JvdW5kSW1hZ2U6IGZyZWVVcmwgPyBcInVybChcIiArIGZyZWVVcmwgKyBcIilcIiA6IG51bGwsXG4gIGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCIsXG4gIGJhY2tncm91bmRTaXplOiAgIFwiY29udGFpblwiLFxuICBiYWNrZ3JvdW5kUG9zaXRpb246IFwiY2VudGVyXCIsXG4gIGZvbnRXZWlnaHQ6ICAgICAgICAgXCJib2xkXCIsXG4gIGZvbnRTaXplOiAgICAgICAgICAgXCIxOHB4XCJcbn1cblxudmFyIGhlYWRlclN0eWxlcyA9IHtcbiAgd2lkdGg6ICAgIFwiMTYzXCIsXG4gIGhlaWdodDogICBcIjg4cHhcIixcbiAgcGFkZGluZ1RvcDogXCIxNnB4XCIsXG4gIGZvbnRTaXplOiBcIjU2cHhcIixcbiAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICBmb250RmFtaWx5OiBcIkltcGFjdCwgQ2hhcmNvYWwsIHNhbnMtc2VyaWZcIlxufVxuXG52YXIgaGVhZGVyQmxvY2tTdHlsZXMgPSB7XG4gIGJvcmRlclRvcDogXCIxcHggc29saWQgYmxhY2tcIixcbiAgYm9yZGVyTGVmdDogXCIxcHggc29saWQgYmxhY2tcIixcbiAgYm9yZGVyUmlnaHQ6IFwiMXB4IHNvbGlkIGJsYWNrXCIsXG4gIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDIyNCwgMjI0LCAyMjQsIDAuNylcIlxufVxuXG52YXIgdGFibGVTdHlsZXMgPSB7XG4gIGJvcmRlckNvbGxhcHNlOiBcImNvbGxhcHNlXCIsXG4gIHRhYmxlTGF5b3V0OiBcImZpeGVkXCIsXG4gIHdpZHRoOiAgICAgICBcIjgxNnB4XCIsXG4gIGhlaWdodDogICAgICBcIjUyOHB4XCIsXG4gIHRleHRBbGlnbjogICBcImNlbnRlclwiXG59XG5cbnZhciBDYXJkQ29tcG9uZW50ID0gUi5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYXJkICAgPSB0aGlzLnByb3BzLmNhcmRcblxuICAgIHJldHVybiB0YWJsZSh7c3R5bGU6IHRhYmxlU3R5bGVzfSwgW1xuICAgICAgdHIoe2tleTogMCwgc3R5bGU6IGhlYWRlckJsb2NrU3R5bGVzfSwgW1xuICAgICAgICB0aCh7a2V5OiAxLCBzdHlsZTogaGVhZGVyU3R5bGVzfSwgXCJCXCIpLFxuICAgICAgICB0aCh7a2V5OiAyLCBzdHlsZTogaGVhZGVyU3R5bGVzfSwgXCJJXCIpLFxuICAgICAgICB0aCh7a2V5OiAzLCBzdHlsZTogaGVhZGVyU3R5bGVzfSwgXCJOXCIpLFxuICAgICAgICB0aCh7a2V5OiA0LCBzdHlsZTogaGVhZGVyU3R5bGVzfSwgXCJHXCIpLFxuICAgICAgICB0aCh7a2V5OiA1LCBzdHlsZTogaGVhZGVyU3R5bGVzfSwgXCJPXCIpXG4gICAgICBdKSxcbiAgICAgIHRyKHtrZXk6IDF9LCBbXG4gICAgICAgIHRkKHtrZXk6IDEsIHN0eWxlOiBjZWxsU3R5bGVzfSwgY2FyZC5kYXRhWzBdWzBdKSxcbiAgICAgICAgdGQoe2tleTogMiwgc3R5bGU6IGNlbGxTdHlsZXN9LCBjYXJkLmRhdGFbMV1bMF0pLFxuICAgICAgICB0ZCh7a2V5OiAzLCBzdHlsZTogY2VsbFN0eWxlc30sIGNhcmQuZGF0YVsyXVswXSksXG4gICAgICAgIHRkKHtrZXk6IDQsIHN0eWxlOiBjZWxsU3R5bGVzfSwgY2FyZC5kYXRhWzNdWzBdKSxcbiAgICAgICAgdGQoe2tleTogNSwgc3R5bGU6IGNlbGxTdHlsZXN9LCBjYXJkLmRhdGFbNF1bMF0pXG4gICAgICBdKSxcbiAgICAgIHRyKHtrZXk6IDJ9LCBbXG4gICAgICAgIHRkKHtrZXk6IDEsIHN0eWxlOiBjZWxsU3R5bGVzfSwgY2FyZC5kYXRhWzBdWzFdKSxcbiAgICAgICAgdGQoe2tleTogMiwgc3R5bGU6IGNlbGxTdHlsZXN9LCBjYXJkLmRhdGFbMV1bMV0pLFxuICAgICAgICB0ZCh7a2V5OiAzLCBzdHlsZTogY2VsbFN0eWxlc30sIGNhcmQuZGF0YVsyXVsxXSksXG4gICAgICAgIHRkKHtrZXk6IDQsIHN0eWxlOiBjZWxsU3R5bGVzfSwgY2FyZC5kYXRhWzNdWzFdKSxcbiAgICAgICAgdGQoe2tleTogNSwgc3R5bGU6IGNlbGxTdHlsZXN9LCBjYXJkLmRhdGFbNF1bMV0pXG4gICAgICBdKSxcbiAgICAgIHRyKHtrZXk6IDN9LCBbXG4gICAgICAgIHRkKHtrZXk6IDEsIHN0eWxlOiBjZWxsU3R5bGVzfSwgY2FyZC5kYXRhWzBdWzJdKSxcbiAgICAgICAgdGQoe2tleTogMiwgc3R5bGU6IGNlbGxTdHlsZXN9LCBjYXJkLmRhdGFbMV1bMl0pLFxuICAgICAgICB0ZCh7a2V5OiAzLCBzdHlsZTogc3RhclN0eWxlc30sIGZyZWVVcmwgPyBcIlwiIDogXCJGcmVlIFNwYWNlXCIpLFxuICAgICAgICB0ZCh7a2V5OiA0LCBzdHlsZTogY2VsbFN0eWxlc30sIGNhcmQuZGF0YVszXVsyXSksXG4gICAgICAgIHRkKHtrZXk6IDUsIHN0eWxlOiBjZWxsU3R5bGVzfSwgY2FyZC5kYXRhWzRdWzJdKVxuICAgICAgXSksXG4gICAgICB0cih7a2V5OiA0fSwgW1xuICAgICAgICB0ZCh7a2V5OiAxLCBzdHlsZTogY2VsbFN0eWxlc30sIGNhcmQuZGF0YVswXVszXSksXG4gICAgICAgIHRkKHtrZXk6IDIsIHN0eWxlOiBjZWxsU3R5bGVzfSwgY2FyZC5kYXRhWzFdWzNdKSxcbiAgICAgICAgdGQoe2tleTogMywgc3R5bGU6IGNlbGxTdHlsZXN9LCBjYXJkLmRhdGFbMl1bM10pLFxuICAgICAgICB0ZCh7a2V5OiA0LCBzdHlsZTogY2VsbFN0eWxlc30sIGNhcmQuZGF0YVszXVszXSksXG4gICAgICAgIHRkKHtrZXk6IDUsIHN0eWxlOiBjZWxsU3R5bGVzfSwgY2FyZC5kYXRhWzRdWzNdKVxuICAgICAgXSksXG4gICAgICB0cih7a2V5OiA1fSwgW1xuICAgICAgICB0ZCh7a2V5OiAxLCBzdHlsZTogY2VsbFN0eWxlc30sIGNhcmQuZGF0YVswXVs0XSksXG4gICAgICAgIHRkKHtrZXk6IDIsIHN0eWxlOiBjZWxsU3R5bGVzfSwgY2FyZC5kYXRhWzFdWzRdKSxcbiAgICAgICAgdGQoe2tleTogMywgc3R5bGU6IGNlbGxTdHlsZXN9LCBjYXJkLmRhdGFbMl1bNF0pLFxuICAgICAgICB0ZCh7a2V5OiA0LCBzdHlsZTogY2VsbFN0eWxlc30sIGNhcmQuZGF0YVszXVs0XSksXG4gICAgICAgIHRkKHtrZXk6IDUsIHN0eWxlOiBjZWxsU3R5bGVzfSwgY2FyZC5kYXRhWzRdWzRdKVxuICAgICAgXSkgXG4gICAgXSlcbiAgfVxufSlcblxudmFyIENhcmRGYWN0b3J5ID0gUi5jcmVhdGVGYWN0b3J5KENhcmRDb21wb25lbnQpXG5cbnZhciBsaXN0U3R5bGVzID0ge1xuICBwYWRkaW5nOiBcIjBweFwiLFxuICBtYXJnaW46ICBcIjBweFwiXG59XG5cbnZhciBpdGVtU3R5bGVzID0ge1xuICBtYXJnaW46IFwiMHB4XCIsXG4gIHBhZGRpbmc6IFwiMHB4XCIsXG4gIGhlaWdodDogXCIxMDU2cHhcIlxufVxuXG52YXIgQ2FyZExpc3QgPSBSLmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhcmRzID0gdGhpcy5wcm9wcy5jYXJkc1xuXG4gICAgcmV0dXJuIHVsKHtzdHlsZTogbGlzdFN0eWxlc30sIGNhcmRzLm1hcChmdW5jdGlvbiAoY2FyZCwgaSkge1xuICAgICAgcmV0dXJuIGxpKHtrZXk6IGksIHN0eWxlOiBpdGVtU3R5bGVzfSwgQ2FyZEZhY3Rvcnkoe2NhcmQ6IGNhcmR9KSlcbiAgICB9KSlcbiAgfVxufSlcblxudmFyIENhcmRMaXN0RmFjdG9yeSA9IFIuY3JlYXRlRmFjdG9yeShDYXJkTGlzdClcblxuUi5yZW5kZXIoQ2FyZExpc3RGYWN0b3J5KHtjYXJkczogY2FyZHN9KSwgZG9jdW1lbnQuYm9keSlcbiJdfQ==

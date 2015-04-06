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

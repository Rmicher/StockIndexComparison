// TODO: stockDetails needs replaced with API data

var stockDetails = [
	{
		"ticker": "AAPL", 
		"price": "115.04"
	}, 
	{
		"ticker": "GOOG", 
		"price": "1641.00"}, 
	{
		"ticker": "FB",
		"price": "284.79"
	}
];

// // Append the stock options to the dropdown
// var dropdown = document.getElementById("selectStock");
// for (var i = 0; i < stockDetails.length; i++) {
//   var stock = stockDetails[i].ticker;
//   var option = document.createElement("option");
//   option.textContent = stock;
//   option.value = stock;
//   dropdown.appendChild(option);
// }

// Event listener for the dropdown
dropdown.addEventListener("change", onSelectChange);
function onSelectChange(){
  var value = this.value;
  showStockDetails(value);
}

// Show the stock details when selected in the dropdown
function showStockDetails(selectedStock){
  document.getElementById('symbol').innerHTML = "Symbol: " + selectedStock;
  for (var i = 0; i < stockDetails.length; i++) {
  	if (stockDetails[i].ticker == selectedStock)
      document.getElementById('price').innerHTML = "Price: $" + getQuote(selectedStock);
  }
}

// Add stock to radar graph and to bottom row of grid when button is clicked
// document.getElementById("AddToPortfolioButton").onclick = onClickAddToPortfolioButton;
// var stockNumber = 0;
var listOfSelectedStocks = [];
function onClickAddToPortfolioButton(){
  selectValue = d3.select('select').property('value');
  listOfSelectedStocks.push(selectValue)
  
  listOfSelectedStocks = listOfSelectedStocks.slice(Math.max(listOfSelectedStocks.length - 5, 0))
  var selectedObject = Object({'Tickers':listOfSelectedStocks})
  AddStockDetailsGrid(value, stockNumber++);
  // TODO: createRadarGraph()
  // TODO: findSimilarIndexes()
}

// Creates a stock details grid member and refreshes the radar graph with the new selected stock attributes

function AddStockDetailsGrid(selectedStock, stockNumber,color, selectedObject){
  const stockNumberArray = ["#stock0", "#stock1", "#stock2", "#stock3", "#stock4"]
  // debugger;
  var stock = d3.select(stockNumberArray[stockNumber]);
  stock.style.visibility = "visible";
  stock.innerHTML = selectedStock;
  // debugger;
  stock.style('fill',color(stockNumber)).text(selectedObject.Tickers[stockNumber]);
  // stock.select('text').text(selectedStock)
}
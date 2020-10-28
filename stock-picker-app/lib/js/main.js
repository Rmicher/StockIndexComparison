// TODO: stockDetails needs replaced with API data

function normalizeVector(v){
	/* takes an array of numbers and normalizes them to values between 0 and 1 */
	
	var v_max = Math.max(...v);
	var v_min = Math.min(...v);
	var v_normalized = [];
	for (var i = 0; i < v.length; i++){
		var v_norm = (v[i] - v_min) / (v_max - v_min);
		v_normalized.push(v_norm);
	};
	return v_normalized;
};


function relativeDifference(s1, s2){
	/* Computes the relative difference (a number between 0 and 1) of two numbers */
	
	var s_max = Math.max(s1, s2);
	var s_min = Math.min(s1, s2);
	return (s_max - s_min) / (Math.abs(s_max) + Math.abs(s_min));
};


function similarity(portfolioScores, indexScores){
	/* 
	Takes two dictionaries of where radar chart attributes are keys and the associated values are the values.
	Returns the similarity score between the two dictionaries' values.
	*/
	
	indexValues = Object.values(indexScores);
	portfolioValues = Object.values(portfolioScores);
	n_properties = portfolioValues.length
	
	var diffs = [];
	for (var i=1; i < n_properties; i++) {
		diffs.push(relativeDifference(portfolioValues[i], indexValues[i]))
	};
	var totalScore = 0;
	for (var i=0; i < diffs.length; i++){
		totalScore += diffs[i];
	};
	var similarityScore = (n_properties - totalScore) / n_properties;
	
	return similarityScore;
};


// Get the current price of the selected stock from API. Can also return other current details if needed.
var getQuote = function(selectedStock){
	var url = "https://rapidapi.p.rapidapi.com/v6/finance/quote?symbols=" + selectedStock + "&region=US&lang=en"
	const settings = {
		"async": false,
		"crossDomain": true,
		"url": url,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
			"x-rapidapi-key": "8198243011msh1a3d727568558c2p143dbajsnc14d99ca25fc"
		}
	};
	var response = $.ajax(settings).done(function (r) {});
	var quote = response['responseJSON']['quoteResponse']["result"][0]["regularMarketPrice"];
	return quote;
};


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

// Append the stock options to the dropdown
var dropdown = document.getElementById("selectStock");
for (var i = 0; i < stockDetails.length; i++) {
  var stock = stockDetails[i].ticker;
  var option = document.createElement("option");
  option.textContent = stock;
  option.value = stock;
  dropdown.appendChild(option);
}

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
document.getElementById("AddToPortfolioButton").onclick = onClickAddToPortfolioButton;
var stockNumber = 0;
var listOfSelectedStocks = [];
function onClickAddToPortfolioButton(){
  var value = dropdown.value;
  listOfSelectedStocks.push(value)
  AddStockDetailsGrid(value, stockNumber++);
  // TODO: createRadarGraph()
  // TODO: findSimilarIndexes()
}

// Creates a stock details grid member and refreshes the radar graph with the new selected stock attributes
const stockNumberArray = ["stock0", "stock1", "stock2", "stock3", "stock4"]
function AddStockDetailsGrid(selectedStock, stockNumber){
  var stock = document.getElementById(stockNumberArray[stockNumber]);
  stock.style.visibility = "visible";
  stock.innerHTML = selectedStock;
}
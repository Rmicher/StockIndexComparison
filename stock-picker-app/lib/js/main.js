// Append the stock options to the dropdown
var dropdown = document.getElementById("selectStock");
for (var stock in stockJSON) {
  var option = document.createElement("option");
  option.textContent = stock;
  option.value = stock;
  dropdown.appendChild(option);
}

// Event listener for the stock dropdown
dropdown.addEventListener("change", onSelectChange);
function onSelectChange(){
  var value = this.value;
  showStockDetails(value);
}

// Show the stock details when selected in the dropdown
function showStockDetails(selectedStock){
  document.getElementById('symbol').innerHTML = "Symbol: " + selectedStock;
  document.getElementById('previousClose').innerHTML = "Previous Close: $" + stockJSON[selectedStock].previous_close.toFixed(2);
  document.getElementById('beta').innerHTML = "Beta: " + stockJSON[selectedStock].beta.toFixed(2);
  document.getElementById('environmentScore').innerHTML = "Environment Score: " + stockJSON[selectedStock].environmentScore.toFixed(2);
  document.getElementById('governanceScore').innerHTML = "Governance Score: " + stockJSON[selectedStock].governanceScore.toFixed(2);
  document.getElementById('socialScore').innerHTML = "Social Score: " + stockJSON[selectedStock].socialScore.toFixed(2);
  document.getElementById('yield').innerHTML = "Yield: " + (stockJSON[selectedStock].yield * 100).toFixed(2) + "%";
  document.getElementById('ytdReturn').innerHTML = "YTD Return: " + (stockJSON[selectedStock].ytdReturn * 100).toFixed(2) + "%";
}

var slider = document.getElementById("sliderRange");
var output = document.getElementById("rangeValue");
output.innerHTML = slider.value + "%"; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
var percentageValue;
slider.oninput = function() {
  output.innerHTML = this.value + "%";
  percentageValue = parseInt(this.value);
} 

// Add stock to radar graph and to bottom row of grid when button is clicked
document.getElementById("AddToPortfolioButton").onclick = onClickAddToPortfolioButton;
var stockNumber = 0;
var listOfSelectedStocks = [];
var totalPercentage = 0; //cannot exceed 100
var portfolio = document.getElementById('portfolio');

function onClickAddToPortfolioButton(){
  var stockAlreadyInPortfolio = false;
  var selectedStock = dropdown.value;
  var newStockJSON = stockJSON[selectedStock];
  if (typeof percentageValue == 'undefined') {
    percentageValue = parseInt(slider.value);
  }
  newStockJSON.weight = parseInt(percentageValue);
  listOfSelectedStocks.forEach(function (stock, index) {
    if (stock.ticker == selectedStock) {
      alert("This stock has already been added to the portfolio.");
      stockAlreadyInPortfolio = true;
    }
  });

  if (stockAlreadyInPortfolio) {
    return;
  }

  if ((totalPercentage + percentageValue) > 100) {
    alert("The total percentage of the stocks in your portfolio cannot exceed 100%.");
  } else {
    totalPercentage = totalPercentage + percentageValue;
    listOfSelectedStocks.push(stockJSON[selectedStock]);
    
    portfolio.innerHTML = "Portfolio " + totalPercentage + "% Allocated";
    AddStockDetailsGrid(selectedStock, percentageValue, stockNumber++);
    // TODO: createRadarGraph()
    // TODO: findSimilarIndexes()
  }
}

// Creates a stock details grid member and refreshes the radar graph with the new selected stock attributes
const stockNumberArray = ["stock0", "stock1", "stock2", "stock3", "stock4"]
const buttonNumberArray = ["button0", "button1", "button2", "button3", "button4"]
function AddStockDetailsGrid(selectedStock, percentageValue, stockNumber){
  var stock = document.getElementById(stockNumberArray[stockNumber]);
  stock.style.visibility = "visible";
  stock.innerHTML = "Symbol: " + selectedStock + "<br />Allocation: " + percentageValue + "%" + "<br /><button type='button' id='" + buttonNumberArray[stockNumber]
  + "'>Remove</button>";

  var button = document.getElementById(buttonNumberArray[stockNumber]);
  stock.style.visibility = "visible";
  document.getElementById(buttonNumberArray[stockNumber]).onclick = onClickRemoveFromPortfolioButton;
}

// Remove stock from portfolio if button clicked
function onClickRemoveFromPortfolioButton() {
  stockNumber--;
  var stock = document.getElementById(stockNumberArray[stockNumber]);
  stock.style.visibility = "hidden";
  totalPercentage = totalPercentage - listOfSelectedStocks.slice(-1)[0].weight;
  portfolio.innerHTML = "Portfolio " + totalPercentage + "% Allocated";
  listOfSelectedStocks.pop();
}

// TODO: this will be replaced by the aarray returned by the algorithm
// Append the index options to the dropdown
var dropdownIndex = document.getElementById("selectIndex");
for (var index in indexJSON) {
  var option = document.createElement("option");
  option.textContent = index;
  option.value = index;
  dropdownIndex.appendChild(option);
}

// Event listener for the index dropdown
dropdownIndex.addEventListener("change", onSelectChangeIndex);
function onSelectChangeIndex(){
  var value = this.value;
  showIndexDetails(value);
}

// Show details for the index
// showIndexDetails("VTSAX");
function showIndexDetails(selectedIndex){
  document.getElementById('symbolIndex').innerHTML = "Symbol: " + selectedIndex;
  document.getElementById('previousCloseIndex').innerHTML = "Previous Close: $" + indexJSON[selectedIndex].previous_close.toFixed(2);
  document.getElementById('betaIndex').innerHTML = "Beta: " + indexJSON[selectedIndex].beta.toFixed(2);
  document.getElementById('environmentScoreIndex').innerHTML = "Environment Score: " + indexJSON[selectedIndex].environmentScore.toFixed(2);
  document.getElementById('governanceScoreIndex').innerHTML = "Governance Score: " + indexJSON[selectedIndex].governanceScore.toFixed(2);
  document.getElementById('socialScoreIndex').innerHTML = "Social Score: " + indexJSON[selectedIndex].socialScore.toFixed(2);
  document.getElementById('yieldIndex').innerHTML = "Yield: " + (indexJSON[selectedIndex].yield * 100).toFixed(2) + "%";
  document.getElementById('ytdReturnIndex').innerHTML = "YTD Return: " + (indexJSON[selectedIndex].ytdReturn * 100).toFixed(2) + "%";
}
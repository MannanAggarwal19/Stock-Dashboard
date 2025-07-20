const Submit = document.getElementById("Submit")
const stock = document.getElementById("stock")
var stocks = new Set()
Submit.onclick = async function(){
  try{
    const Input = document.getElementById("Input").value.trim().toUpperCase()
    const res = await fetch(`http://127.0.0.1:8000/stock/${Input}`)
    if (!res.ok) {throw new Error("Error sorry")}
    const data = await res.json()
    if (stocks.has(data.symbol) || Input == ""){throw new Error("Stock Already Added!")}
    else{
    const info = `  
<div class="row"> 
  <div>${data.longName}</div>
  <div>${data.symbol}</div>
  <div>${data.price}</div>
  <div>${data.change}</div>
  <div>${data.high}</div>
  <div>${data.low}</div>
  <div>${data.volume}</div>
</div>

<div class="more_info"> 
  <h2>Additional Info!</h2>
  <div class="extra_rows">

    <div class="heads">52 Week Statistics</div>
    <div class="three"> 
      <div>52-week high: ${data.fiftyTwoWeekHigh}</div>
      <div>52-week low: ${data.fiftyTwoWeekLow}</div>
      <div>52-week change(%): ${data.fiftyTwoWeekChangePercent}</div>
    </div>

    <div class="three"> 
      <div>50-day average: ${data.fiftyDayAverage}</div>
      <div>200-day average: ${data.twoHundredDayAverage}</div>
      <div>Average daily volume (3 months): ${data.averageDailyVolume3Month}</div>
    </div>

    <div class="heads">Valuation</div>
    <div class="three">
      <div>Market Cap: ${data.marketCap}</div>
      <div>Trailing PE: ${data.trailingPE}</div>
      <div>Forward PE: ${data.forwardPE}</div>
    </div>

    <div class="three">
      <div>Price to sales trailing (12 Months): ${data.priceToSalesTrailing12Months}</div>
      <div>Price to book: ${data.priceToBook}</div>
      <div>Enterprise Value: ${data.enterpriseValue}</div>
    </div>
    
    <div class="heads"> Performance </div>
    <div class="three">
      <div>EPS Trailing (12M): ${data.epsTrailingTwelveMonths}</div>
      <div>EPS Forward: ${data.epsForward}</div>
      <div>Earnings growth: ${data.earningsGrowth}</div>
    </div>

    <div class="three">
      <div>Revenue growth: ${data.revenueGrowth}</div>
      <div>Return on assets : ${data.returnOnAssets}</div>
      <div> Return on equity: ${data.returnOnEquity}</div>
    </div>

    <div class="heads"> Financials </div>
    <div class="three">
      <div> Total Revenue: ${data.totalRevenue} </div>
      <div> Free cash flow: ${data.freeCashflow} </div>
      <div> Operating cash flow: ${data.operatingCashflow} </div>
    </div>

    <div class="three">
      <div> Total Debt: ${data.totalDebt} </div>
      <div> Total Cash: ${data.totalCash} </div>
      <div> Book Value: ${data.bookValue} </div>
    </div>

    <div class="three">
      <div> Current Ratio: ${data.currentRatio} </div>
      <div> Quick Ratio: ${data.quickRatio} </div>
      <div> Debt to Ratio: ${data.debtToEquity} </div>
    </div>

    <div class="heads"> Analyst Ratings </div>
    <div class="three">
      <div> Target high price: ${data.targetHighPrice}</div>
      <div> Target median price: ${data.targetMedianPrice}</div>
      <div> Target mean price: ${data.targetMeanPrice}</div>
    </div>

    <div class="three">
      <div> Recommendation mean: ${data.recommendationMean}</div>
      <div> Recommendation key: ${data.recommendationKey}</div>
      <div> Number of analyst opinions: ${data.numberOfAnalystOpinions}</div>
    </div>
    <div class="disclaimer"> Disclaimer: All data, including analyst ratings and financial metrics, is provided for informational purposes only. It does not constitute investment advice. Always do your own research or consult a professional before making any investment decisions. </div>
  </div>
</div>

                  `
    stock.innerHTML += info
    stocks.add(data.symbol)}
  }
  catch (err){
    alert(`${err}`)
  }
document.getElementById("Input").value = ""
}

document.getElementById("stock").addEventListener("click", function(e) {
  const row = e.target.closest(".row");
  if (row) {
    const moreInfo = row.nextElementSibling;
    if (moreInfo && moreInfo.classList.contains("more_info")) {
      moreInfo.classList.toggle("active");
    }
  }
});

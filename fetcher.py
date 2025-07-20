import yfinance as yf


def fetch_stock(symbol):
    stock = yf.Ticker(symbol).fast_info
    return stock

keys = [
    "longName","fiftyTwoWeekHigh", "fiftyTwoWeekLow", "fiftyTwoWeekChangePercent","fiftyDayAverage","twoHundredDayAverage","averageDailyVolume3Month",
    "marketCap", "trailingPE", "forwardPE",
    "priceToSalesTrailing12Months", "priceToBook", "enterpriseValue",
    "epsTrailingTwelveMonths", "epsForward", "earningsGrowth", "revenueGrowth",
    "returnOnAssets", "returnOnEquity", "totalRevenue", "freeCashflow",
    "operatingCashflow", "totalDebt", "totalCash", "bookValue",
    "currentRatio", "quickRatio", "debtToEquity","recommendationMean","recommendationKey","targetHighPrice","targetMedianPrice","targetMeanPrice","numberOfAnalystOpinions"
]

currencies = {
    "USD": "$",
    "INR": "₹",
    "None": "Currency"
}

currency_fields = {
    "marketCap",
    "priceToSalesTrailing12Months",
    "priceToBook",
    "enterpriseValue",
    "totalRevenue",
    "freeCashflow",
    "operatingCashflow",
    "totalDebt",
    "totalCash",
    "fiftyTwoWeekHigh", "fiftyTwoWeekLow", "fiftyDayAverage", "twoHundredDayAverage",
    "targetHighPrice","targetMedianPrice","targetMeanPrice"

}

percent_fields = {"fiftyTwoWeekChangePercent", "revenueGrowth", "earningsGrowth", "returnOnAssets", "returnOnEquity"}

def fetch_stock_full(symbol):
    info = yf.Ticker(symbol).info
    currency_symbol = info.get("currency", "None")
    currency = currencies.get(currency_symbol, f'{currency_symbol} ')
    all_info = dict()
    for key in keys:
        val = info.get(key,"N/A")
        if isinstance(val,(int,float)):
            if key in percent_fields:
                all_info[key] = f'{val*100:,.2f}%'

            elif key in currency_fields:
                all_info[key] = f'{currency}{val:,.2f}'
            else:
                all_info[key] = f'{val:,.2f}'
        else:
            all_info[key] = val
    return all_info
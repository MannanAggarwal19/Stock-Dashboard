from fastapi import FastAPI,HTTPException,Path
from fetcher import fetch_stock,fetch_stock_full,currencies
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/stock/{symbol}")
def getstock(symbol: str =Path(description="Takes a stock symbol as input")):
    fast_info = fetch_stock(symbol)
    all = fetch_stock_full(symbol)
    price = fast_info.last_price
    vol = fast_info.last_volume
    change = (fast_info.previous_close - fast_info.last_price)/fast_info.previous_close *100
    high = fast_info.day_high
    low = fast_info.day_low
    cur = currencies.get(fast_info.currency,"Currency ")
    response = {
        "symbol":symbol,
        "price":f'{cur}{price:.2f}',
        "volume": f'{vol:,}',
        "change": f'{"+" if change>0 else ""}{change:.2f}%',
        "high": f'{cur}{high:.2f}',
        "low": f'{cur}{low:.2f}',
    }

    for key,value in all.items():
        response[key] = value

    return response

 
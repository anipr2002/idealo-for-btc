import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

export async function getOfferFromGuardarian(amount) {
  try {
    const res = await axios.get(
      `https://api-payments.guardarian.com/v1/estimate?to_currency=BTC&from_amount=${amount}&from_currency=USD&from_network=USD&to_network=BTC`,
      {
        headers: {
          'X-Api-Key': 'c14d927f-cb01-4561-9520-28ec22c92710'
      }
    }
    );
    return res.data?.value.toString();
  } catch (error) {
    console.error(error);
    return;
  }
}


export async function getOfferFromMoonPay(amount){
  try{
    const res = await axios.get(
      `https://api.moonpay.com/v3/currencies/btc/buy_quote?apiKey=pk_live_R5Lf25uBfNZyKwccAZpzcxuL3ZdJ3Hc&baseCurrencyAmount=${amount}&baseCurrencyCode=usd&fixed=true&areFeesIncluded=true&regionalPricing=true&quoteType=principal`
    )
    return res.data?.quoteCurrencyAmount.toString();
  }
  catch(error){
    console.error(error);
    return;
  }
}

export async function getOfferFromBinance(amount){
  try{
    const res = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT`
    )
    return (amount/res.data.price).toString();
  }
  catch(error){
    console.error(error);
    return;
  }
}

export async function getOfferFromOkx(amount){
  try{
    const res = await axios.post(
      `https://www.okx.com/v2/asset/quick/exchange/quote?t=1694038414124`,
      {baseCcy: "BTC", quoteCcy: "USDT", side: "sell", rfqSz: 0.0001, rfqSzCcy: "BTC"}
    )
    return (amount/res.data?.data?.bidPx).toString();
  }
  catch(error){
    console.error(error);
    return;
  }
}


export async function getAllOffers(amount){

  const [guardarian,moonpay,binance,okx] = await Promise.all(
    [
      getOfferFromGuardarian(amount), 
      getOfferFromMoonPay(amount), 
      getOfferFromBinance(amount), 
      getOfferFromOkx(amount)
    ]
  );
  const result = {};
  if(guardarian) result.guardarian = guardarian;
  if(moonpay) result.moonpay = moonpay;
  if(binance) result.binance = binance;
  if(okx) result.okx = okx;
  return result;
  
  // return {guardarian, moonpay, binance, okx};
}

import Offer from "./cache.js";
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());


async function getOffersFromProviders(providers){

   return await Offer.findOne({ serviceProvider: providers })
  .sort({ createdAt: -1 })
  .exec();

}


const providers = ['guardarian', 'moonpay', 'binance', 'okx'];

const results = await Promise.all([
    getOffersFromProviders(providers[0]),
    getOffersFromProviders(providers[1]),
    getOffersFromProviders(providers[2]),
    getOffersFromProviders(providers[3]),
])

app.get("/", async (req, res) => {
    res.send(results);
    }
);

//use port 900
app.listen(9000, () => {
    console.log("Server started at port 9000");
}
);



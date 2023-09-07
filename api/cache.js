import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { getAllOffers } from "./serviceProviders.js";
import cron from "node-cron";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());


mongoose.connect(process.env.URI , { useNewUrlParser: true, useUnifiedTopology: true });


const offers = await getAllOffers(100);
const offersData = Object.keys(offers).map((key) => {
  return {
    serviceProvider: key,
    btc: offers[key],
  };
});

const offerSchema = new mongoose.Schema({
    serviceProvider: String,
    btc: String
},{
    timestamps: true
}
);

const Offer = mongoose.model("Offer", offerSchema);

const insertOffers = (offersData) => {
  return Offer.insertMany(offersData)
    .then(() => {
      console.log("Successfully saved all the offers to the database");
    })
    .catch((err) => {
      console.error(err);
    });
};

cron.schedule("0 */12 * * *",async () => {
    const offers = await getAllOffers(100);
    const offersData = Object.keys(offers).map((key) => {
      return {
        serviceProvider: key,
        btc: offers[key],
      };
    });
    await insertOffers(offersData);
});

app.get("/", async (req, res) => {
    const offers = await Offer.find();
    res.send(offers);
    }
);

app.listen(5000, () => {
    console.log("Server started at port 5000");
}
);

export default Offer;


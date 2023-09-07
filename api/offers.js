import { getAllOffers } from './serviceProviders.js';
import express from "express";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());

app.get('/' , async (req, res) => {
    const offers = await getAllOffers(req.query.amount);
    res.json(offers);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);


import { useEffect, useState } from "react";
import Input from "./components/Input";
import AmountInput from "./components/AmountInput";
import ResultRow from "./components/ResultRow";
import axios from "axios";
import { sortBy } from "lodash";
import  useDebouncedEffect  from  'use-debounced-effect';
import LoadingSkeleton from "./components/LoadingSkeleton";

type CachedResult = {
  serviceProvider: string;
  btc: string;
}

type OfferResults = {
  [keys:string]:string
}

const defaultAmount = "100";

function App() {

  const [amount, setAmount] = useState(defaultAmount);
  const [cachedResults, setCachedResults] = useState<CachedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [previousAmount, setPreviousAmount] = useState(defaultAmount);
  const [offerResults, setOfferResults] = useState<OfferResults>({});

  useEffect(() => {
    axios.get('http://localhost:9000')
    .then((res) => {
      
      setCachedResults(res.data);
      setLoading(false);
    });
  },[]);

  useDebouncedEffect(() => {
    if(amount === defaultAmount){
      return;
    }
    if(amount !== previousAmount){setLoading(true);
      axios.get(`http://localhost:3000?amount=${amount}`)
      .then((res) => { 
        setLoading(false);
        setOfferResults(res.data);
        setPreviousAmount(amount);
       
      })
    }
    
  },1000,[amount]);

  const showCached = amount === defaultAmount;
  const sortedResults:CachedResult[] = sortBy(Object.keys(offerResults).map(serviceProvider => ({
    serviceProvider, 
    btc: offerResults[serviceProvider] 
  })),'btc').reverse();

  const sortedCachedResults:CachedResult[] = sortBy(cachedResults,'btc').reverse();

  const rows = showCached ? sortedCachedResults : sortedResults;

  return (
    <main className="font-ubuntu max-w-2xl mx-auto px-4 py-8">
      <h1
        className=" uppercase text-6xl text-center font-bold
                      bg-gradient-to-br from-purple-600 to-sky-400
                      bg-clip-text text-transparent from-30%"
      >
        Find Cheapest BTC
      </h1>

      <div className="flex justify-center mt-6">
        <AmountInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mt-8">
        {loading && (
          <LoadingSkeleton/>
        )}
        
        {!loading && rows.map((result) => (
          <>
            <ResultRow key={result.btc} providerName={result.serviceProvider} btc={result.btc}/>
          </>
        ))}


      </div>
    </main>
  );
}

export default App;

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [selectedone, setSelectedOne] = useState("EUR");
  const [selectedtwo, setSelectedTwo] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(1);

  const [output, setOutput] = useState([]);

  useEffect(function () {
    document.title = "Money change";
  }, []);

  useEffect(() => {
    async function TrasMoney() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${selectedone}&to=${selectedtwo}`
      );

      const data = await res.json();
      console.log(data.rates);
      setOutput(data.rates[selectedtwo]);
      setIsLoading(false);
    }

    if (selectedone === selectedtwo) return setOutput(amount);

    TrasMoney();
  }, [selectedone, selectedtwo, amount]);

  console.log(output[selectedtwo]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={selectedone}
        onChange={(e) => setSelectedOne(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={selectedtwo}
        onChange={(e) => setSelectedTwo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {selectedtwo}
      </p>
    </div>
  );
}

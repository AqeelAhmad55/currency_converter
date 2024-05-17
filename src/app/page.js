"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState(1);
  const [output, setOutput] = useState(null);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");

  useEffect(
    function () {
      async function rates() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${currency1}&to=${currency2}`
        );
        const data = await res.json();
        setOutput(data.rates[currency2]);
      }
      if (currency1 === currency2) return setOutput(input);
      if (input === 0) return setOutput(0);
      rates();
    },
    [input, currency1, currency2]
  );

  return (
    <div className=" w-full h-screen flex flex-col justify-center items-center text-xl gap-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          className=" border-4 border-[red] rounded-xl px-3 py-2  focus:outline-none"
          onChange={(e) => setInput(Number(e.target.value))}
        />
        <select
          className="border-4 border-[red] rounded-xl px-3 py-2  focus:outline-none"
          value={currency1}
          onChange={(e) => setCurrency1(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
          <option value="TRY">TRY</option>
        </select>
        <select
          className="border-4 border-[red] rounded-xl px-3 py-2  focus:outline-none"
          value={currency2}
          onChange={(e) => setCurrency2(e.target.value)}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
          <option value="TRY">TRY</option>
        </select>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center rounded-xl px-6 py-3  focus:outline-none font-bold text-2xl">
        <p>1 {currency1} equals to</p>
        <p className="border-4 border-[black] bg-[red] text-white px-6 py-3">
          {output} {currency2}
        </p>
      </div>
    </div>
  );
}

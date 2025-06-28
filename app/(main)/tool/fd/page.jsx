"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formatNumber = (value) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned === "") return "";
  return parseInt(cleaned, 10).toLocaleString("en-IN");
};

const parseNumber = (value) => {
  return parseFloat(value.replace(/,/g, "")) || 0;
};

const FDCalculator = () => {
  const [principal, setPrincipal] = useState("1,00,000");
  const [rate, setRate] = useState("7.5");
  const [years, setYears] = useState(5);
  const [frequency, setFrequency] = useState("yearly");

  const [maturityAmount, setMaturityAmount] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);

  const freqMap = {
    yearly: 1,
    halfyearly: 2,
    quarterly: 4,
    monthly: 12,
  };

  useEffect(() => {
    const P = parseNumber(principal);
    const R = parseFloat(rate);
    const T = parseFloat(years);
    const N = freqMap[frequency];

    if (!isNaN(P) && !isNaN(R) && !isNaN(T)) {
      const A = P * Math.pow(1 + R / (100 * N), N * T);
      const interest = A - P;
      setMaturityAmount(A);
      setInterestEarned(interest);
    } else {
      setMaturityAmount(0);
      setInterestEarned(0);
    }
  }, [principal, rate, years, frequency]);

  return (
    <Card className="max-w-2xl mx-auto p-6 mt-10">
      <CardHeader>
        <CardTitle>🏦 Fixed Deposit (FD) Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-1 font-medium">Principal Amount (₹)</p>
          <Input
            type="text"
            inputMode="numeric"
            value={principal}
            onChange={(e) => setPrincipal(formatNumber(e.target.value))}
            placeholder="e.g., 1,00,000"
          />
        </div>

        <div>
          <p className="mb-1 font-medium">Interest Rate (Yearly %)</p>
          <Input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g., 7.5"
            min="0"
            step="0.1"
          />
        </div>

        <div className="flex items-center gap-3">
          <p className="font-medium">Time Period (Years):</p>
          <Input
            className="w-16"
            type="number"
            value={years}
            onChange={(e) => setYears(Math.max(0, Number(e.target.value)))}
            placeholder="e.g., 5"
          />
          <button className="border rounded px-2" onClick={() => setYears((y) => Math.max(1, y - 1))}>-</button>
          <button className="border rounded px-2" onClick={() => setYears((y) => Math.min(60, y + 1))}>+</button>
        </div>

        <div>
          <p className="mb-1 font-medium">Compounding Frequency</p>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="halfyearly">Half-Yearly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 space-y-1 text-sm">
          <p>📈 Maturity Amount: ₹{maturityAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
          <p>💸 Interest Earned: ₹{interestEarned.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FDCalculator;

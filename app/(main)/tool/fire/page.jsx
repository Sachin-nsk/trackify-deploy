"use client"

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formatINR = (num) => {
  if (isNaN(num)) return "";
  return num.toLocaleString("en-IN", { maximumFractionDigits: 0 });
};

const parseNumber = (str) => {
  return parseFloat(str.replace(/,/g, "")) || 0;
};

const FireCalculator = () => {
  const [expenses, setExpenses] = useState("40000");
  const [age, setAge] = useState("25");
  const [retireAge, setRetireAge] = useState("45");
  const [inflation, setInflation] = useState("6");
  const [rate, setRate] = useState("12");

  const [leanFire, setLeanFire] = useState(0);
  const [coastFire, setCoastFire] = useState(0);
  const [fatFire, setFatFire] = useState(0);

  useEffect(() => {
    const exp = parseNumber(expenses);
    const currentAge = parseNumber(age);
    const retirementAge = parseNumber(retireAge);
    const inflationRate = parseNumber(inflation) / 100;
    const returnRate = parseNumber(rate) / 100;
    const years = retirementAge - currentAge;

    if (years <= 0 || exp <= 0 || returnRate <= 0) {
      setLeanFire(0);
      setCoastFire(0);
      setFatFire(0);
      return;
    }

    const futureExpenses = exp * Math.pow(1 + inflationRate, years);
    const lean = (futureExpenses * 12) / 0.04;
    const coast = (futureExpenses * 12 * years) / Math.pow(1 + returnRate, years);
    const fat = (futureExpenses * 12 * 1.5) / 0.04;

    setLeanFire(Math.round(lean));
    setCoastFire(Math.round(coast));
    setFatFire(Math.round(fat));
  }, [expenses, age, retireAge, inflation, rate]);

  return (
    <Card className="max-w-3xl mx-auto p-6 mt-10">
      <CardHeader>
        <CardTitle>🔥FIRE Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p>Current Monthly Expenses (₹)</p>
            <Input
              type="text"
              value={formatINR(parseNumber(expenses))}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, "");
                setExpenses(raw);
              }}
            />
          </div>
          <div>
            <p>Your Age</p>
            <Input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value.replace(/[^\d]/g, ""))}
            />
          </div>
          <div>
            <p>Desired Retirement Age</p>
            <Input
              type="text"
              value={retireAge}
              onChange={(e) => setRetireAge(e.target.value.replace(/[^\d]/g, ""))}
            />
          </div>
          <div>
            <p>Assumed Inflation Rate (%)</p>
            <Input
              type="text"
              value={inflation}
              onChange={(e) => setInflation(e.target.value.replace(/[^\d.]/g, ""))}
            />
          </div>
          <div>
            <p>Expected Return Rate (%)</p>
            <Input
              type="text"
              value={rate}
              onChange={(e) => setRate(e.target.value.replace(/[^\d.]/g, ""))}
            />
          </div>
        </div>

        <div className="space-y-4 pt-6">
          <div className="border rounded-lg p-4 bg-gray-50">
            <p className="font-semibold">Lean FIRE</p>
            <p>Retire early with minimal lifestyle needs.</p>
            <p className="mt-2">Corpus Needed: ₹{formatINR(leanFire)}</p>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <p className="font-semibold">Coast FIRE</p>
            <p>Save enough early and let investments grow to retire on.</p>
            <p className="mt-2">Corpus Needed: ₹{formatINR(coastFire)}</p>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <p className="font-semibold">Fat FIRE</p>
            <p>Retire early with a luxurious lifestyle and high expenses.</p>
            <p className="mt-2">Corpus Needed: ₹{formatINR(fatFire)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FireCalculator;

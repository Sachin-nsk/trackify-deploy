"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formatNumber = (value) => {
  const clean = value.replace(/\D/g, "");
  if (clean === "") return "";
  return parseInt(clean, 10).toLocaleString("en-IN");
};

const parseNumber = (value) => parseFloat(value.replace(/,/g, "")) || 0;

const CAGRCalculator = () => {
  const [invested, setInvested] = useState("1,00,000");
  const [finalValue, setFinalValue] = useState("2,00,000");
  const [years, setYears] = useState(5);
  const [cagr, setCagr] = useState(0);

  useEffect(() => {
    const P = parseNumber(invested);
    const A = parseNumber(finalValue);
    const T = parseFloat(years);

    if (!isNaN(P) && !isNaN(A) && !isNaN(T) && T > 0 && P > 0 && A > P) {
      const result = (Math.pow(A / P, 1 / T) - 1) * 100;
      setCagr(result);
    } else {
      setCagr(0);
    }
  }, [invested, finalValue, years]);

  return (
    <Card className="max-w-2xl mx-auto p-6 mt-10">
      <CardHeader>
        <CardTitle>📊 CAGR Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-1 font-medium">Invested Amount (₹)</p>
          <Input
            type="text"
            inputMode="numeric"
            value={invested}
            onChange={(e) => setInvested(formatNumber(e.target.value))}
            placeholder="e.g., 100000"
          />
        </div>

        <div>
          <p className="mb-1 font-medium">Final Amount (₹)</p>
          <Input
            type="text"
            inputMode="numeric"
            value={finalValue}
            onChange={(e) => setFinalValue(formatNumber(e.target.value))}
            placeholder="e.g., 200000"
          />
        </div>

        <div className="flex items-center gap-3">
          <p className="font-medium">Time Period (Years):</p>
          <Input
            className="w-16"
            type="number"
            value={years}
            onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
            min={1}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setYears((y) => Math.max(1, y - 1))}
          >
            -
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setYears((y) => Math.min(60, y + 1))}
          >
            +
          </Button>
        </div>

        <div className="pt-4 text-lg font-semibold">
          📈 CAGR: {cagr > 0 ? `${cagr.toFixed(2)}%` : "—"}
        </div>
      </CardContent>
    </Card>
  );
};

export default CAGRCalculator;

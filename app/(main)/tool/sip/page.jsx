"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formatNumber = (value) => {
  const numeric = value.replace(/[^\d]/g, "");
  if (!numeric) return "";
  return parseInt(numeric, 10).toLocaleString("en-IN");
};

const parseNumber = (str) => {
  const cleaned = str.replace(/,/g, "");
  return Number(cleaned) || 0;
};

const SIPCalculator = () => {
  const [method, setMethod] = useState("sip");
  const [monthlyAmount, setMonthlyAmount] = useState("5,000");
  const [stepUpPercent, setStepUpPercent] = useState("10");
  const [returns, setReturns] = useState("12");
  const [yearsInput, setYearsInput] = useState("10");

  const years = parseInt(yearsInput) || 0;
  const months = years * 12;
  const monthly = parseNumber(monthlyAmount);
  const stepUp = parseFloat(stepUpPercent) || 0;
  const rate = (parseFloat(returns) || 0) / 100 / 12;

  let invested = 0;
  let futureValue = 0;

  if (method === "sip") {
    invested = monthly * months;
    futureValue =
      monthly * ((Math.pow(1 + rate, months) - 1) * (1 + rate)) / rate;
  } else {
    for (let i = 0; i < years; i++) {
      const amt = monthly * Math.pow(1 + stepUp / 100, i);
      invested += amt * 12;
      futureValue +=
        amt *
        ((Math.pow(1 + rate, 12) - 1) * (1 + rate)) /
        rate *
        Math.pow(1 + rate, (years - i - 1) * 12);
    }
  }

  const returnsEarned = futureValue - invested;
  const absoluteReturn = (returnsEarned / invested) * 100;

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">📊 SIP Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {/* Method Select */}
        <div>
          <p className="mb-1 font-medium">Investment Method</p>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sip">SIP</SelectItem>
              <SelectItem value="stepup">Step-up SIP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Monthly SIP */}
        <div>
          <p className="mb-1 font-medium">Monthly SIP Amount (₹)</p>
          <Input
            type="text"
            value={monthlyAmount}
            onChange={(e) =>
              setMonthlyAmount(formatNumber(e.target.value))
            }
            placeholder="e.g. 5,000"
          />
        </div>

        {/* Step-up % */}
        {method === "stepup" && (
          <div>
            <p className="mb-1 font-medium">Step-up % per year</p>
            <Input
              type="text"
              value={stepUpPercent}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/[^\d.]/g, "");
                setStepUpPercent(cleaned);
              }}
              placeholder="e.g. 10"
            />
          </div>
        )}

        {/* Expected Return */}
        <div>
          <p className="mb-1 font-medium">Expected Returns (Yearly %)</p>
          <Input
            type="text"
            value={returns}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^\d.]/g, "");
              setReturns(cleaned);
            }}
            placeholder="e.g. 12"
          />
        </div>

        {/* Years */}
        <div>
          <p className="mb-1 font-medium">Investment Duration (Years)</p>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              className="w-20"
              value={yearsInput}
              onChange={(e) => {
                const clean = e.target.value.replace(/[^\d]/g, "");
                setYearsInput(clean);
              }}
              placeholder="Years"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setYearsInput((prev) => `${Math.max(0, parseInt(prev || "0") - 1)}`)
              }
            >
              -
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setYearsInput((prev) => `${Math.min(60, parseInt(prev || "0") + 1)}`)
              }
            >
              +
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 space-y-2 border-t pt-4 text-[15px] font-semibold">
          <p>
            📥 Invested Amount: ₹
            {invested.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
          <p>
            💰 Total Value: ₹
            {futureValue.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
          <p>
            📈 Returns Earned: ₹
            {returnsEarned.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
          <p>
            🔁 Absolute Return: {absoluteReturn.toFixed(2)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SIPCalculator;

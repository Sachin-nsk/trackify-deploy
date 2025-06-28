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

// Format to ₹ with Indian commas
const formatNumber = (value) => {
  const numeric = value.replace(/[^\d]/g, "");
  if (!numeric) return "";
  return parseInt(numeric, 10).toLocaleString("en-IN");
};

// Remove commas to get number
const parseNumber = (str) => {
  const cleaned = str.replace(/,/g, "");
  return Number(cleaned) || 0;
};

const GoalSIPCalculator = () => {
  const [goalAmount, setGoalAmount] = useState("10,00,000");
  const [interestRate, setInterestRate] = useState("12");
  const [yearsInput, setYearsInput] = useState("10");

  const years = parseInt(yearsInput) || 0;
  const n = years * 12;
  const r = (parseFloat(interestRate) || 0) / 100 / 12;
  const goal = parseNumber(goalAmount);

  const monthlySIP =
    r > 0 && n > 0
      ? (goal * r) / (Math.pow(1 + r, n) - 1)
      : 0;

  const totalInvested = monthlySIP * n;
  const returnsEarned = goal - totalInvested;
  const absoluteReturn =
    totalInvested > 0 ? (returnsEarned / totalInvested) * 100 : 0;

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">🎯 Goal SIP Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {/* Goal Amount */}
        <div>
          <p className="mb-1 font-medium">🎯 Target Goal Amount (₹)</p>
          <Input
            type="text"
            value={goalAmount}
            onChange={(e) =>
              setGoalAmount(formatNumber(e.target.value))
            }
            placeholder="e.g. 10,00,000"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <p className="mb-1 font-medium">📈 Expected Annual Return (%)</p>
          <Input
            type="text"
            value={interestRate}
            onChange={(e) =>
              setInterestRate(e.target.value.replace(/[^\d.]/g, ""))
            }
            placeholder="e.g. 12"
          />
        </div>

        {/* Time Period */}
        <div>
          <p className="mb-1 font-medium">📅 Time Period (Years)</p>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={yearsInput}
              onChange={(e) =>
                setYearsInput(e.target.value.replace(/[^\d]/g, ""))
              }
              className="w-20"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setYearsInput((prev) =>
                  `${Math.max(1, parseInt(prev || "1") - 1)}`
                )
              }
            >
              -
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setYearsInput((prev) =>
                  `${Math.min(60, parseInt(prev || "1") + 1)}`
                )
              }
            >
              +
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 space-y-2 border-t pt-4 font-semibold">
          <p>
            💸 Required Monthly SIP: ₹
            {monthlySIP.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
          <p>
            📥 Total Invested: ₹
            {totalInvested.toLocaleString("en-IN", {
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
            📊 Absolute Return: {absoluteReturn.toFixed(2)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalSIPCalculator;

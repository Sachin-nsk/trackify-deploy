"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [stepUpPercent, setStepUpPercent] = useState("0");

  const [result, setResult] = useState({
    totalPayment: 0,
    totalInterest: 0,
    emi: 0,
  });

  const handleNumericInput = (val, setter) => {
    const clean = val.replace(/[^\d]/g, "");
    if (clean === "") {
      setter("");
    } else {
      const formatted = parseInt(clean, 10).toLocaleString("en-IN");
      setter(formatted);
    }
  };

  useEffect(() => {
    const P = parseFloat(loanAmount.replace(/,/g, ""));
    const R = parseFloat(interestRate);
    const T = parseFloat(tenureYears);
    const S = parseFloat(stepUpPercent);

    if (!isNaN(P) && !isNaN(R) && !isNaN(T) && !isNaN(S)) {
      const r = R / 12 / 100;
      const n = T * 12;

      let totalPaid = 0;
      let balance = P;
      let baseEMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      let yearlyIncrease = S / 100;

      for (let month = 1; month <= n; month++) {
        // increase EMI each year
        const currentYear = Math.floor((month - 1) / 12);
        const increasedEMI = baseEMI * Math.pow(1 + yearlyIncrease, currentYear);
        totalPaid += increasedEMI;
      }

      const totalInterest = totalPaid - P;

      setResult({
        totalPayment: totalPaid,
        totalInterest,
        emi: baseEMI,
      });
    } else {
      setResult({
        totalPayment: 0,
        totalInterest: 0,
        emi: 0,
      });
    }
  }, [loanAmount, interestRate, tenureYears, stepUpPercent]);

  return (
    <Card className="max-w-2xl mx-auto p-6 mt-10">
      <CardHeader>
        <CardTitle>EMI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-1">Loan Amount (₹)</p>
          <Input
            type="text"
            value={loanAmount}
            onChange={(e) => handleNumericInput(e.target.value, setLoanAmount)}
            placeholder="e.g., 500000"
          />
        </div>

        <div>
          <p className="mb-1">Interest Rate (per annum %)</p>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="e.g., 8.5"
          />
        </div>

        <div>
          <p className="mb-1">Loan Tenure (in years)</p>
          <Input
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(e.target.value)}
            placeholder="e.g., 5"
          />
        </div>

        <div>
          <p className="mb-1">Step-up EMI Increase (% per year, optional)</p>
          <Input
            type="number"
            value={stepUpPercent}
            onChange={(e) => setStepUpPercent(e.target.value)}
            placeholder="e.g., 5"
          />
        </div>

        <div className="pt-4 space-y-1">
          <p>
            Estimated Starting EMI: ₹
            {result.emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
          <p>
            Total Payment: ₹
            {result.totalPayment.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}
          </p>
          <p>
            Total Interest Paid: ₹
            {result.totalInterest.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EMICalculator;

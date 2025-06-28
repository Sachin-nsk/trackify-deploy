"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formatNumber = (value) => {
  const cleaned = value.replace(/\D/g, "") // remove non-digits
  if (cleaned === "") return ""
  return parseInt(cleaned, 10).toLocaleString("en-IN")
}

const parseNumber = (value) => {
  return parseInt(value.replace(/,/g, ""), 10) || 0
}

const RDCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState("5,000")
  const [interestRate, setInterestRate] = useState("7")
  const [years, setYears] = useState(5)

  const monthly = parseNumber(monthlyDeposit)
  const rate = parseFloat(interestRate)
  const n = 12
  const r = rate / 100
  const t = years

  const maturity =
    monthly *
    ((Math.pow(1 + r / n, n * t) - 1) / (1 - Math.pow(1 + r / n, -1)))

  const totalInvested = monthly * 12 * t
  const returns = maturity - totalInvested
  const absoluteReturn = (returns / totalInvested) * 100

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>📦 Recurring Deposit (RD) Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Monthly Deposit */}
        <div>
          <p className="mb-1 font-medium">Monthly Deposit (₹)</p>
          <Input
            type="text"
            inputMode="numeric"
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(formatNumber(e.target.value))}
            placeholder="Enter monthly deposit"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <p className="mb-1 font-medium">Interest Rate (Yearly %)</p>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="e.g., 7.5"
          />
        </div>

        {/* Time Period in Years */}
        <div className="flex items-center gap-3">
          <p className="font-medium">Time Period (Years):</p>
          <Input
            className="w-16"
            type="number"
            value={years}
            onChange={(e) => setYears(Math.max(0, Number(e.target.value)))}
          />
          <Button variant="outline" size="sm" onClick={() => setYears((y) => Math.max(1, y - 1))}>-</Button>
          <Button variant="outline" size="sm" onClick={() => setYears((y) => Math.min(60, y + 1))}>+</Button>
        </div>

        {/* Result */}
        <div className="mt-6 space-y-2 text-sm">
          <p>💰 Invested Amount: ₹{totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
          <p>📈 Maturity Amount: ₹{maturity.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
          <p>💸 Returns Earned: ₹{returns.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
          <p>📊 Absolute Return: {absoluteReturn.toFixed(2)}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default RDCalculator

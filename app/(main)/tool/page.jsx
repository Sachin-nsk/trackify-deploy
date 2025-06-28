'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Wallet,
  TrendingUp,
  Banknote,
  PiggyBank,
  BarChart,
  CreditCard,
  Flame,
} from 'lucide-react';

const toolItems = [
  {
    href: '/tool/sip',
    title: 'SIP Calculator',
    icon: <Wallet className="h-5 w-5 text-blue-600" />,
    description: 'Calculate how much you will accumulate through monthly SIP investments.',
  },
  {
    href: '/tool/goal-sip',
    title: 'Goal SIP',
    icon: <TrendingUp className="h-5 w-5 text-green-600" />,
    description: 'Determine how much you need to invest monthly to reach your financial goals.',
  },
  {
    href: '/tool/fd',
    title: 'FD Calculator',
    icon: <Banknote className="h-5 w-5 text-indigo-600" />,
    description: 'Calculate the maturity amount and interest earned on Fixed Deposits.',
  },
  {
    href: '/tool/rd',
    title: 'RD Calculator',
    icon: <PiggyBank className="h-5 w-5 text-purple-600" />,
    description: 'Calculate how much you will accumulate through Recurring Deposits.',
  },
  {
    href: '/tool/cagr',
    title: 'CAGR Calculator',
    icon: <BarChart className="h-5 w-5 text-orange-600" />,
    description: 'Calculate the Compound Annual Growth Rate of your investments.',
  },
  {
    href: '/tool/emi',
    title: 'EMI Calculator',
    icon: <CreditCard className="h-5 w-5 text-rose-600" />,
    description: 'Compute your monthly EMI payments and total loan interest.',
  },
  {
    href: '/tool/fire',
    title: 'FIRE Calculator',
    icon: <Flame className="h-5 w-5 text-red-600" />,
    description: 'Estimate how much you need to retire early and achieve financial independence.',
  },
];

const ToolsPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {toolItems.map((tool, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow group relative">
          <Link href={tool.href} className="block p-4">
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                {tool.icon}
                <CardTitle className="text-base font-semibold">{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground">
                {tool.description}
              </CardDescription>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default ToolsPage;

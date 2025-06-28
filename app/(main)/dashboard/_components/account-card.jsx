"use client";

import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from '@/components/ui/switch';
import { ArrowUpRight, ArrowDownRight, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useFetch } from '@/hooks/use-fetch';
import { updateDefaultAccount } from '@/actions/account';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount, updateDefaultLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(balance));
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-0",
      isDefault 
        ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 shadow-lg ring-2 ring-emerald-200 dark:ring-emerald-800" 
        : "bg-card shadow-md hover:shadow-lg"
    )}>
      <Link href={`/account/${id}`}>
        {/* Default Badge */}
        {isDefault && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium rounded-full shadow-sm">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Default
            </div>
          </div>
        )}

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
        </div>

        <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg",
              type === 'SAVINGS' 
                ? "bg-gradient-to-br from-emerald-500 to-teal-500" 
                : "bg-gradient-to-br from-green-500 to-emerald-500"
            )}>
              {type === 'SAVINGS' ? 'S' : 'C'}
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-foreground capitalize group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
              <p className="text-sm text-muted-foreground capitalize font-medium">
                {type.toLowerCase()} Account
              </p>
            </div>
          </div>
          
          <Switch 
            checked={isDefault} 
            onClick={handleDefaultChange} 
            disabled={updateDefaultLoading}
            className="data-[state=checked]:bg-primary"
          />
        </CardHeader>

        <CardContent className="relative z-10 pb-4">
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                {formatBalance(balance)}
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Available Balance</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="relative z-10 flex justify-between text-sm pt-4 border-t border-border">
          <div className='flex items-center space-x-1 text-emerald-600 font-medium'>
            <ArrowUpRight className="h-4 w-4" />
            <span>Income</span>
          </div>
          <div className='flex items-center space-x-1 text-red-500 font-medium'>
            <ArrowDownRight className="h-4 w-4" />
            <span>Expense</span>
          </div>
        </CardFooter>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      </Link>
    </Card>
  );
};

export default AccountCard;
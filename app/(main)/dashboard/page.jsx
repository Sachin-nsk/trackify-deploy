import React from 'react';
import CreateAccountDrawer from '@/components/ui/create-account-drawer';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Sparkles, TrendingUp, Wallet } from 'lucide-react';
import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
import AccountCard from './_components/account-card';
import { getCurrentBudget } from '@/actions/budget';
import BudgetProgress from './_components/budget-progress';
import { DashboardOverview } from './_components/transaction-overview';
import { Suspense } from 'react';

async function DashboardPage() {
  const accounts = await getUserAccounts();
  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  const transactions = await getDashboardData();

  return (
    <div className='space-y-8'>
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Welcome to your Financial Dashboard</h2>
        </div>
        <p className="text-muted-foreground">
          Track your expenses, manage budgets, and gain insights into your financial health.
        </p>
      </div>

      {/* Budget Progress */}
      {defaultAccount && (
        <div className="bg-card rounded-2xl shadow-lg border border-border">
          <BudgetProgress 
            initialBudget={budgetData?.budget}
            currentExpenses={budgetData?.currentExpenses || 0}
          />
        </div>
      )}

      {/* Overview */}
      <Suspense fallback={
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-muted rounded-xl"></div>
              <div className="h-64 bg-muted rounded-xl"></div>
            </div>
          </div>
        </div>
      }>
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
          <DashboardOverview 
            accounts={accounts}
            transactions={transactions || []}
          />
        </div>
      </Suspense>

      {/* Accounts Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Your Accounts</h2>
          </div>
          <div className="text-sm text-muted-foreground">
            {accounts.length} account{accounts.length !== 1 ? 's' : ''} total
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Add Account Card */}
          <CreateAccountDrawer>
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed border-border hover:border-primary/30 bg-card hover:bg-accent/50">
              <CardContent className="flex flex-col items-center justify-center text-center p-8 h-full min-h-[200px]">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Add New Account
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                  Create a new account to start tracking your finances
                </p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {/* Account Cards */}
          {accounts.length > 0 &&
            accounts?.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>

        {/* Empty State */}
        {accounts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No accounts yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get started by creating your first account to begin tracking your financial journey.
            </p>
            <CreateAccountDrawer>
              <button className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Account
              </button>
            </CreateAccountDrawer>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
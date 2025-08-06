import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/accounts";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/accounts-chart";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-4 sm:px-6 py-6 max-w-6xl mx-auto">
    
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end justify-between p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
            {account.name}
          </h1>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
            </span>
            <span className="text-sm text-muted-foreground">
              {account._count.transactions} transactions
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-4 rounded-lg min-w-[200px]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
        </div>
      </div>

      
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Transaction Overview
        </h2>
        <Suspense
          fallback={
            <div className="h-80 flex items-center justify-center">
              <BarLoader width={"80%"} color="#9333ea" />
            </div>
          }
        >
          <AccountChart transactions={transactions} />
        </Suspense>
      </div>

      
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-6 pb-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transaction History
          </h2>
        </div>
        <Suspense
          fallback={
            <div className="p-6">
              <BarLoader width={"100%"} color="#9333ea" />
            </div>
          }
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
}
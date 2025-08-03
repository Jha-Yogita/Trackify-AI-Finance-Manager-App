"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/accounts";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated!");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="hover:shadow-md transition-shadow relative">
      <Link href={`/account/${id}`} className="block">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {type === 'SAVINGS' ? 'Savings' : 'Current'} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm">
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            Income
          </div>
          <div className="flex items-center text-red-500">
            <ArrowDownRight className="mr-1 h-4 w-4" />
            Expense
          </div>
        </CardFooter>
      </Link>
      
      {/* Visible Switch with dark styling */}
      <div 
        className="absolute top-3 right-3 z-10"
        onClick={handleDefaultChange}
      >
        <Switch 
          checked={isDefault}
          disabled={updateDefaultLoading}
          className={`
            data-[state=checked]:bg-blue-600 
            data-[state=unchecked]:bg-gray-300
            data-[state=checked]:hover:bg-blue-700
            data-[state=unchecked]:hover:bg-gray-400
          `}
        />
      </div>
    </Card>
  );
}
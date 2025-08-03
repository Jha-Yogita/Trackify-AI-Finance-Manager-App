"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { createAccount } from "@/actions/dashboard";
import { accountSchema } from "@/app/api/lib/schema";
import { toast } from "sonner";

export function CreateAccountDrawer({ children }) {
  const [open, setOpen] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    watch, 
    setValue, 
    reset 
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "0.00",
      isDefault: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      await createAccount(data);
      toast.success("Account created successfully!");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to create account");
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <div className="mx-auto w-full max-w-md p-6">
          <DrawerHeader className="text-left px-0">
            <DrawerTitle className="text-xl font-semibold">
              Create New Account
            </DrawerTitle>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Account Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Main Account"
                {...register("name")}
                className="w-full"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium bg-white">
                Account Type
              </Label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type")}
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Current Account</SelectItem>
                  <SelectItem value="SAVINGS">Savings Account</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="balance" className="text-sm font-medium">
                Initial Balance
              </Label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
                className="w-full"
              />
              {errors.balance && (
                <p className="text-sm text-red-500">{errors.balance.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50/50">
              <div className="space-y-1">
                <Label htmlFor="isDefault" className="text-sm font-medium cursor-pointer">
                  Set as Default Account
                </Label>
                <p className="text-xs text-muted-foreground">
                  This account will be selected by default for transactions
                </p>
              </div>
              <Switch
                id="isDefault"
                checked={watch("isDefault")}
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                className="
                  data-[state=checked]:bg-blue-600
                  data-[state=unchecked]:bg-gray-300
                  data-[state=checked]:hover:bg-blue-700
                  data-[state=unchecked]:hover:bg-gray-400
                "
              />
            </div>

            <div className="flex gap-3 pt-2">
              <DrawerClose asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
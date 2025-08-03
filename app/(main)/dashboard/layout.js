

import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { Toaster } from "@/components/ui/sonner"; // For toast notifications

export default function Layout() {
  return (
    <div className="px-4 py-6 md:px-6 md:py-8">
      {/* Toast notifications for account updates */}
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Your Dashboard
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            Overview of your financial accounts and activities
          </p>
        </div>
        
        <div className="flex gap-3">
          <CreateAccountDrawer>
            <Button 
              className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              aria-label="Add new account"
            >
              <Plus className="h-4 w-4" />
              Add Account
            </Button>
          </CreateAccountDrawer>
        </div>
      </div>

      {/* Content with Suspense */}
      <Suspense
        fallback={
          <div className="mt-8">
            <BarLoader 
              width="100%" 
              color="#3b82f6" 
              height={4}
              cssOverride={{
                borderRadius: '4px'
              }}
            />
            <p className="text-gray-500 text-center mt-3">Loading your dashboard...</p>
          </div>
        }
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, CreditCard, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">TaskFlow Pro</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-blue-500/20 transition-all duration-200"
                  >
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                      <AvatarImage src={user.imageUrl} alt="User avatar" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                        {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 bg-white/95 backdrop-blur-md border border-white/20 shadow-xl"
                >
                  <div className="px-3 py-2 border-b border-slate-200/50">
                    <p className="text-sm font-medium text-slate-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                  
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-blue-50">
                    <Link href="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-blue-600" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-purple-50">
                    <Link href="/subscribe" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4 text-purple-600" />
                      <span>Upgrade Plan</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="cursor-pointer hover:bg-red-50 text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" asChild className="hover-lift">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover-lift">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

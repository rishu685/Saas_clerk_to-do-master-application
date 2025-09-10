import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          className={`w-10 h-10 ${
            i === currentPage 
              ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" 
              : "hover-lift"
          }`}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="hover-lift"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {renderPageNumbers()}
      
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
        className="hover-lift"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

import React from 'react';
import { StickyNote } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <StickyNote className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">シンプルメモ帳</h1>
        </div>
      </div>
    </header>
  );
}
import React, { useState, useMemo } from 'react';
import { PlusCircle, Trash2, Search } from 'lucide-react';
import { Memo } from '../types';

interface MemoListProps {
  memos: Memo[];
  selectedMemo: Memo | null;
  onSelectMemo: (memo: Memo) => void;
  onDeleteMemo: (id: string) => void;
  onCreateNew: () => void;
}

export function MemoList({ memos, selectedMemo, onSelectMemo, onDeleteMemo, onCreateNew }: MemoListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMemos = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return memos;
    
    return memos.filter(memo => 
      memo.title.toLowerCase().includes(query) || 
      memo.content.toLowerCase().includes(query)
    );
  }, [memos, searchQuery]);

  return (
    <div className="w-1/3 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-4 bg-gradient-to-b from-gray-50 to-white border-b">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">メモ一覧</h2>
          <button
            onClick={onCreateNew}
            className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <PlusCircle className="w-5 h-5" />
            <span>新規作成</span>
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="メモを検索..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      <div className="divide-y divide-gray-100 max-h-[calc(100vh-16rem)] overflow-y-auto">
        {filteredMemos.map(memo => (
          <div
            key={memo.id}
            className={`p-4 cursor-pointer transition-all duration-200 ${
              selectedMemo?.id === memo.id
                ? 'bg-blue-50 border-l-4 border-l-blue-500'
                : 'hover:bg-gray-50 border-l-4 border-l-transparent'
            }`}
            onClick={() => onSelectMemo(memo)}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{memo.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{memo.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  更新: {memo.updatedAt}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteMemo(memo.id);
                }}
                className="text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {filteredMemos.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            {searchQuery
              ? "検索条件に一致するメモが見つかりませんでした。"
              : "メモがありません。新規作成ボタンからメモを追加してください。"}
          </div>
        )}
      </div>
    </div>
  );
}
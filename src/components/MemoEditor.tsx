import React from 'react';
import { Save } from 'lucide-react';

interface MemoEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSave: () => void;
}

export function MemoEditor({ title, content, onTitleChange, onContentChange, onSave }: MemoEditorProps) {
  return (
    <div className="w-2/3 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
      <div className="p-6 flex-1">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg"
            placeholder="タイトルを入力"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            メモ内容
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            rows={12}
            className="w-full px-4 py-2 rounded-lg resize-none"
            placeholder="メモ内容を入力"
          />
        </div>
      </div>
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex justify-end">
          <button
            onClick={onSave}
            disabled={!title.trim()}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Save className="w-4 h-4" />
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
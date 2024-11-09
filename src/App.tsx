import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MemoList } from './components/MemoList';
import { MemoEditor } from './components/MemoEditor';
import type { Memo } from './types';

function App() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedMemos = localStorage.getItem('memos');
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos));
    }
  }, []);

  const saveMemo = () => {
    if (!title.trim()) return;

    const now = new Date().toLocaleString('ja-JP');
    let newMemos: Memo[];

    if (selectedMemo) {
      newMemos = memos.filter(memo => memo.id !== selectedMemo.id);
      const updatedMemo = {
        ...selectedMemo,
        title,
        content,
        updatedAt: now
      };
      newMemos = [updatedMemo, ...newMemos];
    } else {
      const newMemo = {
        id: Date.now().toString(),
        title,
        content,
        updatedAt: now
      };
      newMemos = [newMemo, ...memos];
    }

    setMemos(newMemos);
    localStorage.setItem('memos', JSON.stringify(newMemos));
    resetForm();
  };

  const deleteMemo = (id: string) => {
    const newMemos = memos.filter(memo => memo.id !== id);
    setMemos(newMemos);
    localStorage.setItem('memos', JSON.stringify(newMemos));
    if (selectedMemo?.id === id) {
      resetForm();
    }
  };

  const selectMemo = (memo: Memo) => {
    setSelectedMemo(memo);
    setTitle(memo.title);
    setContent(memo.content);
  };

  const resetForm = () => {
    setSelectedMemo(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6 h-[calc(100vh-8rem)]">
          <MemoList
            memos={memos}
            selectedMemo={selectedMemo}
            onSelectMemo={selectMemo}
            onDeleteMemo={deleteMemo}
            onCreateNew={resetForm}
          />
          <MemoEditor
            title={title}
            content={content}
            onTitleChange={setTitle}
            onContentChange={setContent}
            onSave={saveMemo}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
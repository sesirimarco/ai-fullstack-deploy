'use client';

import { createEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewEntryCard = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleNewEntry = async () => {
    setLoading(true);
    const data = await createEntry();
    setLoading(false);
    router.push(`/journal/${data.id}`);
  };
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <button
        className="flex px-4 py-5 sm:p-6"
        onClick={handleNewEntry}
        disabled={loading}
      >
        <span className="text-3xl">New Entry</span>
        {loading ? (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-20 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : null}
      </button>
    </div>
  );
};

export default NewEntryCard;

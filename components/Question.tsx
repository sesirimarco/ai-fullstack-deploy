'use client';
import { askQuestion } from '@/utils/api';
import React, { useState } from 'react';

const Question = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue('');
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={onSubmitHandler} className="flex p-8">
        <input
          type="text"
          value={value}
          disabled={loading}
          onChange={(e: any) => setValue(e.target.value)}
          className="border border-black/20 py-2 px-4 rounded-lg text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg ml-2"
        >
          Ask
        </button>
      </form>
      {loading ? <div className="px-8">Loading...</div> : null}
      {!!response?.length  && !loading? <div className="px-8">{response}</div> : null}
    </>
  );
};

export default Question;

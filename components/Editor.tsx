'use client';

import { updateEntry } from '@/utils/api';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import { getOppositeColor } from '@/utils/helpers';

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry?.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const analysisData = [
    { name: 'Summary', value: analysis?.summary },
    { name: 'Subject', value: analysis?.subject },
    { name: 'Mood', value: analysis?.mood },
    { name: 'Negative', value: analysis?.negative },
  ];
  useAutosave({
    data: value,
    onSave: async (val) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, val);
      setAnalysis(data.analysis);
      setIsLoading(false);
    },
  });
  console.log(analysis?.color);
  return (
    <div className="w-full h-full flex">
      <div className="w-10/12">
        <textarea
          value={value}
          className="w-full h-full px-8 text-xl outline-none"
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
      <div className="border-l border-black-10 w-1/4">
        <div
          className="flex px-6 py-10"
          style={{ backgroundColor: analysis?.color }}
        >
          <h2 className="text-2xl">Analysis</h2>
          {isLoading ? (
            <div
              className={`w-[16px] h-[16px] m-2 rounded-full animate-spin border border-solid border-[${getOppositeColor(
                analysis?.color,
              )}] border-t-transparent`}
            ></div>
          ) : (
            ''
          )}
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={uuidv4()}
                className="flex items-center justify-between px-2 py-4 border-b border-black/10"
              >
                <span className="text-lg font-semibold pl-4">{item.name}</span>
                <span className="px-6">{item.value?.toString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Editor;

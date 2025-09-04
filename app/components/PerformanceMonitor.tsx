'use client';

import { useEffect, useState } from 'react';

interface PerformanceMonitorProps {
  searchTerm: string;
  resultCount: number;
}

export function PerformanceMonitor({ searchTerm, resultCount }: PerformanceMonitorProps) {
  const [searchTime, setSearchTime] = useState<number>(0);
  const [lastSearchTerm, setLastSearchTerm] = useState<string>('');

  useEffect(() => {
    if (searchTerm !== lastSearchTerm) {
      const startTime = performance.now();
      
      // 使用 requestAnimationFrame 来测量实际的渲染时间
      requestAnimationFrame(() => {
        const endTime = performance.now();
        setSearchTime(endTime - startTime);
      });
      
      setLastSearchTerm(searchTerm);
    }
  }, [searchTerm, resultCount, lastSearchTerm]);

  if (!searchTerm.trim()) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white text-xs px-3 py-2 rounded-lg">
      <div>搜索耗时: {searchTime.toFixed(2)}ms</div>
      <div>结果数量: {resultCount}</div>
    </div>
  );
}

import { useState, useEffect } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  webDataCount: number;
  tradeDataCount: number;
}

export function SearchBar({ searchTerm, onSearchChange, webDataCount, tradeDataCount }: SearchBarProps) {
  const [isSearching, setIsSearching] = useState(false);

  // 当搜索词变化时显示搜索状态
  useEffect(() => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 100);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm]);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="输入要搜索的键值 (例如: WELaunch.airdrop_tokens, WELaunch.avilible)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
        
        {/* 搜索状态指示器 */}
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <span>数据源:</span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          web.json ({webDataCount} 个键值)
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          trade.json ({tradeDataCount} 个键值)
        </span>
        
        {/* 搜索提示 */}
        {/* {searchTerm.trim() && (
          <span className="text-xs text-gray-500">
            防抖搜索中... (300ms)
          </span>
        )} */}
      </div>
    </div>
  );
}

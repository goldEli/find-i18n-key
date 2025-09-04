import { memo } from 'react';
import { SearchResultItem } from './SearchResultItem';
import { KeyUsageWithSource } from '../types';

interface SearchResultsProps {
  filteredResults: KeyUsageWithSource[];
  searchTerm: string;
}

// 使用 memo 避免不必要的重渲染
export const SearchResults = memo(function SearchResults({ filteredResults, searchTerm }: SearchResultsProps) {
  if (filteredResults.length === 0) {
    return (
      <div className="px-6 py-12 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到匹配的键值</h3>
        <p className="mt-1 text-sm text-gray-500">
          {searchTerm ? `没有找到包含 "${searchTerm}" 的键值` : '请输入搜索关键词'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div className="divide-y divide-gray-200">
        {filteredResults.map((item, index) => (
          <SearchResultItem 
            key={`${item.source}-${item.key}-${index}`} 
            item={item} 
            index={index} 
          />
        ))}
      </div>
      
      {/* 结果统计 */}
      <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500 text-center">
        显示 {filteredResults.length} 个结果
        {searchTerm && (
          <span className="ml-2">
            (搜索: "{searchTerm}")
          </span>
        )}
      </div>
    </div>
  );
});

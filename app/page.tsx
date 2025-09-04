'use client';

import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { LoadingSpinner } from './components/LoadingSpinner';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { useSearchData } from './hooks/useSearchData';

export default function Home() {
  const {
    searchTerm,
    webData,
    tradeData,
    filteredResults,
    isLoading,
    handleSearchChange,
  } = useSearchData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          webDataCount={webData?.keyUsage?.length || 0}
          tradeDataCount={tradeData?.keyUsage?.length || 0}
        />

        {/* Results Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                搜索结果 ({filteredResults.length})
              </h2>
            </div>
            
            <SearchResults 
              filteredResults={filteredResults}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>

      {/* 性能监控 */}
      <PerformanceMonitor 
        searchTerm={searchTerm}
        resultCount={filteredResults.length}
      />
    </div>
  );
}

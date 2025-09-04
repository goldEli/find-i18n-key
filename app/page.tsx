'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface KeyUsage {
  key: string;
  routes: string[];
}

interface DataFile {
  keyUsage: KeyUsage[];
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [webData, setWebData] = useState<DataFile | null>(null);
  const [tradeData, setTradeData] = useState<DataFile | null>(null);
  const [filteredResults, setFilteredResults] = useState<Array<KeyUsage & { source: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 加载数据文件
    const loadData = async () => {
      try {
        const [webResponse, tradeResponse] = await Promise.all([
          fetch('/data/web.json'),
          fetch('/data/trade.json')
        ]);

        if (webResponse.ok) {
          const webData = await webResponse.json();
          setWebData(webData);
        }

        if (tradeResponse.ok) {
          const tradeData = await tradeResponse.json();
          setTradeData(tradeData);
        }
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // 搜索过滤逻辑
    if (!webData && !tradeData) return;

    const allData: Array<KeyUsage & { source: string }> = [];
    
    if (webData) {
      allData.push(...webData.keyUsage.map(item => ({ ...item, source: 'web.json' })));
    }
    
    if (tradeData) {
      allData.push(...tradeData.keyUsage.map(item => ({ ...item, source: 'trade.json' })));
    }

    if (!searchTerm.trim()) {
      setFilteredResults(allData);
      return;
    }

    const filtered = allData.filter(item =>
      item.key.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredResults(filtered);
  }, [searchTerm, webData, tradeData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">加载数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Image
              src="/globe.svg"
              alt="Globe icon"
              width={32}
              height={32}
              className="text-blue-600"
            />
            <h1 className="text-2xl font-bold text-gray-900">国际化键值搜索</h1>
          </div>
          {/* <p className="mt-2 text-gray-600">搜索 web.json 和 trade.json 中的国际化键值</p> */}
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="输入要搜索的键值 (例如: wxtPreIco, address_management)"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span>数据源:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              web.json ({webData?.keyUsage?.length || 0} 个键值)
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              trade.json ({tradeData?.keyUsage?.length || 0} 个键值)
            </span>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                搜索结果 ({filteredResults.length})
              </h2>
            </div>
            
            {filteredResults.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到匹配的键值</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? `没有找到包含 "${searchTerm}" 的键值` : '请输入搜索关键词'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredResults.map((item, index) => (
                  <div key={`${item.source}-${index}`} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-medium text-gray-900 font-mono">
                            {item.key}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.source === 'web.json' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {item.source}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">路由:</span>
                          </div>
                                                     <div className="flex flex-wrap gap-2">
                             {item.routes.map((route, routeIndex) => (
                               <HoverCard key={routeIndex}>
                                 <HoverCardTrigger asChild>
                                   <span className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer">
                                     {route}
                                   </span>
                                 </HoverCardTrigger>
                                 <HoverCardContent className="w-auto p-3">
                                   <div className="flex flex-col gap-2">
                                     <div className="flex items-center gap-2">
                                       <span className="text-gray-600 text-xs font-medium">生产:</span>
                                       <a 
                                         href={`https://weex.com${route}`} 
                                         target="_blank" 
                                         rel="noopener noreferrer"
                                         className="text-blue-600 hover:text-blue-500 underline hover:no-underline text-xs"
                                       >
                                         weex.com{route}
                                       </a>
                                     </div>
                                     <div className="flex items-center gap-2">
                                       <span className="text-gray-600 text-xs font-medium">测试:</span>
                                       <a 
                                         href={`https://stg-www3.weex.tech/zh-TW${route}`} 
                                         target="_blank" 
                                         rel="noopener noreferrer"
                                         className="text-green-600 hover:text-green-500 underline hover:no-underline text-xs"
                                       >
                                         stg-www3.weex.tech/zh-TW{route}
                                       </a>
                                     </div>
                                   </div>
                                 </HoverCardContent>
                               </HoverCard>
                             ))}
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

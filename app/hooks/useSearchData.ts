import { useState, useEffect, useMemo, useCallback } from 'react';
import { DataFile, KeyUsageWithSource } from '../types';

// 防抖函数
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useSearchData() {
  const [searchTerm, setSearchTerm] = useState('');
  const [webData, setWebData] = useState<DataFile | null>(null);
  const [tradeData, setTradeData] = useState<DataFile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 使用防抖，延迟 300ms 执行搜索
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // 合并所有数据，使用 useMemo 避免重复计算
  const allData = useMemo(() => {
    if (!webData && !tradeData) return [];
    
    const data: KeyUsageWithSource[] = [];
    
    if (webData) {
      data.push(...webData.keyUsage.map(item => ({ ...item, source: 'web.json' })));
    }
    
    if (tradeData) {
      data.push(...tradeData.keyUsage.map(item => ({ ...item, source: 'trade.json' })));
    }
    
    return data;
  }, [webData, tradeData]);

  // 过滤结果，使用 useMemo 避免重复计算
  const filteredResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return allData;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    
    // 使用更高效的过滤算法
    return allData.filter(item => {
      // 如果搜索词很短，使用 includes 检查
      if (searchLower.length <= 3) {
        return item.key.toLowerCase().includes(searchLower);
      }
      
      // 对于较长的搜索词，使用更智能的匹配
      const keyParts = item.key.toLowerCase().split('.');
      const searchParts = searchLower.split('.');
      
      // 检查是否所有搜索部分都能在键中找到
      return searchParts.every(part => 
        keyParts.some(keyPart => keyPart.includes(part))
      );
    });
  }, [debouncedSearchTerm, allData]);

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

  // 使用 useCallback 优化函数引用
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return {
    searchTerm,
    webData,
    tradeData,
    filteredResults,
    isLoading,
    handleSearchChange,
  };
}

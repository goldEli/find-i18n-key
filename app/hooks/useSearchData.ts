import { useState, useEffect } from 'react';
import { DataFile, KeyUsageWithSource } from '../types';

export function useSearchData() {
  const [searchTerm, setSearchTerm] = useState('');
  const [webData, setWebData] = useState<DataFile | null>(null);
  const [tradeData, setTradeData] = useState<DataFile | null>(null);
  const [filteredResults, setFilteredResults] = useState<KeyUsageWithSource[]>([]);
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

    const allData: KeyUsageWithSource[] = [];
    
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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return {
    searchTerm,
    webData,
    tradeData,
    filteredResults,
    isLoading,
    handleSearchChange,
  };
}

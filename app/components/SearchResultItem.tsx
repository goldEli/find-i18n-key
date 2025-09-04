import { memo } from 'react';
import { RouteHoverCard } from './RouteHoverCard';
import { KeyUsageWithSource } from '../types';

interface SearchResultItemProps {
  item: KeyUsageWithSource;
  index: number;
}

// 使用 memo 避免不必要的重渲染
export const SearchResultItem = memo(function SearchResultItem({ item, index }: SearchResultItemProps) {
  return (
    <div key={`${item.source}-${index}`} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
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
                <RouteHoverCard key={routeIndex} route={route} routeIndex={routeIndex} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

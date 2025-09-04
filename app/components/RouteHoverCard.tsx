import { memo } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface RouteHoverCardProps {
  route: string;
  routeIndex: number;
}

// 使用 memo 避免不必要的重渲染
export const RouteHoverCard = memo(function RouteHoverCard({ route, routeIndex }: RouteHoverCardProps) {
  return (
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
  );
});

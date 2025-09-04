import Image from 'next/image';

export function Header() {
  return (
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
  );
}

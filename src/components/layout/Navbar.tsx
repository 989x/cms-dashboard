import Image from 'next/image';

export default function Navbar() {
  const user = { name: 'Admin', status: 'Online' };

  return (
    <nav className="w-full py-4 px-4 sm:px-8 shadow">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/favicon.ico"
            alt="CMS Dashboard Logo"
            width={24}
            height={24}
            className="rounded-full"
          />
          <h1 className="sm:text-lg font-bold">CMS Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Status: {user.status}</span>
          </div>
          <span className="text-sm font-semibold">{user.name}</span>
        </div>
      </div>
    </nav>
  );
}

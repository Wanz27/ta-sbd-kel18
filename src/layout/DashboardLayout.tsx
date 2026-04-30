import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, HelpCircle, LogOut, LayoutDashboard, Calendar, Archive, History, BookOpen, Bookmark } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  role: 'admin' | 'user';
  userName: string;
  userRole: string;
}

export default function DashboardLayout({ children, role, userName, userRole }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Fungsi untuk menangani aksi logout
  const handleLogout = () => {
    // Kalau nanti sudah ada backend, kamu bisa tambahkan kode untuk menghapus token/session di sini
    
    // Arahkan kembali ke halaman register/login
    navigate('/register');
  };

  const adminMenu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin-dashboard' },
    { name: 'Room Management', icon: Calendar, path: '/room-management' },
    { name: 'Bookings', icon: BookOpen, path: '/bookings' },
    { name: 'Archived Rooms', icon: Archive, path: '/archived-rooms' },
    { name: 'Booking History', icon: History, path: '/booking-history' },
  ];

  const userMenu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/user-dashboard' },
    { name: 'Room Catalog', icon: BookOpen, path: '/room-catalog' },
    { name: 'My Bookings', icon: Bookmark, path: '/my-bookings' },
  ];

  const menu = role === 'admin' ? adminMenu : userMenu;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141C2F] text-slate-300 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#0088FF] p-2 rounded-lg text-white font-bold">
            {role === 'admin' ? '🏢' : 'P'}
          </div>
          <div>
            <h1 className="text-white font-bold tracking-wider">TEKSPACE</h1>
            <p className="text-xs text-slate-400">
              {role === 'admin' ? 'Corporate HQ' : 'CORPORATE PORTAL'}
            </p>
          </div>
        </div>

        <nav className="flex-1 mt-4">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <a
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-6 py-3 hover:bg-slate-800 transition-colors ${
                  isActive ? 'bg-slate-800 border-l-4 border-[#0088FF] text-white' : ''
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-[#0088FF]' : ''} />
                {item.name}
              </a>
            );
          })}
        </nav>

        <div className="p-4">
          {role === 'user' && (
            <button className="w-full mb-4 bg-[#0088FF] text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition">
              + Book Now
            </button>
          )}
          {/* Tombol Logout yang sudah ditambahkan fungsi onClick */}
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-2 py-3 w-full hover:text-white transition"
          >
            <LogOut size={20} />
            {role === 'admin' ? 'Logout' : 'Log Out'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-lg w-96 border border-slate-200">
            <Search size={20} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search rooms or bookings..."
              className="bg-transparent border-none outline-none w-full text-sm"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-600"><Bell size={20} /></button>
            <button className="text-slate-400 hover:text-slate-600"><HelpCircle size={20} /></button>
            <div className="flex items-center gap-3 border-l pl-6">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">{userName}</p>
                <p className="text-xs text-slate-500">{userRole}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
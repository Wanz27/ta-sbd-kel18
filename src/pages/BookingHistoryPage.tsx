import { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

// Data dummy untuk riwayat pemesanan
const initialHistory = [
  {
    id: '#BK-8821',
    user: { name: 'Jonathan Wright', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jonathan' },
    room: 'The Glass Boardroom',
    date: 'Oct 24, 2023',
    duration: '2h 30m',
    status: 'Completed',
  },
  {
    id: '#BK-8819',
    user: { name: 'Sarah Jenkins', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    room: 'Creative Suite A',
    date: 'Oct 23, 2023',
    duration: '1h 00m',
    status: 'Canceled',
  },
  {
    id: '#BK-8815',
    user: { name: 'Marcus Thorne', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' },
    room: 'Zen Focus Room',
    date: 'Oct 22, 2023',
    duration: '45m',
    status: 'No Show',
  },
  {
    id: '#BK-8812',
    user: { name: 'Elena Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
    room: 'Main Conference Hall',
    date: 'Oct 22, 2023',
    duration: '4h 00m',
    status: 'Completed',
  },
  {
    id: '#BK-8808',
    user: { name: 'Robert Sterling', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
    room: 'The Glass Boardroom',
    date: 'Oct 21, 2023',
    duration: '3h 00m',
    status: 'Completed',
  },
];

type TabType = 'All' | 'Completed' | 'Canceled' | 'No Show';

export default function BookingHistoryPage() {
  const auth = useAuth() as any;
  const adminName = auth?.fullName || localStorage.getItem('userName') || 'System Admin';

  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Logika Filter Data (Berdasarkan Tab & Pencarian)
  const filteredData = initialHistory.filter((item) => {
    const matchTab = activeTab === 'All' || item.status === activeTab;
    const matchSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  // Helper untuk styling badge status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Completed</span>;
      case 'Canceled':
        return <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold">Canceled</span>;
      case 'No Show':
        return <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">No Show</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <DashboardLayout role="admin" userName={adminName}>
      <div className="p-8 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-slate-900 mb-2">Booking History</h1>
          <p className="text-slate-500 text-[15px]">Review and manage past facility utilization and administrative logs.</p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative">
            <span className="absolute top-6 right-6 bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-md">+12%</span>
            <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center mb-6 border border-sky-100">
              <Calendar size={20} className="text-[#0065A1]" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Bookings</p>
            <h3 className="text-3xl font-bold text-slate-900">1,240</h3>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative">
            <span className="absolute top-6 right-6 text-slate-500 text-xs font-bold">92% Rate</span>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-6 border border-emerald-100">
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Completed</p>
            <h3 className="text-3xl font-bold text-slate-900">1,150</h3>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative">
            <span className="absolute top-6 right-6 text-rose-500 text-xs font-bold">3.6% Rate</span>
            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center mb-6 border border-rose-100">
              <XCircle size={20} className="text-rose-600" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Canceled</p>
            <h3 className="text-3xl font-bold text-slate-900">45</h3>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Controls: Tabs & Search */}
          <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Tabs */}
            <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-200">
              {(['All', 'Completed', 'Canceled', 'No Show'] as TabType[]).map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                    activeTab === tab 
                      ? 'bg-white text-[#0065A1] shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full lg:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by ID or User..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0065A1] focus:ring-1 focus:ring-[#0065A1] transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap">
                <Filter size={16} /> Advanced Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50/50">
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-4 px-6 text-left font-bold text-[12px] whitespace-nowrap">Booking ID</th>
                  <th className="py-4 px-6 text-left font-bold text-[12px] whitespace-nowrap">User</th>
                  <th className="py-4 px-6 text-left font-bold text-[12px] whitespace-nowrap">Room Name</th>
                  <th className="py-4 px-6 text-left font-bold text-[12px] whitespace-nowrap">Date</th>
                  <th className="py-4 px-6 text-left font-bold text-[12px] whitespace-nowrap">Duration</th>
                  <th className="py-4 px-6 text-left font-bold text-[12px] whitespace-nowrap">Status</th>
                  <th className="py-4 px-6 text-right font-bold text-[12px] whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#0065A1]">{item.id}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={item.user.avatar} alt={item.user.name} className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300" />
                          <span className="font-semibold text-slate-800">{item.user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-700">{item.room}</td>
                      <td className="py-4 px-6 text-slate-700">{item.date}</td>
                      <td className="py-4 px-6 text-slate-700">{item.duration}</td>
                      <td className="py-4 px-6">{getStatusBadge(item.status)}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-[#0065A1] font-bold hover:text-blue-800 hover:underline transition-colors text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      Tidak ada riwayat pemesanan yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
            <span className="text-slate-500">Showing 1 to {filteredData.length} of 1,240 entries</span>
            <div className="flex items-center gap-1.5">
              <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-500"><ChevronLeft size={16} /></button>
              <button className="w-8 h-8 rounded border border-[#0065A1] bg-[#0065A1] text-white flex items-center justify-center font-bold">1</button>
              <button className="w-8 h-8 rounded border border-transparent flex items-center justify-center hover:bg-slate-50 transition text-slate-700 font-medium">2</button>
              <button className="w-8 h-8 rounded border border-transparent flex items-center justify-center hover:bg-slate-50 transition text-slate-700 font-medium">3</button>
              <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
              <button className="w-8 h-8 rounded border border-transparent flex items-center justify-center hover:bg-slate-50 transition text-slate-700 font-medium">248</button>
              <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-500"><ChevronRight size={16} /></button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
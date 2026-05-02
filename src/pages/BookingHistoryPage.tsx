import { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Calendar, CheckCircle2, XCircle, Search, Filter, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

type TabType = 'All' | 'Completed' | 'Canceled' | 'No Show';

export default function BookingHistoryPage() {
  const auth = useAuth() as any;
  const adminName = auth?.fullName || localStorage.getItem('userName') || 'System Admin';

  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .neq('status', 'pending') // Ambil yang bukan pending
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (data) setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredData = history.filter((item) => {
    const matchTab = activeTab === 'All' || item.status === activeTab;
    const matchSearch = item.room_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.user_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  const getStatusBadge = (status: string) => {
    const styles: any = {
      Completed: 'bg-emerald-100 text-emerald-700',
      Canceled: 'bg-rose-100 text-rose-700',
      'No Show': 'bg-orange-100 text-orange-700'
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>;
  };

  // Menghitung statistik berdasarkan data real dari Supabase
  const totalBookings = history.length;
  const completedCount = history.filter(h => h.status === 'Completed').length;
  const canceledCount = history.filter(h => h.status === 'Canceled').length;

  return (
    <DashboardLayout role="admin" userName={adminName}>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-slate-900 mb-2">Booking History</h1>
          <p className="text-slate-500 text-[15px]">Review past facility utilization from Supabase database.</p>
        </div>

        {/* STATS CARDS RESTORED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center mb-6 border border-sky-100">
              <Calendar size={20} className="text-[#0065A1]" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Bookings</p>
            <h3 className="text-3xl font-bold text-slate-900">{totalBookings}</h3>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-6 border border-emerald-100">
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Completed</p>
            <h3 className="text-3xl font-bold text-slate-900">{completedCount}</h3>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center mb-6 border border-rose-100">
              <XCircle size={20} className="text-rose-600" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Canceled</p>
            <h3 className="text-3xl font-bold text-slate-900">{canceledCount}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-200">
              {(['All', 'Completed', 'Canceled', 'No Show'] as TabType[]).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tab ? 'bg-white text-[#0065A1] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>{tab}</button>
              ))}
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full lg:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0065A1]" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap">
                <Filter size={16} /> Advanced Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50/50">
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-4 px-6 text-left font-bold text-[12px] whitespace-nowrap">User Name</th>
                  <th className="py-4 px-6 text-left font-bold text-[12px] whitespace-nowrap">Room Name</th>
                  <th className="py-4 px-6 text-left font-bold text-[12px] whitespace-nowrap">Date & Duration</th>
                  <th className="py-4 px-6 text-left font-bold text-[12px] whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={4} className="py-8 text-center"><Loader2 className="animate-spin mx-auto mb-2" />Loading history...</td></tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50">
                      <td className="py-4 px-6 font-semibold text-slate-800">{item.user_name}</td>
                      <td className="py-4 px-6 text-slate-700">{item.room_name}</td>
                      <td className="py-4 px-6 text-slate-700">{item.date_time || item.date}</td>
                      <td className="py-4 px-6">{getStatusBadge(item.status)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={4} className="py-12 text-center text-slate-500">No matching history found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination UI */}
          <div className="p-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
            <span className="text-slate-500">Showing {filteredData.length} entries</span>
            <div className="flex items-center gap-1.5">
              <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-500"><ChevronLeft size={16} /></button>
              <button className="w-8 h-8 rounded border border-[#0065A1] bg-[#0065A1] text-white flex items-center justify-center font-bold">1</button>
              <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-500"><ChevronRight size={16} /></button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
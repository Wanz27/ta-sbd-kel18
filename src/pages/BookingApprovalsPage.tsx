import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock3, LayoutDashboard, Loader2 } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase'; 

type BookingRequest = {
  id: string;
  user_name: string;
  department: string;
  room_name: string;
  date_time: string;
  purpose: string;
  seats: string;
  status: 'pending' | 'approved' | 'rejected';
};

export default function BookingApprovalsPage() {
  const auth = useAuth() as any;
  const adminName = auth?.fullName || localStorage.getItem('userName') || 'System Admin';

  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4; 

  // 1. FETCH DATA DARI SUPABASE
  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setRequests(data);
      }
    } catch (error: any) {
      console.error('Error fetching bookings:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. FUNGSI UPDATE KE SUPABASE
  const updateStatusInDB = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setRequests((prev) => prev.filter((req) => req.id !== id));
      
    } catch (error: any) {
      console.error('Error updating status:', error.message);
      alert('Failed to update status. Please try again.');
    }
  };

  // Action Handlers
  const handleApprove = async (id: string, userName: string) => {
    await updateStatusInDB(id, 'approved');
    alert(`The booking request from ${userName} has been successfully approved!`);
  };

  const handleReject = async (id: string, userName: string) => {
    const confirmReject = window.confirm(`Are you sure you want to reject the booking request from ${userName}?`);
    if (confirmReject) {
      await updateStatusInDB(id, 'rejected');
    }
  };

  // Statistik Dummy (Untuk Card)
  const pendingCount = requests.length;
  const utilizedRooms = 12; 
  const totalRooms = 18;    
  const rescheduledCount = 15; 
  const urgentConflicts = 3;   

  // Logika Pagination
  const totalPages = Math.ceil(pendingCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = requests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  return (
    <DashboardLayout role="admin" userName={adminName}>
      <div className="px-2 py-6 md:px-8 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-slate-900">Booking Approvals</h1>
            <p className="text-slate-600">Review and manage pending room reservation requests directly from Supabase.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <span className="text-slate-500 text-sm font-medium">Filter:</span>
            <button className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition">All Pending</button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden">
            <div className="text-sky-700 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 border border-sky-100">
              <Clock3 size={24} />
            </div>
            <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Pending Requests</div>
            <div className="text-3xl font-bold text-slate-900">{pendingCount}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-amber-700 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 border border-amber-100">
              <LayoutDashboard size={24} />
            </div>
            <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Rooms Utilized</div>
            <div className="text-3xl font-bold text-slate-900">{utilizedRooms} / {totalRooms}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-violet-700 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 border border-violet-100">
              <CheckCircle2 size={24} />
            </div>
            <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Rescheduled</div>
            <div className="text-3xl font-bold text-slate-900">{rescheduledCount}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-rose-700 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 border border-rose-100">
              <XCircle size={24} />
            </div>
            <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Urgent Conflicts</div>
            <div className="text-3xl font-bold text-slate-900">{urgentConflicts}</div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-bold text-slate-900">Queue of Pending Requests</h2>
            <div className="text-sm text-slate-500 font-medium">
              Showing {currentData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + ITEMS_PER_PAGE, pendingCount)} of {pendingCount} results
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-700">
              <thead className="bg-slate-50/50">
                <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">User Name</th>
                  <th className="px-6 py-4">Room Requested</th>
                  <th className="px-6 py-4">Date/Time</th>
                  <th className="px-6 py-4">Purpose</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#0065A1]" />
                      <p>Loading data from Supabase...</p>
                    </td>
                  </tr>
                ) : currentData.length > 0 ? (
                  currentData.map((request) => (
                    <tr key={request.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm uppercase">
                            {request.user_name ? request.user_name.substring(0, 2) : 'US'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{request.user_name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{request.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-900">{request.room_name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{request.seats}</div>
                      </td>
                      <td className="px-6 py-5 text-slate-600">{request.date_time}</td>
                      <td className="px-6 py-5 text-slate-600">{request.purpose}</td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleReject(request.id, request.user_name)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-50 active:scale-95"
                          >
                            <XCircle size={14} /> Reject
                          </button>
                          <button
                            onClick={() => handleApprove(request.id, request.user_name)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0065A1] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-800 transition active:scale-95"
                          >
                            <CheckCircle2 size={14} /> Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      All caught up! There are no pending requests to process. 🎉
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* KONTROL PAGINATION */}
          <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-slate-500 font-medium hover:text-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages > 0 ? totalPages : 1)].map((_, i) => (
                <button 
                  key={i} onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-md font-medium flex items-center justify-center transition-colors ${
                    currentPage === i + 1 ? 'bg-[#0065A1] text-white font-bold shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="text-slate-500 font-medium hover:text-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
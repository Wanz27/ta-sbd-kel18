import { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { 
  Filter, 
  ClipboardList, 
  Building2, 
  CalendarDays, 
  AlertCircle,
  X,
  Check
} from 'lucide-react';

// Data awal untuk tabel pending requests
const initialRequests = [
  {
    id: 1,
    user: { name: 'Jonathan Smith', dept: 'Marketing Department', initials: 'JS', color: 'bg-indigo-100 text-indigo-700' },
    room: { name: 'Boardroom A', details: 'Floor 4 • 20 Seats' },
    schedule: { date: 'Oct 12, 2023', time: '09:00 AM - 11:30 AM' },
    purpose: 'Quarterly Strategic Planning S...',
  },
  {
    id: 2,
    user: { name: 'Alice Wong', dept: 'Product Design', initials: 'AW', color: 'bg-orange-100 text-orange-700' },
    room: { name: 'Creative Studio', details: 'Floor 2 • 8 Seats' },
    schedule: { date: 'Oct 12, 2023', time: '02:00 PM - 04:00 PM' },
    purpose: 'Sprint Retrospective',
  },
  {
    id: 3,
    user: { name: 'Michael Lee', dept: 'Human Resources', initials: 'ML', color: 'bg-blue-100 text-blue-700' },
    room: { name: 'Interview Room 3', details: 'Floor 1 • 4 Seats' },
    schedule: { date: 'Oct 13, 2023', time: '10:00 AM - 11:00 AM' },
    purpose: 'Candidate Interview: Senior De...',
  },
  {
    id: 4,
    user: { name: 'David Garcia', dept: 'Sales Team', initials: 'DG', color: 'bg-slate-200 text-slate-700' },
    room: { name: 'South Hub', details: 'Floor 3 • 12 Seats' },
    schedule: { date: 'Oct 13, 2023', time: '03:30 PM - 05:00 PM' },
    purpose: 'Client Demo: Global Partners',
  },
];

export default function BookingsPage() {
  const auth = useAuth() as any;
  const adminName = auth?.fullName || localStorage.getItem('userName') || 'System Admin';

  // State untuk menyimpan daftar antrean
  const [requests, setRequests] = useState(initialRequests);

  // Fungsi saat tombol Approve dipencet
  const handleApprove = (id: number, userName: string) => {
    // Di aplikasi asli, di sini nanti ada kodingan update ke Supabase
    alert(`Booking dari ${userName} berhasil di-Approve!`);
    
    // Hapus data dari antrean (UI)
    setRequests(requests.filter(req => req.id !== id));
  };

  // Fungsi saat tombol Reject dipencet
  const handleReject = (id: number, userName: string) => {
    const confirmReject = window.confirm(`Apakah Anda yakin ingin menolak booking dari ${userName}?`);
    if (confirmReject) {
      // Di aplikasi asli, di sini nanti ada kodingan update ke Supabase
      setRequests(requests.filter(req => req.id !== id));
    }
  };

  return (
    <DashboardLayout role="admin" userName={adminName}>
      <div className="p-8 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[32px] font-bold text-slate-900 mb-2">Booking Approvals</h1>
            <p className="text-slate-500 text-[15px]">Review and manage pending room reservation requests.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={18} />
            Filter: All Pending
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Card 1 (Dinamis mengikuti jumlah state) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
            {requests.length > 0 && (
              <span className="absolute top-6 right-6 bg-sky-50 text-sky-600 text-xs font-bold px-2 py-1 rounded-md">New</span>
            )}
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
              <ClipboardList size={20} className="text-blue-600" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Requests</p>
            <h3 className="text-3xl font-bold text-slate-900">{requests.length}</h3>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-6">
              <Building2 size={20} className="text-orange-600" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Rooms Utilized</p>
            <h3 className="text-3xl font-bold text-slate-900">12 / 18</h3>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-6">
              <CalendarDays size={20} className="text-indigo-600" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Rescheduled</p>
            <h3 className="text-3xl font-bold text-slate-900">15</h3>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center mb-6">
              <AlertCircle size={20} className="text-rose-600" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Urgent Conflicts</p>
            <h3 className="text-3xl font-bold text-slate-900">3</h3>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Queue of Pending Requests</h2>
            <span className="text-sm text-slate-500">Showing {requests.length} results</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50/50">
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-4 px-6 text-left font-bold text-[11px] tracking-wider uppercase">User Name</th>
                  <th className="py-4 px-6 text-left font-bold text-[11px] tracking-wider uppercase">Room Requested</th>
                  <th className="py-4 px-6 text-left font-bold text-[11px] tracking-wider uppercase">Date/Time</th>
                  <th className="py-4 px-6 text-left font-bold text-[11px] tracking-wider uppercase">Purpose</th>
                  <th className="py-4 px-6 text-right font-bold text-[11px] tracking-wider uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                      {/* User Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${req.user.color}`}>
                            {req.user.initials}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{req.user.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{req.user.dept}</p>
                          </div>
                        </div>
                      </td>

                      {/* Room Info */}
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-900">{req.room.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{req.room.details}</p>
                      </td>

                      {/* Date/Time Info */}
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-900">{req.schedule.date}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{req.schedule.time}</p>
                      </td>

                      {/* Purpose */}
                      <td className="py-4 px-6 text-slate-600">
                        {req.purpose}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleReject(req.id, req.user.name)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 text-rose-600 rounded-md text-xs font-bold hover:bg-rose-50 transition-colors active:scale-95"
                          >
                            <X size={14} strokeWidth={3} /> Reject
                          </button>
                          <button 
                            onClick={() => handleApprove(req.id, req.user.name)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0065A1] text-white rounded-md text-xs font-bold hover:bg-blue-800 transition-colors active:scale-95"
                          >
                            <Check size={14} strokeWidth={3} /> Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      Hore! Semua permintaan sudah selesai diproses. 🎉
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-slate-100 flex justify-between items-center text-sm">
            <button className="text-slate-500 font-medium hover:text-slate-800 transition-colors">Previous</button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-md bg-[#0065A1] text-white font-bold flex items-center justify-center shadow-sm">1</button>
              <button className="w-8 h-8 rounded-md text-slate-600 hover:bg-slate-100 font-medium flex items-center justify-center transition-colors">2</button>
              <button className="w-8 h-8 rounded-md text-slate-600 hover:bg-slate-100 font-medium flex items-center justify-center transition-colors">3</button>
            </div>
            <button className="text-slate-500 font-medium hover:text-slate-800 transition-colors">Next</button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
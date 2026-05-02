import { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Loader2, CalendarClock } from 'lucide-react';

export default function MyBookingsPage() {
  const auth = useAuth() as any;
  const userName = auth?.fullName || localStorage.getItem('userName') || 'User';

  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_name', userName) // Filter hanya booking milik user ini
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setMyBookings(data);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userName) fetchMyBookings();
  }, [userName]);

  const getStatusStyle = (status: string) => {
    if (status === 'approved') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'rejected') return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <DashboardLayout role="user" userName={userName}>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">My Bookings</h1>
        <p className="text-slate-500 mb-8">Pantau status persetujuan dan riwayat pemesanan ruangan Anda.</p>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-4 px-6 font-bold text-[12px] uppercase">Room</th>
                  <th className="py-4 px-6 font-bold text-[12px] uppercase">Date & Time</th>
                  <th className="py-4 px-6 font-bold text-[12px] uppercase">Purpose</th>
                  <th className="py-4 px-6 font-bold text-[12px] uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={4} className="py-12 text-center text-slate-500"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#0088FF]" /> Memuat data Anda...</td></tr>
                ) : myBookings.length > 0 ? (
                  myBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-slate-100 last:border-b-0">
                      <td className="py-4 px-6 font-bold text-slate-800">{booking.room_name}</td>
                      <td className="py-4 px-6 text-slate-600">{booking.date_time || booking.date}</td>
                      <td className="py-4 px-6 text-slate-600">{booking.purpose}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-[11px] font-bold uppercase rounded border ${getStatusStyle(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-16 text-center">
                      <div className="mx-auto w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                        <CalendarClock className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-500 font-medium">Anda belum pernah melakukan pemesanan ruangan.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
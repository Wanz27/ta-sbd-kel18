import { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Archive, Loader2 } from 'lucide-react';

export default function ArchivedRoomsPage() {
  const auth = useAuth() as any;
  const adminName = auth?.fullName || localStorage.getItem('userName') || 'System Admin';

  const [archivedRooms, setArchivedRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArchived = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('rooms').select('*').eq('status', 'Archived');
        if (error) throw error;
        if (data) setArchivedRooms(data);
      } catch (error) {
        console.error('Error fetching archived rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArchived();
  }, []);

  return (
    <DashboardLayout role="admin" userName={adminName}>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-[32px] font-bold text-slate-900 mb-2">Archived Rooms</h1>
        <p className="text-slate-500 mb-8">Daftar ruangan yang telah dinonaktifkan atau diarsipkan dari sistem.</p>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
          {isLoading ? (
            <div className="py-12 text-center text-slate-500"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#0065A1]" />Memuat database...</div>
          ) : archivedRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {archivedRooms.map((room) => (
                <div key={room.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50 opacity-75">
                  <h3 className="font-bold text-slate-800">{room.name}</h3>
                  <p className="text-xs text-slate-500">{room.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                <Archive className="w-8 h-8 text-slate-400" />
              </div>
              <h2 className="text-lg font-semibold text-slate-700 mb-1">Database Bersih</h2>
              <p className="text-sm text-slate-400">Tidak ada ruangan yang diarsipkan saat ini.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
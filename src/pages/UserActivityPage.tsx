import { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

import { CheckCircle2, RotateCw, XCircle, CalendarX2, Clock, Loader2 } from 'lucide-react';

export default function UserActivityPage() {
  const auth = useAuth() as any;
  const userName = auth?.fullName || localStorage.getItem('userName') || 'User';

  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('activity_logs')
          .select('*')
          .eq('actor', userName)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setActivities(data);
      } catch (error) {
        console.error('Error fetching user activity:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userName) fetchActivities();
  }, [userName]);

  const getTypeStyles = (type: string) => {
    if (type === 'approved') return { icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />, iconBg: 'bg-emerald-100', badgeBg: 'bg-emerald-100 text-emerald-700' };
    if (type === 'rejected') return { icon: <XCircle className="w-6 h-6 text-rose-600" />, iconBg: 'bg-rose-100', badgeBg: 'bg-rose-100 text-rose-700' };
    if (type === 'reschedule_rejected') return { icon: <CalendarX2 className="w-6 h-6 text-amber-600" />, iconBg: 'bg-amber-100', badgeBg: 'bg-amber-100 text-amber-700' };
    return { icon: <RotateCw className="w-6 h-6 text-sky-600" />, iconBg: 'bg-sky-100', badgeBg: 'bg-sky-100 text-sky-700' };
  };

  return (
    <DashboardLayout role="user" userName={userName}>
      <div className="max-w-5xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-slate-900 mb-1">Aktivitas Terbaru & Notifikasi</h1>
          <p className="text-slate-500 text-[15px]">Pantau status reservasi ruang rapat dan pembaruan jadwal Anda secara real-time.</p>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="py-12 text-center text-slate-500"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#0088FF]"/>Sinkronisasi data...</div>
          ) : activities.length > 0 ? (
            activities.map((notif) => {
              const styles = getTypeStyles(notif.type);
              return (
                <div key={notif.id} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${styles.iconBg}`}>{styles.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-slate-900 text-[17px]">{notif.title}</h3>
                      <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md uppercase tracking-wide ${styles.badgeBg}`}>{notif.type}</span>
                    </div>
                    <p className="text-[15px] text-slate-600 leading-relaxed">{notif.action_text}</p>
                    <div className="flex items-center gap-5 mt-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                        <Clock className="w-4 h-4" /> {new Date(notif.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100"><Clock className="w-8 h-8 text-slate-300" /></div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Belum ada aktivitas</h3>
              <p className="text-sm text-slate-500">Anda belum menerima notifikasi apapun.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
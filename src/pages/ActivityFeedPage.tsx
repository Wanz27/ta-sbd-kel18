import { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CalendarPlus, XCircle, RotateCw, Check, CheckCheck, Loader2 } from 'lucide-react';

export default function ActivityFeedPage() {
  const auth = useAuth() as any;
  const adminName = auth?.fullName || localStorage.getItem('userName') || 'System Admin';
  
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data) setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const hasUnread = activities.some(act => !act.is_read);

  const handleMarkAllAsRead = async () => {
    try {
      await supabase.from('activity_logs').update({ is_read: true }).eq('is_read', false);
      setActivities(activities.map(act => ({ ...act, is_read: true })));
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const getIconData = (type: string) => {
    switch(type) {
      case 'approvals': return { icon: <CalendarPlus className="w-6 h-6 text-sky-600" />, bg: 'bg-sky-50 border-sky-100' };
      case 'canceled': return { icon: <XCircle className="w-6 h-6 text-rose-600" />, bg: 'bg-rose-50 border-rose-100' };
      default: return { icon: <RotateCw className="w-6 h-6 text-amber-600" />, bg: 'bg-amber-50 border-amber-100' };
    }
  };

  return (
    <DashboardLayout role="admin" userName={adminName}>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-[32px] font-bold text-slate-900 mb-2">Activity Feed</h1>
            <p className="text-slate-500 text-[15px]">Real-time logs from Supabase.</p>
          </div>
          <button onClick={handleMarkAllAsRead} disabled={!hasUnread} className={`flex items-center gap-2 px-4 py-2 font-medium rounded-md text-sm border ${hasUnread ? 'bg-blue-50 border-[#0088FF] text-[#0088FF]' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
            {hasUnread ? <Check size={16} /> : <CheckCheck size={16} />} Mark all as read
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {isLoading ? (
            <div className="text-center py-10"><Loader2 className="animate-spin mx-auto" /> Loading logs...</div>
          ) : activities.length > 0 ? (
            activities.map((act) => {
              const { icon, bg } = getIconData(act.type);
              return (
                <div key={act.id} className={`rounded-xl p-6 shadow-sm border flex gap-5 ${act.is_read ? 'bg-white' : 'bg-[#F4FAFF] border-blue-200'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${bg}`}>{icon}</div>
                  <div className="flex-1">
                    <h3 className="text-[17px] font-semibold text-slate-900">{act.title}</h3>
                    <p className="text-[15px] text-slate-600"><span className="font-bold">{act.actor}</span> {act.action_text}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-slate-500">No activities found in database.</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
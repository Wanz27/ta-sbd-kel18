import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock3, LayoutDashboard, Loader2 } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../lib/api';
import type { Reservation } from '../lib/api';

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export default function BookingApprovalsPage() {
  const auth = useAuth() as any;
  const adminName = auth?.fullName || localStorage.getItem('userName') || 'System Admin';

  const [requests, setRequests] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [noteInput, setNoteInput] = useState('');
  const ITEMS_PER_PAGE = 4;

  useEffect(() => { fetchPending(); }, []);

  const fetchPending = async () => {
    setIsLoading(true);
    try {
      const data = await api.getReservations({ status: 'Pending' });
      setRequests(data);
    } catch (err: any) {
      console.error('Error fetching reservations:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'Approved' | 'Rejected', userName: string) => {
    if (status === 'Rejected') {
      if (!window.confirm(`Tolak booking dari ${userName}?`)) return;
    }
    setActionLoading(id);
    try {
      await api.updateReservationStatus(id, status);
      setRequests((prev) => prev.filter((r) => r.reservation_id !== id));
      if (status === 'Approved') alert(`Booking dari ${userName} berhasil disetujui!`);
    } catch (err: any) {
      alert('Gagal memperbarui status: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = requests.length;
  const totalPages = Math.max(1, Math.ceil(pendingCount / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = requests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  return (
    <DashboardLayout role="admin" userName={adminName}>
      <div className="px-2 py-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-slate-900">Booking Approvals</h1>
            <p className="text-slate-600">Review and manage pending room reservation requests.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sky-700 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 border border-sky-100">
              <Clock3 size={24} />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Pending Requests</div>
            <div className="text-3xl font-bold text-slate-900">{pendingCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-amber-700 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 border border-amber-100">
              <LayoutDashboard size={24} />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Awaiting Review</div>
            <div className="text-3xl font-bold text-slate-900">{pendingCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-violet-700 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 border border-violet-100">
              <CheckCircle2 size={24} />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Status</div>
            <div className="text-3xl font-bold text-slate-900">Live</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-rose-700 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 border border-rose-100">
              <XCircle size={24} />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Data Source</div>
            <div className="text-lg font-bold text-slate-900">API</div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-bold text-slate-900">Queue of Pending Requests</h2>
            <div className="text-sm text-slate-500 font-medium">
              Showing {currentData.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + ITEMS_PER_PAGE, pendingCount)} of {pendingCount}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-700">
              <thead className="bg-slate-50/50">
                <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Room</th>
                  <th className="px-6 py-4">Waktu Mulai</th>
                  <th className="px-6 py-4">Tujuan</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#0065A1]" />
                      <p>Loading from API...</p>
                    </td>
                  </tr>
                ) : currentData.length > 0 ? currentData.map((req) => (
                  <tr key={req.reservation_id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm uppercase">
                          {req.users?.full_name?.substring(0, 2) ?? 'US'}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{req.users?.full_name ?? '-'}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{req.users?.department ?? '-'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">{req.rooms?.room_name ?? '-'}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{req.rooms?.location ?? '-'} · {req.rooms?.capacity ?? '-'} org</div>
                    </td>
                    <td className="px-6 py-5 text-slate-600 text-xs">
                      <div>{formatDateTime(req.start_time)}</div>
                      <div className="text-slate-400">s/d {formatDateTime(req.end_time)}</div>
                    </td>
                    <td className="px-6 py-5 text-slate-600">
                      <div>{req.meeting_title ?? '-'}</div>
                      {req.person_in_charge && <div className="text-xs text-slate-400 mt-0.5">PIC: {req.person_in_charge}</div>}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleUpdateStatus(req.reservation_id, 'Rejected', req.users?.full_name ?? '')}
                          disabled={actionLoading === req.reservation_id}
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition active:scale-95 disabled:opacity-50"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(req.reservation_id, 'Approved', req.users?.full_name ?? '')}
                          disabled={actionLoading === req.reservation_id}
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0065A1] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-800 transition active:scale-95 disabled:opacity-50"
                        >
                          <CheckCircle2 size={14} /> Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      All caught up! No pending requests. 🎉
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}
              className="text-slate-500 font-medium hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-md font-medium flex items-center justify-center transition-colors ${currentPage === i + 1 ? 'bg-[#0065A1] text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
            <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
              className="text-slate-500 font-medium hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
import { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import AddRoomModal from '../components/AddRoomModal';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export default function RoomManagementPage() {
  const auth = useAuth() as any;
  const adminName = auth?.fullName || localStorage.getItem('userName') || 'System Admin';

  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('rooms').select('*').order('name');
      if (error) throw error;
      if (data) setRooms(data);
    } catch (error: any) {
      console.error('Error fetching rooms:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRoom = async (values: any) => {
    const newRoom = {
      name: values.roomName,
      location: values.location || '-',
      capacity: values.capacity === '' ? 0 : Number(values.capacity),
      equipment: values.amenities.length ? values.amenities.slice(0, 3) : ['-'],
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=facearea&w=96&h=64',
    };

    try {
      const { error } = await supabase.from('rooms').insert([newRoom]);
      if (error) throw error;
      fetchRooms(); // Refresh data setelah berhasil nambah
    } catch (error: any) {
      alert('Gagal menambahkan ruangan: ' + error.message);
    }
  };

  return (
    <DashboardLayout role="admin" userName={adminName}>
      <div className="px-2 py-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-slate-900">Room Management</h1>
            <p className="text-slate-500">Configure and monitor all corporate meeting spaces.</p>
          </div>
          <button onClick={() => setAddOpen(true)} className="bg-[#0065A1] text-white px-5 py-2.5 rounded-lg font-semibold shadow hover:bg-blue-800 transition">
            + Add New Room
          </button>
        </div>

        <AddRoomModal open={addOpen} onClose={() => setAddOpen(false)} onSave={handleAddRoom} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col items-center shadow-sm">
            <div className="text-sky-700 mb-2">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#F0F9FF"/><path d="M8 20h16M8 16h16M8 12h16" stroke="#0088FF" strokeWidth="2"/></svg>
            </div>
            <div className="text-2xl font-bold text-slate-900">{rooms.length}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 text-center flex flex-col">
              <span>TOTAL ROOMS</span>
            </div>
          </div>
          {/* Card 2, 3, 4 disederhanakan visualnya untuk menghemat baris */}
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Inventory List</h2>
            <button className="border border-slate-300 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">Filter</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-slate-500 border-b border-slate-200">
                  <th className="py-3 text-left font-semibold">Room Name & Location</th>
                  <th className="py-3 text-left font-semibold">Capacity</th>
                  <th className="py-3 text-left font-semibold">Equipment</th>
                  <th className="py-3 text-left font-semibold">Status</th>
                  <th className="py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={5} className="py-8 text-center text-slate-500"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#0065A1]"/>Loading rooms...</td></tr>
                ) : rooms.map((room) => (
                  <tr key={room.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-4 flex items-center gap-4">
                      <img src={room.image} alt={room.name} className="w-16 h-10 object-cover rounded-md border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-800">{room.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{room.location}</div>
                      </div>
                    </td>
                    <td className="py-4 font-medium text-slate-600">{room.capacity} Persons</td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {room.equipment?.map((eq: string, i: number) => (
                          <span key={i} className="inline-block bg-slate-100 text-slate-600 rounded px-2.5 py-1 text-xs font-medium border border-slate-200">{eq}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${room.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${room.status === 'Available' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                        {room.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400">Edit / Delete</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
import { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import AddRoomModal from '../components/AddRoomModal'; // Pastikan ini di-import

const dummyRooms = [
  {
    name: 'The Executive Suite',
    location: 'Floor 4, Wing A',
    capacity: 12,
    equipment: ['4K Display', 'Video Conf', '+3'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=64',
  },
  {
    name: 'Innovation Hub',
    location: 'Floor 1, Lobby',
    capacity: 30,
    equipment: ['Whiteboard', 'Projector'],
    status: 'Occupied',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=96&h=64',
  },
  {
    name: 'Focus Pod Alpha',
    location: 'Floor 2, Wing C',
    capacity: 4,
    equipment: ['Acoustic Paneling'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=96&h=64',
  },
];

export default function RoomManagementPage() {
  const auth = useAuth() as any;
  // FIX: Memastikan nama admin diambil dengan benar
  const adminName = auth?.fullName || localStorage.getItem('userName') || 'System Admin';

  const [rooms, setRooms] = useState(dummyRooms);
  const [addOpen, setAddOpen] = useState(false);

  return (
    // FIX UTAMA: Kita paku properti role="admin" di sini agar sidebar tidak pernah tertukar
    <DashboardLayout role="admin" userName={adminName}>
      <div className="px-2 py-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-slate-900">Room Management</h1>
            <p className="text-slate-500">Configure and monitor all corporate meeting spaces.</p>
          </div>
          <button 
            onClick={() => setAddOpen(true)}
            className="bg-[#0065A1] text-white px-5 py-2.5 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
          >
            + Add New Room
          </button>
        </div>

        {/* Komponen Modal Tambah Ruangan */}
        <AddRoomModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onSave={(values) => {
            setRooms((prev) => [
              {
                name: values.roomName,
                location: values.location || '-',
                capacity: values.capacity === '' ? 0 : Number(values.capacity),
                equipment: values.amenities.length ? values.amenities.slice(0, 3) : ['-'],
                status: 'Available',
                image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=facearea&w=96&h=64',
              },
              ...prev,
            ]);
          }}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col items-center shadow-sm">
            <div className="text-sky-700 mb-2">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="8" fill="#F0F9FF"/>
                <path d="M8 20h16M8 16h16M8 12h16" stroke="#0088FF" strokeWidth="2"/>
              </svg>
            </div>
            <div className="text-2xl font-bold text-slate-900">42</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 text-center flex flex-col">
              <span>TOTAL ROOMS</span>
              <span className="mt-1 text-[#0088FF] bg-blue-50 rounded px-1.5 py-0.5 lowercase font-semibold w-fit mx-auto">+2 this month</span>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col items-center shadow-sm">
            <div className="text-indigo-700 mb-2">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="8" fill="#F5F3FF"/>
                <path d="M16 8v8l6 3" stroke="#6366F1" strokeWidth="2"/>
              </svg>
            </div>
            <div className="text-2xl font-bold text-slate-900">18</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 text-center flex flex-col">
              <span>AVAILABLE NOW</span>
              <span className="mt-1 text-indigo-600 bg-indigo-50 rounded px-1.5 py-0.5 lowercase font-semibold w-fit mx-auto">43% current capacity</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col items-center shadow-sm">
            <div className="text-orange-500 mb-2">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="8" fill="#FFF7ED"/>
                <path d="M16 8v8l6 3" stroke="#F97316" strokeWidth="2"/>
              </svg>
            </div>
            <div className="text-2xl font-bold text-slate-900">24</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 text-center flex flex-col">
              <span>OCCUPIED</span>
              <span className="mt-1 text-orange-600 bg-orange-50 rounded px-1.5 py-0.5 lowercase font-semibold w-fit mx-auto">Rooms currently in use</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col items-center shadow-sm">
            <div className="text-rose-600 mb-2">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="8" fill="#FFF1F2"/>
                <path d="M16 8v8l6 3" stroke="#E11D48" strokeWidth="2"/>
              </svg>
            </div>
            <div className="text-2xl font-bold text-slate-900">15</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 text-center flex flex-col">
              <span>BOOKED</span>
              <span className="mt-1 text-rose-600 bg-rose-50 rounded px-1.5 py-0.5 lowercase font-semibold w-fit mx-auto">Reserved for later today</span>
            </div>
          </div>
        </div>

        {/* Inventory List */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Inventory List</h2>
            <button className="border border-slate-300 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
              Filter
            </button>
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
                {rooms.map((room, index) => (
                  <tr key={index} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-4 flex items-center gap-4">
                      <img src={room.image} alt={room.name} className="w-16 h-10 object-cover rounded-md border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-800">{room.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{room.location}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-600">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14v6m-4-6v6m8-6v6M3 10h18a1 1 0 011 1v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3a1 1 0 011-1z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="5" r="2" strokeWidth="2"/></svg>
                        {room.capacity} Persons
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {room.equipment.map((eq, i) => (
                          <span key={i} className="inline-block bg-slate-100 text-slate-600 rounded px-2.5 py-1 text-xs font-medium border border-slate-200">
                            {eq}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4">
                      {room.status === 'Available' ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-orange-700 text-xs font-bold uppercase tracking-wider bg-orange-50 px-2 py-1 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          Occupied
                        </span>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <button className="text-slate-400 hover:text-sky-600 transition" title="Edit">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                        <button className="text-slate-400 hover:text-rose-600 transition" title="Delete">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-6 text-sm text-slate-500 border-t border-slate-100 pt-4">
            <span>Showing 1 to {rooms.length} of {rooms.length} rooms</span>
            <div className="flex gap-1.5">
              <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">&lt;</button>
              <button className="w-8 h-8 rounded border border-[#0088FF] bg-blue-50 text-[#0088FF] flex items-center justify-center font-bold">1</button>
              <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">2</button>
              <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">3</button>
              <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
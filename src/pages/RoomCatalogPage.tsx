import { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Loader2, Users, Search } from 'lucide-react';

export default function RoomCatalogPage() {
  const auth = useAuth() as any;
  const userName = auth?.fullName || localStorage.getItem('userName') || 'User';

  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('rooms').select('*').order('name');
        if (error) throw error;
        if (data) setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter(room => 
    room.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="user" userName={userName}>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Room Catalog</h1>
            <p className="text-slate-500">Jelajahi dan temukan ruangan yang tepat untuk kebutuhan rapatmu.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Cari nama ruangan..." 
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0088FF]" 
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#0088FF]" />
            <p>Memuat katalog ruangan dari Supabase...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.length > 0 ? filteredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900">{room.name}</h3>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${room.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
                      {room.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">{room.location}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                    <span className="flex items-center gap-1.5"><Users size={16} className="text-slate-400"/> {room.capacity} Orang</span>
                  </div>
                  <button className="mt-auto w-full bg-[#0088FF] text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition disabled:opacity-50" disabled={room.status !== 'Available'}>
                    {room.status === 'Available' ? 'Book Now' : 'Currently in Use'}
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-12 text-center text-slate-500">Ruangan tidak ditemukan.</div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
import DashboardLayout from '../layout/DashboardLayout';

export default function AdminDashboard() {
  // Ambil nama dari memori browser, kalau tidak ada baru pakai default 'System Admin'
  const fullName = localStorage.getItem('userName') || 'System Admin';

  return (
    <DashboardLayout role="admin" userName={fullName} userRole="System Admin">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
        <p className="text-slate-500">Monitoring real-time operational capacity and pending actions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">🏢</div>
            <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">+4% vs last mo</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Rooms</p>
          <h3 className="text-3xl font-bold text-slate-800">124</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">📅</div>
            <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded-full">88% Capacity</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Active Bookings</p>
          <h3 className="text-3xl font-bold text-slate-800">42</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">📋</div>
            <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded-full">Urgent</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Pending Requests</p>
          <h3 className="text-3xl font-bold text-slate-800">18</h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Room Schedule */}
        <div className="col-span-2 bg-white border border-slate-200 rounded-xl flex flex-col">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Room Schedule</h3>
              <p className="text-sm text-slate-500">Weekly overview for Floor 1-12</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium">
                <button className="bg-white shadow px-4 py-1 rounded-md">Week</button>
                <button className="px-4 py-1 text-slate-500">Month</button>
              </div>
              <span className="font-medium text-slate-700">Oct 16 - 22, 2023</span>
            </div>
          </div>
          <div className="p-6 text-center text-slate-400 py-20 bg-slate-50 m-4 rounded-lg border border-dashed border-slate-300">
            [Komponen Matrix Kalender Mingguan]
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-slate-200 rounded-xl flex flex-col">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
            <button className="text-slate-400 hover:text-slate-600">⏱</button>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">📅</div>
              <div>
                <p className="text-sm font-bold text-slate-800">New Booking: Room 302</p>
                <p className="text-xs text-slate-500">By Sarah Jenkins • 12 mins ago</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-200 text-center">
            <button className="text-[#0088FF] font-bold text-sm hover:underline">View Full Audit Log</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
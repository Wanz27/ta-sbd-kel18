import DashboardLayout from '../layout/DashboardLayout';

export default function UserDashboard() {
  // Ambil nama dari memori browser, kalau tidak ada baru pakai default yaitu 'User Baru'
  const fullName = localStorage.getItem('userName') || 'User Baru';
  
  // Ambil kata pertama saja untuk ucapan "Welcome back, [Nama Depan]!"
  const firstName = fullName.split(' ')[0];

  return (
    <DashboardLayout role="user" userName={fullName} userRole="PROJECT LEAD">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl p-8 border border-slate-200 mb-8 flex justify-between items-center bg-gradient-to-r from-white to-blue-50">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back, {firstName}!</h2>
          <p className="text-slate-600 mb-6 max-w-md">
            You have 3 confirmed bookings this week. The next one starts in 2 hours in the Innovation Hub.
          </p>
          <button className="bg-[#0088FF] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition shadow-sm">
            📅 Book a Room
          </button>
        </div>
        <div className="hidden md:block opacity-20 text-9xl">
          🚪
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column (Stats & Upcoming) */}
        <div className="col-span-2 flex flex-col gap-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-xs font-bold text-slate-400 tracking-wider mb-2">ACTIVE</p>
              <h3 className="text-4xl font-bold text-slate-800 mb-1">12</h3>
              <p className="text-sm text-slate-500">Total Bookings</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-xs font-bold text-slate-400 tracking-wider mb-2">REVIEWING</p>
              <h3 className="text-4xl font-bold text-slate-800 mb-1">2</h3>
              <p className="text-sm text-slate-500">Pending Requests</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-xs font-bold text-slate-400 tracking-wider mb-2">VERIFIED</p>
              <h3 className="text-4xl font-bold text-slate-800 mb-1">8</h3>
              <p className="text-sm text-slate-500">Approved Bookings</p>
            </div>
          </div>

          {/* Upcoming Reservations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800">Upcoming Reservations</h3>
              <button className="text-[#0088FF] text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
                <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100 min-w-[80px]">
                  <p className="text-xs text-slate-500 font-bold">OCT</p>
                  <p className="text-2xl font-bold text-slate-800">28</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-lg">Innovation Hub</h4>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    🕒 09:00 AM - 11:30 AM • 4th Floor, Wing A
                  </p>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  ✓ Confirmed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Recent Activity) */}
        <div className="bg-white border border-slate-200 rounded-xl flex flex-col h-fit">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
          </div>
          <div className="p-6 flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 mt-1 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">✓</div>
              <div>
                <p className="text-sm text-slate-800">Your request for Alpha Suite was <span className="bg-green-100 text-green-700 px-1 rounded text-xs font-bold">APPROVED</span></p>
                <p className="text-xs text-slate-400 mt-1 font-bold">2 HOURS AGO</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-200 text-center">
            <button className="text-slate-600 font-medium text-sm hover:text-slate-800 border border-slate-200 px-4 py-2 rounded-lg w-full">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
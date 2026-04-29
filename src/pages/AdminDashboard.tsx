import DashboardLayout from '../layout/DashboardLayout';

export default function AdminDashboard() {
	const fullName = localStorage.getItem('userName') || 'System Admin';
	return (
		<DashboardLayout role="admin" userName={fullName} userRole="System Admin">
			<div className="px-2 py-6 md:px-8">
				<h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
				<p className="text-slate-600 mb-8">Monitoring real-time operational capacity and pending actions.</p>
				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col items-center">
						<div className="text-sky-700 mb-2"><svg width="32" height="32" fill="none" stroke="currentColor"><rect width="32" height="32" rx="8" fill="#F5FAFF"/><path d="M8 20h16M8 16h16M8 12h16" stroke="#0088FF" strokeWidth="2"/></svg></div>
						<div className="text-2xl font-bold">124</div>
						<div className="text-xs text-slate-500">Total Rooms <span className="ml-2 text-xs text-sky-600 bg-sky-50 rounded px-2 py-0.5">+4% vs last mo</span></div>
					</div>
					<div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col items-center">
						<div className="text-orange-500 mb-2"><svg width="32" height="32" fill="none" stroke="currentColor"><rect width="32" height="32" rx="8" fill="#FFF8F1"/><path d="M16 8v8l6 3" stroke="#FF9900" strokeWidth="2"/></svg></div>
						<div className="text-2xl font-bold">42</div>
						<div className="text-xs text-slate-500">Active Bookings <span className="ml-2 text-xs text-orange-600 bg-orange-50 rounded px-2 py-0.5">88% Capacity</span></div>
					</div>
					<div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col items-center">
						<div className="text-rose-600 mb-2"><svg width="32" height="32" fill="none" stroke="currentColor"><rect width="32" height="32" rx="8" fill="#FFF5F5"/><path d="M16 8v8l6 3" stroke="#FF3B3B" strokeWidth="2"/></svg></div>
						<div className="text-2xl font-bold">18</div>
						<div className="text-xs text-slate-500">Pending Requests <span className="ml-2 text-xs text-rose-600 bg-rose-50 rounded px-2 py-0.5">Urgent</span></div>
					</div>
				</div>

				{/* Room Schedule & Recent Activity */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Room Schedule */}
					<div className="md:col-span-2 bg-white rounded-xl p-6 border border-slate-200">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold">Room Schedule</h2>
							<div className="flex gap-2">
								<button className="text-xs font-medium px-3 py-1 rounded bg-slate-100 text-slate-700">Week</button>
								<button className="text-xs font-medium px-3 py-1 rounded bg-white border border-slate-200 text-slate-700">Month</button>
							</div>
							<div className="text-xs text-slate-500">Oct 16 - 22, 2023</div>
						</div>
						<div className="overflow-x-auto">
							{/* Table header */}
							<div className="grid grid-cols-6 gap-2 text-xs font-semibold text-slate-500 mb-2">
								<div>Room</div>
								<div>Mon</div>
								<div>Tue</div>
								<div>Wed</div>
								<div>Thu</div>
								<div>Fri</div>
							</div>
							{/* Table body (static example) */}
							<div className="grid grid-cols-6 gap-2 text-xs mb-1">
								<div className="font-medium">Grand Conf A</div>
								<div className="bg-blue-50 text-sky-700 rounded px-2 py-1">Board Meeting<br/>09:00 - 11:30</div>
								<div className="bg-blue-50 text-sky-700 rounded px-2 py-1">Town Hall<br/>14:00 - 16:00</div>
								<div></div>
								<div></div>
								<div className="bg-slate-100 text-slate-400 rounded px-2 py-1">Maintenance<br/>All Day</div>
							</div>
							<div className="grid grid-cols-6 gap-2 text-xs mb-1">
								<div className="font-medium">Suite 402</div>
								<div></div>
								<div className="bg-orange-50 text-orange-700 rounded px-2 py-1">Client Sync<br/>10:00 - 11:00</div>
								<div className="bg-orange-50 text-orange-700 rounded px-2 py-1">Interview<br/>14:30 - 15:30</div>
								<div className="bg-orange-50 text-orange-700 rounded px-2 py-1">Review<br/>15:00 - 16:00</div>
								<div></div>
							</div>
							<div className="grid grid-cols-6 gap-2 text-xs mb-1">
								<div className="font-medium">Studio B</div>
								<div></div>
								<div></div>
								<div className="bg-rose-50 text-rose-700 rounded px-2 py-1">Podcast<br/>11:00 - 13:00</div>
								<div></div>
								<div className="bg-rose-50 text-rose-700 rounded px-2 py-1">Recording<br/>16:00 - 17:00</div>
							</div>
							<div className="grid grid-cols-6 gap-2 text-xs mb-1">
								<div className="font-medium">Tech Hub</div>
								<div></div>
								<div></div>
								<div className="bg-blue-50 text-sky-700 rounded px-2 py-1">Workshop<br/>14:00 - 17:00</div>
								<div></div>
								<div className="bg-blue-50 text-sky-700 rounded px-2 py-1">Dev Sprint<br/>11:00 - 12:00</div>
							</div>
						</div>
						<div className="mt-4 text-right">
							<button className="text-sky-700 text-xs font-medium hover:underline">View All Rooms Schedule &rarr;</button>
						</div>
					</div>
					{/* Recent Activity */}
					<div className="bg-white rounded-xl p-6 border border-slate-200">
						<h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
						<ul className="space-y-4">
							<li className="flex items-start gap-3">
								<div className="bg-blue-50 text-sky-700 rounded p-2"><svg width="20" height="20" fill="none" stroke="currentColor"><rect width="20" height="20" rx="5" fill="#F5FAFF"/><path d="M4 10h12M10 4v12" stroke="#0088FF" strokeWidth="2"/></svg></div>
								<div>
									<div className="font-medium">New Booking: Room 302</div>
									<div className="text-xs text-slate-500">By Sarah Jenkins • 12 mins ago</div>
								</div>
							</li>
							<li className="flex items-start gap-3">
								<div className="bg-rose-50 text-rose-700 rounded p-2"><svg width="20" height="20" fill="none" stroke="currentColor"><rect width="20" height="20" rx="5" fill="#FFF5F5"/><path d="M4 10h12" stroke="#FF3B3B" strokeWidth="2"/></svg></div>
								<div>
									<div className="font-medium">Canceled: Studio B</div>
									<div className="text-xs text-slate-500">By Mike Ross • 45 mins ago</div>
								</div>
							</li>
							<li className="flex items-start gap-3">
								<div className="bg-orange-50 text-orange-700 rounded p-2"><svg width="20" height="20" fill="none" stroke="currentColor"><rect width="20" height="20" rx="5" fill="#FFF8F1"/><path d="M10 4v12" stroke="#FF9900" strokeWidth="2"/></svg></div>
								<div>
									<div className="font-medium">Rescheduled: Tech Hub</div>
									<div className="text-xs text-slate-500">By Admin Panel • 2 hours ago</div>
								</div>
							</li>
							<li className="flex items-start gap-3">
								<div className="bg-blue-50 text-sky-700 rounded p-2"><svg width="20" height="20" fill="none" stroke="currentColor"><rect width="20" height="20" rx="5" fill="#F5FAFF"/><path d="M4 10h12M10 4v12" stroke="#0088FF" strokeWidth="2"/></svg></div>
								<div>
									<div className="font-medium">User Added: David Wu</div>
									<div className="text-xs text-slate-500">Project Manager • 4 hours ago</div>
								</div>
							</li>
							<li className="flex items-start gap-3">
								<div className="bg-slate-100 text-slate-400 rounded p-2"><svg width="20" height="20" fill="none" stroke="currentColor"><rect width="20" height="20" rx="5" fill="#F8FAFC"/><path d="M4 10h12" stroke="#94A3B8" strokeWidth="2"/></svg></div>
								<div>
									<div className="font-medium">Maintenance Complete</div>
									<div className="text-xs text-slate-500">Floor 8 HVAC • 6 hours ago</div>
								</div>
							</li>
						</ul>
						<div className="mt-4 text-right">
							<button className="text-sky-700 text-xs font-medium hover:underline">View Full Audit Log &rarr;</button>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

import * as React from 'react'
import DashboardLayout from '../layout/DashboardLayout'

type ActivityTab = 'all' | 'approvals' | 'canceled' | 'returned'

interface ActivityItem {
  id: string
  type: 'booking' | 'canceled' | 'rescheduled' | 'returned'
  title: string
  description: string
  actor: string
  role: string
  timestamp: string
  details?: string
  badge?: string
}

export default function AdminDashboard() {
  const fullName = localStorage.getItem('userName') || 'System Admin'
  const [activeTab, setActiveTab] = React.useState<ActivityTab>('all')

  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'booking',
      title: 'New Booking: Room 302',
      description: "Sarah Jenkins (Senior Analyst) reserved the Executive Suite for a 'Quarterly Strategy Session'.",
      actor: 'Sarah Jenkins',
      role: 'Senior Analyst',
      timestamp: '2 mins ago',
      details: '14:00 – 16:30  •  12 People',
    },
    {
      id: '2',
      type: 'canceled',
      title: 'Cancelled: Studio B',
      description: 'Mark Thompson (Creative Director) released the reservation due to schedule conflict.',
      actor: 'Mark Thompson',
      role: 'Creative Director',
      timestamp: '18 mins ago',
      badge: 'HIGH PRIORITY RELEASE',
    },
    {
      id: '3',
      type: 'rescheduled',
      title: 'Rescheduled: Tech Hub',
      description: 'Development Team A moved "Sprint Planning" from Tuesday 10:00 to Wednesday 09:00',
      actor: 'Development Team A',
      role: 'Team Lead',
      timestamp: '1 hour ago',
      details: 'Aug 14, 9:00 → Aug 15, 09:00',
    },
    {
      id: '4',
      type: 'returned',
      title: 'Returned Early: Executive Suite 302',
      description: 'Sarah Jenkins ended their booking 30 minutes ahead of schedule. Room is now available.',
      actor: 'Sarah Jenkins',
      role: 'Senior Analyst',
      timestamp: '3 hours ago',
      badge: 'RETURNED EARLY',
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      case 'canceled':
        return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      case 'rescheduled':
        return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      case 'returned':
        return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      default:
        return null
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-100 text-blue-600'
      case 'canceled':
        return 'bg-red-100 text-red-600'
      case 'rescheduled':
        return 'bg-amber-100 text-amber-600'
      case 'returned':
        return 'bg-emerald-100 text-emerald-600'
      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <DashboardLayout role="admin" userName={fullName} userRole="System Admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Activity Feed</h1>
        <p className="text-slate-600">Real-time logs of all space operations and system events.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Activity Feed */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200">
          {/* Tabs */}
          <div className="px-6 pt-6 pb-0 border-b border-slate-200 flex items-center justify-between">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition ${
                  activeTab === 'all'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                All Activity
              </button>
              <button
                onClick={() => setActiveTab('approvals')}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition ${
                  activeTab === 'approvals'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Approvals
              </button>
              <button
                onClick={() => setActiveTab('canceled')}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition ${
                  activeTab === 'canceled'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Canceled
              </button>
              <button
                onClick={() => setActiveTab('returned')}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition ${
                  activeTab === 'returned'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Returned Early
              </button>
            </div>
            <button className="text-sm font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 px-4 py-2 rounded-md">
              ✓ Mark all as read
            </button>
          </div>

          {/* Activity Items */}
          <div className="p-6 space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">{activity.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                      {activity.details && (
                        <p className="text-xs text-slate-500 mt-2">
                          <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {activity.details}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{activity.timestamp}</span>
                  </div>
                  {activity.badge && (
                    <span className={`inline-block mt-3 text-xs font-bold px-2 py-1 rounded ${
                      activity.badge === 'HIGH PRIORITY RELEASE'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {activity.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="px-6 py-4 text-center border-t border-slate-200">
            <button className="text-blue-600 font-medium text-sm hover:underline">Load older activities...</button>
          </div>
        </div>

        {/* Right: Activity Summary & Urgent Attention */}
        <div className="flex flex-col gap-6">
          {/* Activity Summary */}
          <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-xl p-6 text-white">
            <h3 className="text-sm font-bold tracking-wide mb-4">ACTIVITY SUMMARY</h3>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold">124</p>
                <p className="text-sm text-sky-100">Total Events Today</p>
              </div>
              <div className="space-y-3 pt-4 border-t border-sky-400/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-sky-100">Bookings</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-sky-400 rounded-full" />
                    <span className="font-bold text-sm">86</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-sky-100">Cancellations</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-12 bg-red-400 rounded-full" />
                    <span className="font-bold text-sm">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Urgent Attention */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-bold text-slate-900">Urgent Attention</span>
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            </div>

            {/* Rescheduled Booking */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-slate-900 text-sm mb-1">Rescheduled Booking</h4>
              <p className="text-xs text-slate-600 mb-3">Room 204: 4:30 PM Today</p>
              <button className="text-xs font-bold text-blue-700 hover:text-blue-800">REVIEW CHANGE</button>
            </div>

            {/* Approvals Pending */}
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-semibold text-slate-900 text-sm mb-1">Approvals Pending</h4>
              <p className="text-xs text-slate-600 mb-3">4 new board room requests</p>
              <button className="text-xs font-bold text-amber-700 hover:text-amber-800">VIEW 4 QUEUE</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
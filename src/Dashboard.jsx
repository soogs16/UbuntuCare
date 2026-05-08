import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";
import { Menu, X } from "lucide-react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '' },
    { id: 'partners', label: 'Partners & Tenants', icon: '' },
    { id: 'people', label: 'People', icon: '' },
    { id: 'healthcare', label: 'Healthcare Operations', icon: '' },
    { id: 'finance', label: 'Finance', icon: '' },
    { id: 'analytics', label: 'Analytics & Insights', icon: '' },
    { id: 'communications', label: 'Communications', icon: '' },
    { id: 'system', label: 'System & Compliance', icon: '' }
  ]

  const stats = [
    { title: 'Total Users', value: '18,720', change: '+7%', icon: '' },
    { title: 'Active Providers', value: '428', change: '+5%', icon: '' },
    { title: 'Active Partners', value: '92', change: '+4%', icon: '' },
    { title: 'Total Revenue', value: '$5.6M', change: '+11%', icon: '' }
  ]

  const recentActivity = [
    { user: 'Dr. Sarah Johnson', action: 'Completed patient consultation', time: '2 minutes ago' },
    { user: 'Nurse Mike Chen', action: 'Updated medication records', time: '5 minutes ago' },
    { user: 'Admin Lisa Wong', action: 'Scheduled new appointment', time: '10 minutes ago' },
    { user: 'Dr. James Smith', action: 'Reviewed lab results', time: '15 minutes ago' }
  ]

return (
  <div className="flex h-screen w-screen bg-gray-100">

    {/* MOBILE OVERLAY */}
{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-40 md:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}

{/* SIDEBAR */}
<aside
  className={`
    fixed top-0 left-0 z-50 h-full w-64 bg-white flex flex-col
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static
  `}
>

  {/* LOGO + CLOSE */}
  <div className="p-6 flex items-center justify-between">
    <img src={logo} className="w-48 h-15" />
  </div>

  <nav className="p-4 space-y-2 text-sm">
    {menuItems.map((item) => (
      <button
        key={item.id}
        onClick={() => {
          setActiveTab(item.id)
          setSidebarOpen(false)
        }}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
          activeTab === item.id
            ? "bg-red-100 text-red-500"
            : "hover:bg-gray-100 text-gray-600"
        }`}
      >
        <span>{item.icon}</span>
        {item.label}
      </button>
    ))}
  </nav>
</aside>

    <div className="flex-1 flex flex-col">

      {/* TOP BAR */}
      <header className="bg-white px-6 py-4 flex justify-between items-center gap-4">
        {/* HAMBURGER BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={28} />
        </button>
        <span className="text-sm text-gray-500">
          Last login: Today, 08:41 AM
        </span>

        <div className="hidden sm:flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg text-sm">
            Filter by Date
          </button>

          <button className="px-4 py-2 rounded-lg text-sm">
            Export PDF
          </button>

          <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">
            + New Partner
          </button>

          <button
            onClick={handleLogout}
            className=" text-red-500 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4">
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-2xl font-semibold mt-1">{stat.value}</h2>
              <span className="text-sm text-green-500">{stat.change}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LINE CHART */}
          <div className="lg:col-span-2 bg-white rounded-xl p-4">
            <h2 className="text-xs font-xs mb-8">
              Consultation Volume
            </h2>
              <LineGraph className="p-5" />
          </div>

          {/* PIE */}
          <div className="bg-white rounded-xl p-4">
            <h2 className="text-xs font-xs mb-4">
              Utilization by Partner
            </h2>
              <PieChart />
            <div className="mt-4 text-sm space-y-1">
              <p>Hygeia HMO</p>
              <p>MTN Corporate</p>
              <p>Reliance HMO</p>
              <p>Leadway Health</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl p-4">
            <h2 className="text-sm font-medium mb-4">Recent Alerts</h2>

            <div className="space-y-3 text-sm">
              <p className="text-green-600">
                Premium plan over capacity
              </p>
              <p className="text-red-500">
                Invoice overdue
              </p>
              <p className="text-yellow-500">
                Contract renewal approaching
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-3"></div>
            <p className="font-medium">Empty State</p>
            <p className="text-sm text-gray-500">
              No data available yet
            </p>
          </div>

        </div>

      </main>
    </div>
  </div>
);
  
}

export default Dashboard;
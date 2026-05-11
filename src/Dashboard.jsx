import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";
import { Menu, X } from "lucide-react";
import Beneficiary from './pages/Beneficiary';
import Dashboardhome from './pages/Dashboardhome';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard'},
    { id: 'beneficiary', label: 'Beneficiary management'},
    { id: 'providers', label: 'Provider management'},
    { id: 'partners', label: 'Partners management'},
    { id: 'audit', label: 'Audit logs'},
    { id: 'complaints', label: 'Complaints'},
    { id: 'appointments', label: 'Appointments'},
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
  const renderPage = () => {
    switch(activeTab) {
      case "dashboard":
        return <Dashboardhome />

      case "beneficiary":
        return <Beneficiary />

      case "people":
        return <People />

      case "healthcare":
        return <Healthcare />

      case "finance":
        return <Finance />

      case "analytics":
        return <Analytics />

      case "communications":
        return <Communications />

      case "system":
        return <System />

      default:
        return <Dashboardhome />
    }
  }

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

      <main className="p-6">
        {renderPage()}
      </main>
    </div>
  </div>
);
  
}

export default Dashboard;
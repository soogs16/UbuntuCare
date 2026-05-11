import LineGraph from "../LineGraph";
import PieChart from "../PieChart";

export default function DashboardHome() {

  const stats = [
    { title: 'Total Users', value: '18,720', change: '+7%' },
    { title: 'Active Providers', value: '428', change: '+5%' },
    { title: 'Active Partners', value: '92', change: '+4%' },
    { title: 'Total Revenue', value: '$5.6M', change: '+11%' }
  ];

  return (
    <main className="p-6 space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h2 className="text-2xl font-semibold mt-1">
              {stat.value}
            </h2>
            <span className="text-sm text-green-500">
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-xl p-4">
          <h2 className="text-xs font-xs mb-8">
            Consultation Volume
          </h2>

          <LineGraph />
        </div>

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
          <h2 className="text-sm font-medium mb-4">
            Recent Alerts
          </h2>

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
          <p className="font-medium">Empty State</p>

          <p className="text-sm text-gray-500">
            No data available yet
          </p>
        </div>

      </div>

    </main>
  );
}

import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaChartBar,
  FaPowerOff,
} from "react-icons/fa";


export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // demo stats – replace with real data or props
  const stats = [
    { title: "Total Users", value: 1284, icon: <FaUsers /> },
    { title: "Orders", value: 342, icon: <FaBoxOpen /> },
    { title: "Revenue", value: "₹ 2.6L", icon: <FaChartBar /> },
    { title: "Pending", value: 23, icon: <FaBoxOpen /> },
  ];

  return (
    <div className="min-h-screen flex bg-[#F6FFFA] text-[#17412D]">
    

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
     

        {/* Content */}
        <main className="p-4 sm:p-6 flex-1 w-full overflow-y-auto">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((s) => (
              <StatsCard key={s.title} title={s.title} value={s.value} icon={s.icon} />
            ))}
          </div>

          {/* Placeholder table */}
          <section className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-[#17412D] text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Order #</th>
                    <th className="px-4 py-2 text-left">Customer</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace with dynamic rows */}
                  {[
                    { id: 101, cust: "Rahul", amt: "₹1200", status: "Shipped" },
                    { id: 102, cust: "Maya", amt: "₹850", status: "Pending" },
                    { id: 103, cust: "Arjun", amt: "₹1999", status: "Delivered" },
                  ].map((o) => (
                    <tr
                      key={o.id}
                      className="even:bg-gray-50 border-b last:border-none"
                    >
                      <td className="px-4 py-2">{o.id}</td>
                      <td className="px-4 py-2">{o.cust}</td>
                      <td className="px-4 py-2">{o.amt}</td>
                      <td className="px-4 py-2">{o.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
// Sub‑Components

function NavItem({ icon, label, active = false }) {
  return (
    <a
      href="#" // replace with <Link /> if using react‑router
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-white/10 transition-colors ${
        active ? "bg-white/10" : ""
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </a>
  );
}

function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 flex items-center gap-4">
      <div className="text-2xl text-[#17412D]">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-lg font-semibold text-[#17412D]">{value}</p>
      </div>
    </div>
  );
}


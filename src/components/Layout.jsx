import { Outlet, NavLink } from 'react-router-dom'

export default function Layout() {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center">
          <img src="/logo.png" alt="Dk Micro finance" className="w-30 h-20 rounded-full object-contain shrink-0" />
          <div>
            <h1 className="text-lg font-bold text-slate-800">Dk Micro finance demo section</h1>
            <p className="text-xs text-slate-500">ENTERPRISE DATA VALIDATION</p>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          <NavLink to="/mutual-fund" className={navLinkClass}>Mutual Fund</NavLink>
          <NavLink to="/banking" className={navLinkClass}>Banking</NavLink>
          <NavLink to="/mortgage" className={navLinkClass}>Mortgage</NavLink>
        </nav>
      </header>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

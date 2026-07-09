export default function Sidebar() {
  return (
    <aside className="w-48 border-r border-slate-800 bg-slate-900 p-6">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 text-sm font-bold text-white">
          M
        </div>
        <h1 className="text-lg font-bold text-white">Monimuv</h1>
      </div>

      {/* Navigation */}
      <nav className="mb-8 space-y-1">
        <NavLink icon="🏠" label="Home" active />
        <NavLink icon="👥" label="Accounts" />
        <NavLink icon="📊" label="Transactions" />
        <NavLink icon="💸" label="Disbursement" />
        <NavLink icon="⚙️" label="Settings" />
      </nav>

      {/* Wallet Info */}
      <div className="rounded-lg bg-slate-800 p-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-700 text-sm font-bold text-white">
          TC
        </div>
        <p className="text-sm font-semibold text-white">Temitope CNY</p>
        <p className="text-xs text-slate-400">PRIMARY WALLET</p>
      </div>
    </aside>
  )
}

function NavLink({
  icon,
  label,
  active = false,
}: {
  icon: string
  label: string
  active?: boolean
}) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-slate-800 text-white'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </a>
  )
}

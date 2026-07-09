interface QuickActionCardProps {
  action: {
    id: number
    title: string
    icon: string
    color: string
  }
  onClick?: () => void
}

export default function QuickActionCard({ action, onClick }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-xl border border-slate-700 bg-slate-800 p-6 transition-all hover:border-slate-600 hover:bg-slate-750 cursor-pointer"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 text-xl text-white group-hover:shadow-lg group-hover:shadow-cyan-500/50">
        {action.icon}
      </div>
      <p className="text-sm font-semibold text-white group-hover:text-cyan-300">{action.title}</p>
    </button>
  )
}

export default function DataEntryConsole({ title, children }) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
        <div className="w-1 h-8 rounded-full bg-blue-600 shrink-0" />
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </section>
  )
}

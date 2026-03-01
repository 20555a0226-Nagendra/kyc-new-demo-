export default function MasterRecordReference({ columns, rows, layout = 'table', gridCols = 3 }) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden select-none">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 rounded-full bg-blue-600 shrink-0" />
          <h2 className="text-base font-semibold text-slate-800">Master Record Reference</h2>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">READ ONLY</span>
      </div>
      {layout === 'grid' && rows.length > 0 ? (
        <div className="p-4 overflow-auto">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid gap-3 ${gridCols === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
            >
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="flex flex-col gap-0.5 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 min-w-0"
                >
                  <span className="text-xs font-medium text-slate-500 truncate">{col.label}</span>
                  <span className="text-sm text-slate-800 truncate" title={row[col.key]}>
                    {row[col.key] ?? '—'}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {columns.map((col) => (
                  <th key={col.key} className="text-left font-medium text-slate-600 px-4 py-3 whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-slate-700 max-w-[200px] truncate" title={row[col.key]}>
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

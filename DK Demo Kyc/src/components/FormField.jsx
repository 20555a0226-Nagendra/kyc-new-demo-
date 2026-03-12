export default function FormField({ label, name, placeholder, value }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs font-medium text-slate-600">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

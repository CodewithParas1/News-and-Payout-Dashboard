export default function StatCard({ title, value, trend, color = "blue" }) {
  const colorMap = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900",
    indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900",
    emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900",
    rose: "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900",
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col gap-1 dark:text-gray-300"
    >
      <h3 className="text-sm text-gray-500 dark:text-gray-400 truncate transition-colors duration-200">{title}</h3>
      <p className="text-xl font-semibold text-gray-800 dark:text-white transition-all duration-300">{value}</p>
      {trend && (
        <span className={`inline-block px-2 py-0.5 text-[11px] rounded ${colorMap[color]} transition-colors duration-200`}>
          {trend}
        </span>
      )}
    </div>
  )
}

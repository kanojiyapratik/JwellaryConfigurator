export default function Tabs({ tabs = [], active, onChange }){
  return (
    <div className="mb-[1vh]">
      <div className="inline-flex flex-wrap items-center gap-[0.8vh] bg-white/70 backdrop-blur rounded-full p-[0.6vh] shadow-sm">
        {tabs.map(t => (
          <button
            key={t.key}
            disabled={t.disabled}
            onClick={() => !t.disabled && onChange(t.key)}
            className={`px-[1.6vh] py-[1vh] rounded-full text-[1.4vh] tracking-[0.12em] uppercase transition
              ${t.disabled ? 'opacity-40 cursor-not-allowed' : ''}
              ${active === t.key ? 'text-charcoal shadow' : 'text-gray-600 hover:text-charcoal'}`}
            style={active === t.key ? { background: 'var(--gold)' } : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

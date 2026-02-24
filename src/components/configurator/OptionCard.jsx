import { formatINRWithSign } from '../../utils/currency'

export default function OptionCard({ option, selected, onSelect }){
  const price = option.price || 0
  return (
    <button onClick={onSelect} className={`text-left bg-white rounded-xl border p-[2vh] transition group w-full
      ${selected ? 'border-gold ring-gold shadow-sm' : 'border-gray-200 hover:border-gold hover:shadow'}
    `}>
      <div className="flex items-center gap-[2vh]">
        <div className="h-[12vh] w-[12vh] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
          <img src={option.image||'/vite.svg'} alt={option.name} className="max-h-full max-w-full object-contain"/>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[1vh]">
            <div className="font-semibold truncate">{option.name}</div>
            {price > 0 && <span className="ml-auto text-[1.4vh] px-[1vh] py-[0.4vh] rounded-full bg-ivory border border-gray-200">{formatINRWithSign(price)}</span>}
          </div>
          <div className="text-gray-600 text-[1.5vh] mt-[0.4vh]">{price === 0 ? 'Included' : 'Additional'}</div>
        </div>
        <div title="More info" className={`text-[1.8vh] h-[3.2vh] w-[3.2vh] inline-flex items-center justify-center rounded-full border ${selected? 'border-gold text-charcoal':'border-gray-300 text-gray-500 group-hover:border-gold group-hover:text-charcoal'}`}>i</div>
      </div>
    </button>
  )
}
